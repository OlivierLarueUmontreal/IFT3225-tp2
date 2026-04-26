import { useState } from 'react';
import {Navigate} from 'react-router-dom';


export const ProfilInfo = ({name, email, role, id, actionButton, onDelete}) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [showModal, setShowModal] = useState(false);
    const [isGoodbye, setIsGoodbye] = useState(false);

    const deleteUser = async() => {
        try {
            const respone = await fetch(`${BACKEND_URL}/api/v1/profils/${id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })
            const data = await respone.json();
            if(respone.ok){
                alert("User deleted successfully");
                if (onDelete) {
                    onDelete(id);
                }
            }
        } catch (e){
            console.log(e);
        }
    }

    const showGoodByeMessage = async () => {
        setIsGoodbye(true);
        localStorage.setItem('isLoggedIn', false);
        setInterval(() => {
            window.location.href= "/authentication";
        }, 2000);   
    }

    return (
        <>
        <div className="card h-100 shadow-sm bg-dark text-white border-secondary">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h3 className="card-title text-info mb-0">{name}</h3>
                    {actionButton && (
                        <div className="ms-2">
                            {actionButton}
                        </div>
                    )}
                </div>
                <h6 className="card-subtitle mb-2 "><strong>Role: </strong>{role}</h6>
                <p className="card-text mb-1"><strong>Email:</strong> {email}</p>
                <div className="d-flex justify-content-between">
                    <p className="card-text small text-secondary mb-0" style={{ paddingTop: '5px' }}><strong>ID:</strong> {id}</p>
                    <button 
                        className="btn border-0 p-1" 
                        style={{ backgroundColor: 'grey' }}
                        onClick={() => setShowModal(true)}
                    >
                        <img src="/delete.svg" alt="Delete Profile" width="20" height="20" />
                    </button>
                </div>
            </div>
        </div>

        {showModal && (
            <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-white border-secondary">
                        <div className="modal-header border-0">
                            <h5 className="modal-title">Confirm Deletion</h5>
                            <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            {actionButton? <p>Are you sure you want to delete your profile? </p>:  <p>Are you sure you want to delete this profile?</p>}
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={() => {
                                setShowModal(false);
                                deleteUser();
                                actionButton? showGoodByeMessage(): {}
                            }}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {isGoodbye && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1050 }}>
            <div className="alert alert-success text-center px-5 py-4">
                <h2>It was sad to see u go (╥﹏╥)</h2>
                <p>Your profile has been deleted. Redirecting...</p>
            </div>
        </div>
    )}

        </>
    )

}