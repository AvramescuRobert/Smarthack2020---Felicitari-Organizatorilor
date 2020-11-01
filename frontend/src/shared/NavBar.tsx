import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useAuth} from "../hooks/auth-hook";
import {Roles} from "./enums/Roles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: 0,
            background: theme.palette.primary.dark
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export default function ButtonAppBar() {
    const classes = useStyles();
    const auth = useAuth();

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    SOS Scoala
                </Typography>
                {auth.role === "2" && <Button color="inherit" component="a" href='/stats'>Statistici</Button>}
                <Button color="inherit" onClick={auth.logout} component="a" href='/'>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}
