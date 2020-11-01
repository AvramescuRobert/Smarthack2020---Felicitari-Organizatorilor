import {useState, useEffect, useCallback} from 'react';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [schoolId, setSchoolId] = useState(null);
    const [role, setUserRole] = useState(null);
    const [changed, setChanged] = useState(false);

    const login = (uid: any, token: any, role: any, schoolId: any) => {
        setToken(token);
        setUserId(uid);
        setSchoolId(schoolId);
        setUserRole(role);
        setChanged(true);

        console.log(role);
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId: uid,
                token,
                schoolId,
                role,
            })
        );
    };

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setSchoolId(null);
        setUserRole(null);
        localStorage.removeItem("userData");
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData") as any);
        if (
            storedData &&
            storedData.token
        ) {
            login(
                storedData.userId,
                storedData.token,
                storedData.role,
                storedData.schoolId
            );
        }
    }, [token, login, changed]);


    return {token, login, logout, userId, schoolId, role};
};
