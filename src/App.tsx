import React, {useRef} from 'react';
import {DataGrid, GridEditRowsModel, GridFilterModel} from '@material-ui/data-grid';
import QuickSearchToolbar from "./components/QuickSearchToolbar";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./reducers/interfaces";
import {updateAction} from "./actions";
import {NewDialog} from "./components/NewDialog";
import {escapeRegExp} from "./functions";
import {columns} from "./model/table";


function App() {
    const [filterModel, setFilterModel] = React.useState<GridFilterModel>({items: [{}]});
    const [editRowsModel, setEditRowsModel] = React.useState<GridEditRowsModel>({});
    const [searchText, setSearchText] = React.useState('');
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [firstNameRef, lastNameRef, ageRef] = [useRef(null), useRef(null), useRef(null)];
    const rows = useSelector((state: RootState) => state.defaultReducer.data);
    const dispatch = useDispatch();
    const [tempRows, setTempRows] = React.useState<any[]>(rows);

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

    React.useEffect(() => {
        setTempRows(rows);
    }, [rows]);

    return (
        <div className="App">
            <div style={{height: '400px', width: '100%'}}>
                <NewDialog
                    dialogOpen={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    okClicked={() => {}}
                    firstNameRef={firstNameRef}
                    lastNameRef={lastNameRef}
                    ageRef={ageRef}
                />
                <DataGrid
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
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </div>
    );
}

export default App;
