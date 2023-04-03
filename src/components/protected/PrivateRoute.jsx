import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//import { AuthContext } from "../../context/AuthContext";

export const PrivateRoute = ({ children }) => {

   //const { token } = useContext(AuthContext);

    /**const navigate = useNavigate();

    useEffect(() => {

        if(!isLoggedin){
            navigate('/login');
        }

    }, [isLoggedin, navigate]) */
    
    //const lsData = JSON.parse(localStorage.getItem('login'));

    const navigate = useNavigate();

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('login')) === null){
            navigate('/login');
        }
    }, [navigate])
 
    return children; 
};
