import * as React from 'react';

import moment from 'moment';
import 'moment/locale/nb';
import {useContext, useEffect, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Grid, Typography, useTheme} from "@material-ui/core";
import EditDayCellDialog from "./EditDayCellDialog";
import {PersonStatus} from '../../shared/enums/PersonStatus';
import {AuthContext} from "../../contexts/AuthContext";
import {useHttpClient} from "../../hooks/http-hooks";

export interface ICalendarCell {
    day: number;
    monthName: string,
    pastData: any,
    enterQuarantine: any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cell: {
            border: `1px solid ${theme.palette.primary.light}`,
            [theme.breakpoints.down('sm')]: {
                width: '80px',
                height: '80px'
            },
            [theme.breakpoints.up('md')]: {
                width: '130px',
                height: '130px'
            },
            position: 'relative'
        },
        text: {
            top: '5px',
            left: '5px',
            position: 'absolute'
        },
    }),
);

const CalendarCell: React.FC<ICalendarCell> = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const auth = useContext(AuthContext);
    const {sendRequest} = useHttpClient();
    const [editDialog, setEditDialog] = useState(false);
    const [color, setBackgroundColor] = useState('');

    const isCurrentDay = () => {
        return (props.day - 1) === 20
    };

    const editCell = async (value: any) => {
        let newStatus;
        if (value === PersonStatus.isPresentOnline || value === PersonStatus.isPresentOffline) {
            setBackgroundColor('#3CAEA3');
            newStatus = PersonStatus.isPresentOnline ? 'prezent online' : 'prezent offline';
        }
        if (value === PersonStatus.isCovid) {
            setBackgroundColor('#ED553B');
            newStatus = 'absent covid'
            props.enterQuarantine(props.day);
        }
        if (value === PersonStatus.isAbsentOtherReasons) {
            newStatus = 'absent';
            setBackgroundColor('#F6D55C');
        }
        const response = await sendRequest('http://localhost:8000/api/users/update-status-for-current-day', 'POST', JSON.stringify({
            userId: auth.userId,
            newStatus
        }), {'content-type': 'application/json'})
    };

    const openEditCellDialog = () => {
        setEditDialog(true);
    };

    const getColor = () => {
        console.log(props.pastData);
        if (props.pastData)
            return props.pastData;
        else return color;
    };

    return (
        <React.Fragment>
            {editDialog && isCurrentDay() &&
            <EditDayCellDialog setEditDialog={setEditDialog} editCell={editCell} open={editDialog} day={props.day}
                               monthName={props.monthName}/>}
            <Grid item component={isCurrentDay() ? 'button' : 'div'} className={classes.cell}
                  style={{background: getColor()}}
                  onClick={openEditCellDialog}>
                <Typography component="p" className={classes.text}>
                    {props.day}
                </Typography>
            </Grid>
        </React.Fragment>
    );
};

export default CalendarCell;





