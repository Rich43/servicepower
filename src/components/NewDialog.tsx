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
    firstNameRef: React.MutableRefObject<null>, lastNameRef: React.MutableRefObject<null>,
    ageRef: React.MutableRefObject<null>
}) {
    const classes = useStyles();
    return (
        <AbstractDialog dialogOpen={props.dialogOpen} dialogTitle="New" onClose={props.onClose}
                        okClicked={props.okClicked}>
            <form className={classes.root}>
                <FormGroup>
                    <TextField ref={props.firstNameRef} required label="First name" id="firstName"/>
                    <TextField ref={props.lastNameRef} required label="Last name" id="lastName"/>
                    <TextField ref={props.ageRef} required label="Age" id="age" type="number"/>
                </FormGroup>
            </form>
        </AbstractDialog>
    );
}
