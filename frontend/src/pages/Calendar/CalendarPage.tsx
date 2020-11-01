import * as React from 'react';

import moment from 'moment';
import 'moment/locale/nb';
import CalendarCell from "./CalendarCell";
import {Box, Grid, useTheme} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {useState, useEffect, useContext} from 'react';
import {useHttpClient} from "../../hooks/http-hooks";
import {AuthContext} from "../../contexts/AuthContext";
import Snackbar, {SnackbarOrigin} from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            width: '90%',
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
            [theme.breakpoints.up('md')]: {
                width: '90%',
            },
            [theme.breakpoints.up('lg')]: {
                width: '90%',
            },
            marginTop: theme.spacing(2)
        },
        root: {
            marginTop: theme.spacing(4),
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        }
    }),
);

const CalendarPage: React.FC = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const month = 9;
    const monthName = moment().month(month).format("MMMM");
    const daysOfMonth = moment().daysInMonth();
    const {sendRequest} = useHttpClient();
    const auth = useContext(AuthContext);
    // @ts-ignore
    const days = [...Array(daysOfMonth).keys()];

    const [pastData, setPastData] = useState(null);
    const [quarantineEnd, setQuarantineEnd] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await sendRequest(`http://localhost:8000/api/users/user-details`, 'PATCH',
                    JSON.stringify({
                        userId: auth.userId
                    }), {'content-type': 'application/json'});
                const currentMonthData = response.userStatusesPerDayInMonth.filter((status: any) => {
                    const currentMonth = moment(status.date).month();
                    return currentMonth === month;
                });
                setPastData(currentMonthData);
            } catch (err) {
                console.log(err);
            }
        };
        getUserData();
    }, [auth, sendRequest]);

    const enterQuarantine = (day: any) => {
        if (day + 14 <= daysOfMonth)
            setQuarantineEnd(day + 14);
        else { // @ts-ignore
            setQuarantineEnd(daysOfMonth);
        }
    };
    const snackbarOrigin = {
        vertical: 'bottom',
        horizontal: 'center'
    } as SnackbarOrigin;

    return (
        <Box className={classes.root}>
            <Typography component="h2" variant="h5">
                {/*{monthName.charAt(0).toUpperCase() + monthName.slice(1)}*/}
                Octombrie
            </Typography>
            <Grid container className={classes.table}>
                {days.map((day) => {
                    let todayPastData: any;
                    let todayColor;
                    // @ts-ignore
                    if (pastData && pastData.userStatusesPerDayInMonth && pastData?.userStatusesPerDayInMonth.length) {
                        // @ts-ignore
                        todayPastData = pastData.filter((elem: any) => {
                            const today = moment(elem.date, 'YYYY/MM/DD').date();
                            return today === day;
                        });
                        if (todayPastData[0]) {
                            if (todayPastData[0].userStatus === "prezent offline" || todayPastData[0].userStatus === "prezent online")
                                todayColor = '#3CAEA3';
                            else if (todayPastData[0].userStatus === 'absent covid')
                                todayColor = '#ED553B';
                            else if (todayPastData[0].userStatus === 'absent')
                                todayColor = '#F6D55C';
                        }
                    }
                    if (quarantineEnd && day >= 20)
                        todayColor = '#ED553B';
                    return <CalendarCell day={day + 1} monthName={monthName} pastData={todayColor}
                                         enterQuarantine={enterQuarantine}/>
                })}
            </Grid>
            <Snackbar
                anchorOrigin={snackbarOrigin}
                open={true}
                key={'bottom center'}
            >
                <Alert severity="warning">Scoala este in prezent in scenariul hibrid</Alert>
            </Snackbar>
        </Box>
    );
};

export default CalendarPage;





