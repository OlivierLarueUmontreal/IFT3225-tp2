import {useState} from "react";
import {data} from "react-router-dom";

export const ChangePasswordForm = ({onCancel}) => {
    const [passwordData, setPasswordData] = useState({oldPassword: "", newPassword: ""});
    const [errorMsg, setErrorMsg] = useState("");
    const [passwordLength, setPasswordLength] = useState(10);
    const [showPassword, setShowPassword] = useState({oldPassword: false, newPassword: false})
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

    const generatePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/motdepasse/${passwordLength}`)
            const data = await response.json();
            if(response.ok){
                setPasswordData({...passwordData, newPassword: data.password})
            }
        }catch (e){
            setErrorMsg(e.message)
        }
    }

     return (
         <div className="card bg-dark text-white p-4 border-secondary shadow">
             <h3 >Change Password</h3>
             {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
             <form onSubmit={handleSubmit} className="mt-3">
                 <div className="mb-3">
                     <label className="form-label">Old password</label>
                    <div className="input-group">

                     <input required type={showPassword.oldPassword ? "text": "password"} className="form-control"
                            value={passwordData.oldPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })} />
                    <button
                        className="btn text-white border-0"
                        style={{ backgroundColor: 'rgb(255 255 255)' }}
                        type="button"
                        onClick={() => setShowPassword({...showPassword, oldPassword: !showPassword.oldPassword})}
                    >
                    <img 
                        src={showPassword.oldPassword ? "/eye-hide.svg" : "/eye.svg"} 
                        alt={showPassword.oldPassword ? "Hide password" : "Show password"} 
                        width="20" 
                        height="20" 
                    />
                    </button>
                    </div>
                 </div>
                 <div className="mb-3 p-3 rounded border border-secondary border-opacity-50">
                        <label className="form-label small text-info">Password generator</label>
                        <div className="d-flex gap-2">
                            <input
                                type="number"
                                className="form-control border-0 w-25"
                                name="password_length"
                                value = {passwordLength}
                                min="4"
                                max="50"
                                onChange = {(e) => setPasswordLength(e.target.value)}
                            />
                            <button className="btn btn-outline-info btn-sm flex-grow-1" onClick = {generatePassword}>
                                Generate
                            </button>
                        </div>
                    </div>
                 <div className="mb-3">
                    <label className="form-label">New password</label>
                    <div className="input-group">

                        <input required type={showPassword.newPassword? "text": "password"} className="form-control"
                                value={passwordData.newPassword}
                                placeholder="Generate or enter your own"
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} 
                        />
                        <button
                        className="btn text-white border-0"
                        style={{ backgroundColor: 'rgb(255 255 255)' }}
                        type="button"
                        onClick={() => setShowPassword({...showPassword, newPassword: !showPassword.newPassword})}
                        >
                            <img 
                                src={showPassword.newPassword ? "/eye-hide.svg" : "/eye.svg"} 
                                alt={showPassword.newPassword ? "Hide password" : "Show password"} 
                                width="20" 
                                height="20" 
                            />
                        </button>


                    </div>
                 </div>
                 <button type="submit" className="btn btn-success me-2">Save</button>
                 <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
             </form>
         </div>
     )
}