import {ProfilInfo} from "../components/ProfilInfo.jsx"
import {useState} from "react";
import {EditProfilForm} from "../components/EditProfilForm.jsx";
import {ChangePasswordForm} from "../components/ChangePasswordForm.jsx";

export const MyAccount = ({user, onUserUpdate}) => {
    // initial state info: display profil info
    const [view, setView] = useState('info');

    const actionButton = (
        <div className="d-flex gap-2">
            <button onClick={() => setView("edit")} className="btn btn-outline-warning btn-sm">Edit</button>
            <button onClick={() => setView("password")} className="btn btn-outline-warning btn-sm">Change password</button>
        </div>
    )
    return (
        <div className="container mt-5">
            <div className="row justify-content-center ">
                <div className="col-6">
                    {view === 'info' && (
                        <ProfilInfo
                            name={user.username}
                            email={user.email}
                            role={user.role}
                            id={user.userId}
                            // inspo from https://stackoverflow.com/questions/55277166/how-can-i-pass-html-as-props-in-reactjs
                            actionButton={actionButton}
                        />
                    )}

                    {view === 'edit' && (
                        <EditProfilForm user={user} onCancel={() => setView('info')}
                            onUpdate={(updatedUser) => {
                                onUserUpdate(updatedUser);
                                setView("info");
                            }}
                        />
                    )}

                    {view === 'password' && (
                        <ChangePasswordForm onCancel={() => setView('info')} />
                    )}

                </div>
            </div>
        </div>
    )
}