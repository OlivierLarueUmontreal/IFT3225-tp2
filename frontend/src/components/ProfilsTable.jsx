import {useEffect, useState} from "react"
import {ProfilInfo} from "./ProfilInfo.jsx";
import {Loading} from "./Loading.jsx";

export const ProfilsTable = () => {
    const [usersList, setUsersList] = useState([]);
    const [allUsersList, setAllUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleUserDeleted = (deletedId) => {
        setUsersList(prevList => prevList.filter(user => user.userId !== deletedId));
        setAllUsersList(prevList => prevList.filter(user => user.userId !== deletedId));
    };

    const [searchId, setSearchId] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchId.trim()) {
            setUsersList(allUsersList);
            return;
        }
        setUsersList(allUsersList.filter(user => user.userId == searchId));
    };

    const handleReset = (e) => {
        e.preventDefault();
        setSearchId("");
        setUsersList(allUsersList);
    };


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
                setAllUsersList(data.profiles);
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
            <div className="card bg-dark text-white border-secondary mb-4">
            <div className="card-body">
                <form className="d-flex gap-2">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control border-0"
                            placeholder="Enter the user ID"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                        {searchId && (
                            <button 
                                className="btn border-0" 
                                style={{ backgroundColor: 'white' }}
                                type="button" 
                                onClick={handleReset}
                            >
                                <img src="/cancel.svg" alt="Clear search" width="20" height="20" />
                            </button>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSearch}>Search</button>
                </form>

            </div>
        </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {usersList.length > 0 ? (
                    usersList.map((user) => (
                        <div className="col" key={user.userId}>
                            <ProfilInfo
                                name={user.username}
                                email={user.email}
                                role={user.role}
                                id={user.userId}
                                onDelete={handleUserDeleted}
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