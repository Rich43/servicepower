import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {FunctionComponent} from "react";

export interface AbstractDialogProps {
    dialogOpen: boolean;
    okClicked: () => void;
    onClose: () => void;
    dialogTitle: string;
}

export const AbstractDialog: FunctionComponent<AbstractDialogProps> = (props) => {
    return (
        <Dialog open={props.dialogOpen} onClose={() => props.onClose()}>
        <DialogTitle>{props.dialogTitle}</DialogTitle>
        <DialogContent>
            { props.children }
        </DialogContent>
        <DialogActions>
            <Button onClick={() => props.onClose()} color='primary'>
                Cancel
            </Button>
            <Button onClick={() => {
                props.okClicked();
                props.onClose();
            }} color='primary'>
                Ok
            </Button>
        </DialogActions>
    </Dialog>
    );
};
