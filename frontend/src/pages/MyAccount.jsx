import { useEffect, useState } from "react"
export const MyAccount = () => {

    const [userInfo, setUserInfo] = useState({username: "", role: "", email: "", userId: ""})
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/v1/profils/myProfile`, {
                    method: 'GET',
                    credentials: 'include' // Required to send HttpOnly cookies
                });
                const data = await response.json();
                setUserInfo({username: data.username, role: data.role, email: data.email, userId: data.userId})
            }catch(e){
                alert(e);
            }
        }
        fetchData();
    }, [])

    return(
        <>
            <h2>My Account</h2>
            <p>Username: {userInfo.username}</p>
            <p>Role: {userInfo.role}</p>
            <p>Email: {userInfo.email}</p>
            <p>UserId: {userInfo.userId}</p>

        </>
    )
}