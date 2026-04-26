import {ProfilsTable} from "../components/ProfilsTable";
import {useState} from "react";
import {UserDelete} from "../components/UserDelete.jsx";

export const AdminPage = () => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (!isAdmin) {
        return (
            <div className="container mt-5 text-center text-white">
                <h1 className="text-danger">Access denied</h1>
                <p>Sorry, you can't access the admin page.</p>
                <button className="btn btn-outline-light" onClick={() => window.location.href = "/"}>
                    Return Home
                </button>
            </div>
        )
    }

    return (
        <div className="container py-4 text-white">
            <h2 className="mb-4 border-bottom pb-2 font-bold">Centre d'Administration</h2>
            <section>
                <ProfilsTable/>
            </section>
        </div>
    );
}
