import {useEffect, useState} from "react"
import {MyAccount} from "./MyAccount";
import {Navigate} from "react-router-dom";
import {Loading} from "../components/Loading.jsx";

export const Home = () => {
    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [isLoading, setIsLoading] = useState(true);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const getMyUser = async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/api/v1/profils/me`, {
                    credentials: 'include'
                });
                if (!res.ok) {
                    localStorage.setItem('isLoggedIn', 'false');
                    return;
                }

                const userData = await res.json();
                setUser(userData);
                setIsLoggedIn(true);
                localStorage.setItem('isLoggedIn', 'true');

            } catch (err) {
                console.error(err);

                setUser(null);
                setIsLoggedIn(false);
                localStorage.setItem('isLoggedIn', 'false');
            } finally {
                setIsLoading(false);
            }
        };

        getMyUser();
    }, [])

    if (isLoading) {
        return <Loading/>;
    }

    if (!isLoggedIn) {
        console.log("Not logged in, redirecting to login page");
        return <Navigate to="/authentication" replace/>;
    }

    if (user) {
        return (
            <MyAccount user={user} onUserUpdate={setUser}/>
        )
    }
}