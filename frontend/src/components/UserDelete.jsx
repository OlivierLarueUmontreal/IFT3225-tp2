import {useState} from "react";
import {ProfilInfo} from "./ProfilInfo.jsx";
import {Loading} from "./Loading";

export const UserDelete = () => {
    const [searchId, setSearchId] = useState("");
    const [searchUser, setSearchUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchId) return;

        setIsLoading(true);
        setSearchUser(null);
        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/profils/${searchId}`, {
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                setSearchUser(data.profile);
            } else {
                alert(data.msg);
            }
        } catch (e) {
            alert("Unexpected error while doing the search", e);
        } finally {
            setIsLoading(false);
        }
    };

    const confirmDelete = async () => {
        if (!window.confirm(`Are you sure you want to Delete ${searchUser.username} ?`)) return;

        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/profils/${searchUser.userId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                alert("User deleted with success !");
                setSearchUser(null);
                setSearchId("");
            } else {
                alert("Error while trying to delete the user");
            }
        } catch (e) {
            alert("Unexpected error occured: ", e);
        }
    };

    return (
        <div className="card bg-dark text-white border-secondary mb-4">
            <div className="card-body">
                <form onSubmit={handleSearch} className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Enter the user ID"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>

                {isLoading && <Loading />}

                {searchUser && (
                    <div className="mt-4 border-top pt-3 border-secondary">
                        <p className="text-info font-italic small">Profil found: </p>
                        <ProfilInfo name={searchUser.username} email={searchUser.email} role={searchUser.role} id={searchUser.userId} />

                        <button onClick={confirmDelete} className="btn btn-danger w-100 mt-3">
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    )

};