import {GridToolbarFilterButton} from "@material-ui/data-grid";
import {Box, IconButton, TextField} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

interface QuickSearchToolbarProps {
    clearSearch: () => void;
    onChange: () => void;
    value: string;
}

export default function QuickSearchToolbar(props: QuickSearchToolbarProps) {
    return (
        <Box display="flex" flexDirection="horizontal">
            <div>
                <GridToolbarFilterButton />
            </div>
            <Box flex="1" />
            <TextField
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Search…"
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small" />,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{ visibility: props.value ? 'visible' : 'hidden' }}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    ),
                }}
            />
        </Box>
    );
}
