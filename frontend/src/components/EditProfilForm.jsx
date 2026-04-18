import {useState} from "react";

export const EditProfilForm = ({user, onCancel, onUpdate}) => {
    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
    })
    const [errorMsg, setErrorMsg] = useState("");
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/profils/${user.userId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                alert("Profil mis à jour !");
                onUpdate(data.profile);
            } else {
                setErrorMsg(data.msg);
            }
        } catch (e) {
            setErrorMsg(e.message);
        }
    }
    return (
        <div className="card bg-dark text-white p-4 border-secondary shadow">
            <h3>Edit profil</h3>
            {errorMsg && (
                <div className="alert alert-danger mb-4" role="alert">
                    <strong>Error: </strong> {errorMsg}
                </div>
            )}

            <form onSubmit={handleUpdate} className="mt-3">
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
                <button type="submit" className="btn btn-success me-2"> Save</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}> Cancel </button>
            </form>
        </div>
    )
}