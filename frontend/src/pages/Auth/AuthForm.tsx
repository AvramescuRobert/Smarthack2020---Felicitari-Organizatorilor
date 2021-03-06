import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {makeStyles, useTheme} from "@material-ui/core/styles";

const signUpText = "Don't have an account? Sign up!";
const signInText = "Already have an account? Sign in";

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
    }
}));

const AuthForm = (props: any) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        isLoginMode,
        onModeChange,
        handleSubmit
    } = props;

    const switchModeHandler = (isLoginMode: any) => {
        onModeChange(!isLoginMode);
    };

    const change = (name: any, e: any) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
                onChange={change.bind(null, "email")}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
                onChange={change.bind(null, "password")}
            />
            {!isLoginMode && <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="firstName"
                label="First Name"
                id="firstName"
                onChange={change.bind(null, "firstName")}
                helperText={touched.firstName ? errors.firstName : ""}
                error={touched.firstName && Boolean(errors.firstName)}
            />}
            {!isLoginMode && <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="lastName"
                label="Last Name"
                id="lastName"
                onChange={change.bind(null, "lastName")}
                helperText={touched.lastName ? errors.lastName : ""}
                error={touched.lastName && Boolean(errors.lastName)}
            />}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!isValid}
                className={classes.submit}
            >
                {isLoginMode ? 'Sign In' : 'Create Account'}
            </Button>
            <Grid container>
                <Grid item>
                    <Link href="#" onClick={switchModeHandler} variant="body2" className={classes.secondaryText}>
                        {isLoginMode ? signUpText : signInText}
                    </Link>
                </Grid>
            </Grid>
        </form>
    );
};

export default AuthForm;
