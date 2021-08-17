import React from "react";
import {AbstractDialog} from "./AbstractDialog";
import {createStyles, FormGroup, makeStyles, TextField, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 300,
            '& .MuiTextField-root': {
                margin: theme.spacing(0.5),
            },
        },
    }),
);

export function NewDialog(props: {
    dialogOpen: boolean, onClose: () => void, okClicked: () => void,
    firstNameRef: React.MutableRefObject<HTMLInputElement | null>, lastNameRef: React.MutableRefObject<HTMLInputElement | null>,
    ageRef: React.MutableRefObject<HTMLInputElement | null>
}) {
    const classes = useStyles();
    return (
        <AbstractDialog dialogOpen={props.dialogOpen} dialogTitle="New" onClose={props.onClose}
                        okClicked={props.okClicked}>
            <form className={classes.root}>
                <FormGroup>
                    <TextField inputRef={props.firstNameRef} required label="First name" id="firstName"/>
                    <TextField inputRef={props.lastNameRef} required label="Last name" id="lastName"/>
                    <TextField inputRef={props.ageRef} required label="Age" id="age" type="number"/>
                </FormGroup>
            </form>
        </AbstractDialog>
    );
}
