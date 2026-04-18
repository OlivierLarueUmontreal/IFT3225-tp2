import {useEffect, useState} from "react"
import {ProfilInfo} from "./ProfilInfo.jsx";
import {Loading} from "./Loading.jsx";

export const ProfilsTable = () => {
    const [usersList, setUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/v1/profils/`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();
                console.log(data);
                setUsersList(data.profiles);
            } catch (e) {
                console.error("Error while retrieveing list of profils: ", e);
            } finally {
                setIsLoading(false);
            }
        }

        fetchList();
    }, [BACKEND_URL])

    if (isLoading) return <Loading/>

    return (
        <div className="container mt-4">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {usersList.length > 0 ? (
                    usersList.map((user) => (
                        <div className="col" key={user.userId}>
                            <ProfilInfo
                                name={user.username}
                                email={user.email}
                                role={user.role}
                                id={user.userId}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-danger">There was an error. List is empty !</p>
                )}
            </div>
        </div>
    )

}