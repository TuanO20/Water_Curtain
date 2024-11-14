import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

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
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user }}>
            {user ? <Outlet /> : <Navigate to="/login" />}
        </AuthContext.Provider>
    ); 
}

export default PrivateRoute;