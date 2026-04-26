import {ProfilsTable} from "../components/ProfilsTable";
import {useState} from "react";
import {UserDelete} from "../components/UserDelete.jsx";

export const AdminPage = () => {
    const [viewMode, setViewMode] = useState("none"); // "none", "all", "search"
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
{/* 
            <div className="row mb-5">
                <div className="col-6">
                    <button
                        className={`btn ${viewMode === 'all' ? 'btn-success' : 'btn-outline-success'} w-100`}
                        onClick={() => setViewMode("all")}>
                        Display all profils
                    </button>
                </div>
                <div className="col-6">
                    <button
                        className={`btn ${viewMode === 'search' ? 'btn-success' : 'btn-outline-success'} w-100`}
                        onClick={() => setViewMode("search")}>
                        Search/Delete by ID
                    </button>
                </div>
            </div> */}

            <section>
                <ProfilsTable/>
            </section>
            {/* <div className="mt-4">
                {viewMode === "all" && (
                    <section>
                        <ProfilsTable/>
                    </section>
                )}

                {viewMode === "search" && (
                    <section style={{maxWidth: "600px", margin: "0 auto"}}>
                        <UserDelete/>
                    </section>
                )}

                {viewMode === "none" && (
                    <div className="text-center p-2 ">
                        <span className="text-muted italic">Select an option.</span>
                    </div>
                )}
            </div> */}
        </div>
    );
}
