import React, {useContext, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import {
    Formik
} from 'formik';

import AuthForm from "./AuthForm";
import * as yup from "yup";
import {useHttpClient} from "../../hooks/http-hooks";
import {AuthContext} from "../../contexts/AuthContext";

const AuthFormContainer = () => {
    const auth = useContext(AuthContext);

    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const [isLoginMode, setIsLoginMode] = useState(true);
    const values = {firstName: '', lastName: '', email: '', password: ''};

    const handleModeChange = (prevMode: any) => {
        setIsLoginMode(prevMode => !prevMode);
    };

    const handleAuthSubmit = async (values: any) => {
        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    'http://localhost:8000/api/users/login',
                    'POST',
                    JSON.stringify({
                        email: values.email,
                        password: values.password
                    }),
                    {
                        "Content-Type": 'application/json'
                    }
                );
                console.log(auth.role);
                auth.login(responseData.id, responseData.token, responseData.role, responseData.schoolId);
                console.log("auth: ", auth);
            } catch (e) {
                console.log(e)
            }
        } else {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/signup',
                    'POST',
                    JSON.stringify({
                        email: values.email,
                        password: values.password,
                        firstName: values.firstName,
                        lastName: values.lastName
                    }),
                    {
                        "Content-Type": 'application/json'
                    }
                );
                console.log(responseData);
                auth.login(responseData.id, responseData.token, responseData.role, responseData.schoolId);
            } catch (e) {
                console.log(e)
            }
        }
    };

    const authValidationSchema = !isLoginMode && yup.object({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        email: yup.string().email('Please provide a valid email address').required('Email is required'),
        password: yup.string().required('Password is required').min(6, 'Your password should have at least 6 characters')
    });

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5">
                {isLoginMode ? 'Sign in' : 'Create Account'}
            </Typography>

            <Formik
                initialValues={values}
                validationSchema={authValidationSchema}
                onSubmit={values => handleAuthSubmit(values)}
            >
                {props => <AuthForm {...props} onModeChange={handleModeChange} isLoginMode={isLoginMode}/>}
            </Formik>
        </React.Fragment>
    );
};

export default AuthFormContainer;

