import * as React from 'react';

import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {Radio, FormControlLabel, makeStyles, useTheme, RadioGroup, DialogActions, Button} from '@material-ui/core';
import {useState} from "react";
import {SchoolStatus} from "../../shared/enums/SchoolStatus";

export interface IDialogProps {
    setEditDialog: any;
    editCell: any;
    open: boolean;
}

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.primary.dark
    },
    secondaryText: {
        color: theme.palette.primary.dark
    },
    datePicker: {
        width: '100%'
    }
}));

const EditSchoolStatus: React.FC<IDialogProps> = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [formValue, setFormValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue((event.target as HTMLInputElement).value);
    };

    const handleClose = () => {
        props.setEditDialog(false);
    };

    const handleAgree = async () => {
        await props.editCell(formValue);
        props.setEditDialog(false);
    };

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Schimba statusul scolii</DialogTitle>
            <DialogContent>
                <form className={classes.form} onSubmit={handleAgree}>
                    <RadioGroup aria-label="gender" name="gender1" value={formValue} onChange={handleChange}>
                        <FormControlLabel value={SchoolStatus.Verde} control={<Radio/>}
                                          label="Scenariul Verde"/>
                        <FormControlLabel value={SchoolStatus.Galben} control={<Radio/>}
                                          label="Scenariul Galben"/>
                        <FormControlLabel value={SchoolStatus.Rosu} control={<Radio/>}
                                          label="Scenariul Rosu"/>
                    </RadioGroup>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Renunta
                </Button>
                <Button onClick={handleAgree} color="primary" autoFocus>
                    Salveaza
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditSchoolStatus;
