import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {useTheme} from "@material-ui/styles";

import {useAuth} from "./hooks/auth-hook";
import {AuthContext} from "./contexts/AuthContext";
import AuthPage from "./pages/Auth/AuthPage";
import CalendarPage from "./pages/Calendar/CalendarPage";
import {CssBaseline, Grid} from "@material-ui/core";
import NavBar from './shared/NavBar';
import {makeStyles} from "@material-ui/core/styles";
import StatsPage from "./pages/Stats/StatsPage";
import {Roles} from "./shared/enums/Roles";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: 0,
        width: '100%',
        display: 'flex'
    }
}));

const App: React.FC = () => {
    const {token, login, logout, userId, schoolId, role} = useAuth();
    const theme = useTheme();
    const classes = useStyles(theme);
    let routes;

    if (token) {
        routes = (
            <Grid style={{
                margin: 0,
                width: '100%',
                flexGrow: 1
            }} container component="div" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={12} lg={12} xl={12}>
                    <NavBar/>
                </Grid>
                <Switch>
                    {role === "2" && <Route path="/stats">
                        <StatsPage/>
                    </Route>}
                    <Route path="/" exact>
                        <CalendarPage/>
                    </Route>
                </Switch>
            </Grid>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/stats">
                    <StatsPage/>
                </Route>
                <Route path="/" exact>
                    <AuthPage/>
                </Route>
            </Switch>);
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                schoolId: schoolId,
                role: role,
                login: login,
                logout: logout
            }}
        >
            <Router>
                {routes}
            </Router>
        </AuthContext.Provider>
    )
};

export default App;
