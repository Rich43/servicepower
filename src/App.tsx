import React, {useRef} from 'react';
import {DataGrid, GridEditRowsModel, GridFilterModel, GridSelectionModel} from '@material-ui/data-grid';
import QuickSearchToolbar from "./components/QuickSearchToolbar";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./reducers/interfaces";
import {createAction, deleteAction, updateAction} from "./actions";
import {NewDialog} from "./components/NewDialog";
import {escapeRegExp} from "./functions";
import {columns} from "./model/table";

function App() {
    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
    const [filterModel, setFilterModel] = React.useState<GridFilterModel>({items: [{}]});
    const [editRowsModel, setEditRowsModel] = React.useState<GridEditRowsModel>({});
    const [searchText, setSearchText] = React.useState('');
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [firstNameRef, lastNameRef, ageRef] = [
        useRef<HTMLInputElement | null>(null), useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null)
    ];
    const rows = useSelector((state: RootState) => state.defaultReducer.data);
    const dispatch = useDispatch();
    const [tempRows, setTempRows] = React.useState<any[]>(rows);
    const lastPage = Math.floor(tempRows.length / 5);

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = rows.filter((row: any) => {
            return Object.keys(row).some((field: any) => {
                return searchRegex.test(String(row[field]));
            });
        });
        setTempRows(filteredRows);
    };

    const handleEditRowsModelChange = React.useCallback(
        (newModel: GridEditRowsModel) => {
            const updatedModel = {...newModel};
            Object.keys(updatedModel).forEach((id) => {
                const transformed = Object.entries(updatedModel[id]).map(entry => {
                    return {[entry[0]]: entry[1].value};
                }).reduce((entry, other) => {
                    return {...entry, ...other};
                });
                dispatch(updateAction(Number(id), transformed));
            });
            setEditRowsModel(updatedModel);
        },
        [dispatch],
    );

    if (rows !== tempRows && !searchText) {
        setTempRows(rows);
    }

    return (
        <div className="App">
            <div style={{height: '420px', width: '100%'}}>
                <NewDialog
                    dialogOpen={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    okClicked={() => {
                        dispatch(createAction({
                            firstName: firstNameRef && firstNameRef.current && firstNameRef.current.value,
                            lastName: lastNameRef.current && lastNameRef.current.value,
                            age: ageRef.current && ageRef.current.value
                        }));
                        setPage(lastPage);
                    }}
                    firstNameRef={firstNameRef}
                    lastNameRef={lastNameRef}
                    ageRef={ageRef}
                />
                <DataGrid
                    page={page}
                    onPageChange={page => setPage(page)}
                    components={{
                        Toolbar: QuickSearchToolbar,
                    }}
                    componentsProps={{
                        toolbar: {
                            value: searchText,
                            onChange: (event: any) => requestSearch(event.target.value),
                            clearSearch: () => requestSearch(''),
                            newOnClick: () => setDialogOpen(true),
                            deleteOnClick: () => {
                                selectionModel.forEach(id => {
                                    dispatch(deleteAction(Number(id)));
                                });
                            }
                        },
                    }}
                    rows={tempRows}
                    columns={columns}
                    pageSize={5}
                    filterModel={filterModel}
                    onFilterModelChange={(model) => setFilterModel(model)}
                    editRowsModel={editRowsModel}
                    onEditRowsModelChange={handleEditRowsModelChange}
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                    }}
                    selectionModel={selectionModel}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </div>
    );
}

export default App;
