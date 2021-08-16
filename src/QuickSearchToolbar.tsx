import {GridToolbarFilterButton} from "@material-ui/data-grid";
import {Box, IconButton, TextField, Tooltip} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

interface QuickSearchToolbarProps {
    clearSearch: () => void;
    onChange: () => void;
    newOnClick: () => void;
    deleteOnClick: () => void;
    value: string;
}

export default function QuickSearchToolbar(props: QuickSearchToolbarProps) {
    return (
        <Box display="flex" flexDirection="horizontal">
            <Box pl={1}/>
            <div>
                <GridToolbarFilterButton/>
                <Tooltip title="New">
                    <IconButton onClick={props.newOnClick}><AddIcon/></IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={props.deleteOnClick}><DeleteIcon/></IconButton>
                </Tooltip>
            </div>
            <Box flex="1"/>
            <Box pt={1} pr={2}>
                <TextField
                    variant="standard"
                    value={props.value}
                    onChange={props.onChange}
                    placeholder="Search…"
                    InputProps={{
                        startAdornment: <SearchIcon fontSize="small"/>,
                        endAdornment: (
                            <IconButton
                                title="Clear"
                                aria-label="Clear"
                                size="small"
                                style={{visibility: props.value ? 'visible' : 'hidden'}}
                                onClick={props.clearSearch}
                            >
                                <ClearIcon fontSize="small"/>
                            </IconButton>
                        ),
                    }}
                />
            </Box>
        </Box>
    );
}
