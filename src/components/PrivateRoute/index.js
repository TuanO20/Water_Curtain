import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Spinner from "react-bootstrap/Spinner";

export const AuthContext = createContext();

function PrivateRoute() { 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
            //console.log(userAuth);

            setUser(userAuth);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div style={{height: "100vh" ,display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Spinner animation="border" role="status" style={{width: "5vw", height: "auto"}}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user }}>
            {user ? <Outlet/> : <Navigate to="/login" />}
        </AuthContext.Provider>
    ); 
}

export default PrivateRoute;