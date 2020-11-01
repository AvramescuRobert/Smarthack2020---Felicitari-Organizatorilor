import {createContext} from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    userId: null,
    schoolId: null,
    role: null,
    login: (uid: any, token: any, role: any, schoolId: any) => {},
    logout: () => {}
});

