import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const loginData = JSON.parse(localStorage.getItem('login'));

    //const [isLoggedin, setIsLoggedin] = useState(false);
    const [token, setToken] = useState(loginData ? loginData.token : '');
    const [role, setRole] = useState(loginData ? loginData.role : '');
    const [user, setUser] = useState(loginData ? loginData.user : null);

    const logout = () => {
        setToken('');
        setRole('');
        setUser(null);
        localStorage.removeItem('login');
        window.location.reload();
    }

    /**const setAuthenticatedUser = (userObject) => {
        localStorage.setItem('ls_user', JSON.stringify(userObject));
    }*/


    useEffect(() => {
        
        if(localStorage.getItem('login')){
            //const { token, role, user } = loginData;
            setToken(loginData.token);
            setRole(loginData.role);
            setUser(loginData.user);
        }
    }, [loginData])


    return(
        <AuthContext.Provider value={{ token, logout, user, role}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;