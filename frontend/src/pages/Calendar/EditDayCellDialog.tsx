import * as React from 'react';

import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
    FormControl,
    Radio,
    FormLabel,
    FormControlLabel,
    makeStyles,
    useTheme,
    RadioGroup,
    DialogActions,
    Button
} from '@material-ui/core';
import {useState} from "react";
import {PersonStatus} from "../../shared/enums/PersonStatus";

export interface IDialogProps {
    setEditDialog: any;
    editCell: any;
    open: boolean;
    day: any;
    monthName: any;
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

const EditDayCellDialog: React.FC<IDialogProps> = (props) => {
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
            <DialogTitle id="alert-dialog-title">{`Statusul din data de ${props.day} ${props.monthName}`}</DialogTitle>
            <DialogContent>
                <form className={classes.form} onSubmit={handleAgree}>
                    <RadioGroup aria-label="gender" name="gender1" value={formValue} onChange={handleChange}>
                        <FormControlLabel value={PersonStatus.isPresentOnline} control={<Radio/>}
                                          label="Prezent online"/>
                        <FormControlLabel value={PersonStatus.isPresentOffline} control={<Radio/>}
                                          label="Prezent offline"/>
                        <FormControlLabel value={PersonStatus.isCovid} control={<Radio/>}
                                          label="Absent din motive epidemiologice"/>
                        <FormControlLabel value={PersonStatus.isAbsentOtherReasons} control={<Radio/>}
                                          label="Absent din alte motive"/>
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

export default EditDayCellDialog;
