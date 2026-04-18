import {useState} from "react";
import {data} from "react-router-dom";

export const ChangePasswordForm = ({onCancel}) => {
    const [passwordData, setPasswordData] = useState({oldPassword: "", newPassword: ""});
    const [errorMsg, setErrorMsg] = useState("");
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/profils/updatePassword`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(passwordData),
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                alert("Password has been updated successfully.");
                onCancel(); // we close the form since we are done
            }else{
                setErrorMsg(data.msg);
            }
        } catch (e) {
            setErrorMsg(e.message);
        }
    }
     return (
         <div className="card bg-dark text-white p-4 border-secondary shadow">
             <h3 >Change Password</h3>
             {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
             <form onSubmit={handleSubmit} className="mt-3">
                 <div className="mb-3">
                     <label className="form-label">Old password</label>
                     <input required type="password" className="form-control"
                            value={passwordData.oldPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })} />
                 </div>
                 <div className="mb-3">
                     <label className="form-label">New password</label>
                     <input required type="password" className="form-control"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} />
                 </div>
                 <button type="submit" className="btn btn-success me-2">Save</button>
                 <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
             </form>
         </div>
     )
}