import {ProfilInfo} from "../components/ProfilInfo.jsx"
import {Loading} from "../components/Loading.jsx";
import {useEffect, useState} from "react";

export const MyAccount = ({user, onUserUpdate}) => {
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || ""
    });
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        setFormData({
            username: user?.username || "",
            email: user?.email || ""
        });
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            if (formData.username === "" || formData.email === "") {
                setErrorMsg("Please input all fields");
                return;
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/profils/${user.userId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                alert("Profil updated successfully !");
                const updatedUser = data.profile
                onUserUpdate(updatedUser);

                setIsEditing(false);
            }
        } catch (e) {
            setErrorMsg(e.message);
        } finally {
            setIsLoading(false);
        }
    };


    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (isEditing) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <div className="card bg-dark text-white p-4 border-secondary shadow-md">
                            <h3>Edit profil</h3>
                            {errorMsg && (
                                <div className="alert alert-danger mb-4" role="alert">
                                    <strong>Error: </strong> {errorMsg}
                                </div>
                            )}

                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        value={formData.username}
                                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        required
                                        type="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                                <button type="submit" className="btn btn-success me-2">
                                    {isLoading ? "Saving..." : "Save"}
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center ">
                <div className="col-6">
                    <ProfilInfo
                        name={user.username}
                        email={user.email}
                        role={user.role}
                        id={user.userId}
                        // inspo from https://stackoverflow.com/questions/55277166/how-can-i-pass-html-as-props-in-reactjs
                        actionButton={
                            <button onClick={() => setIsEditing(true)} className="btn btn-outline-warning btn-sm">
                                Edit
                            </button>
                        }
                    />
                </div>
            </div>
        </div>
    )
}