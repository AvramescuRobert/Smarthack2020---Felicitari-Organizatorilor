import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";
import AuthFormContainer from "./AuthFormContainer";
import {makeStyles} from "@material-ui/core/styles";
import Theme from "../../Theme";

export const useStyles = makeStyles(() => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1491198246568-ea47742734b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80/1600x900)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            Theme.palette.type === 'light' ? Theme.palette.grey[50] : Theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: Theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: Theme.spacing(1),
        backgroundColor: Theme.palette.primary.dark,
    },
    title: {
        color: Theme.palette.primary.dark
    }
}));

const AuthPage = () => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" paragraph variant="h4" className={classes.title}>
                        SOS Scoala
                    </Typography>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <br/>
                    <AuthFormContainer/>
                </div>
            </Grid>
        </Grid>
    );
};

export default AuthPage;
