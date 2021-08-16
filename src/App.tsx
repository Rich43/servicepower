import React from 'react';
import {DataGrid, GridColDef, GridFilterModel} from '@material-ui/data-grid';
import QuickSearchToolbar from "./QuickSearchToolbar";
import {useSelector} from "react-redux";
import {RootState} from "./reducers/interfaces";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
        `${params.getValue(params.id, 'firstName') || ''} ${
            params.getValue(params.id, 'lastName') || ''
        }`,
  },
];

function escapeRegExp(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function App() {
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({items: [{}]});
  const [searchText, setSearchText] = React.useState('');
  const rows = useSelector((state: RootState) => state.defaultReducer.data);
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

  React.useEffect(() => {
    setTempRows(rows);
  }, [rows]);

  return (
    <div className="App">
      <div style={{ height: '400px', width: '100%' }}>
        <DataGrid
            components={{
              Toolbar: QuickSearchToolbar,
            }}
            componentsProps={{
              toolbar: {
                value: searchText,
                onChange: (event: any) => requestSearch(event.target.value),
                clearSearch: () => requestSearch(''),
              },
            }}
            rows={tempRows}
            columns={columns}
            pageSize={5}
            filterModel={filterModel}
            onFilterModelChange={(model) => setFilterModel(model)}
            checkboxSelection
            disableSelectionOnClick
        />
      </div>
    </div>
  );
}

export default App;
