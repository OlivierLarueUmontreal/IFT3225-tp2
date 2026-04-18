// https://reactrouter.com/api/components/Link
import {Link, NavLink} from "react-router-dom";
import {LogoutButton} from "./LogoutButton.jsx";

export const Header = () => {

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    return (
        <nav className="navbar navbar-dark bg-dark border-bottom border-secondary shadow-sm mb-5">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-4">
                    <Link className="navbar-brand fw-bold text-info m-0" to="/">
                        IFT3225-TP2
                    </Link>

                    {isLoggedIn && isAdmin && (
                        <NavLink to="/admin/profils" className="nav-link text-white ">
                            Admin Center
                        </NavLink>
                    )}

                    {isLoggedIn && (
                        <Link to="/documentation" className="nav-link text-white">
                            Documentation
                        </Link>
                    )}
                </div>

                <div className="d-flex align-items-center gap-3">
                    {isLoggedIn ? (
                        <>
                            <span className="text-white small border-end border-secondary pe-3">
                                Connected
                            </span>
                            <LogoutButton/>
                        </>
                    ) : (<></>
                    )}
                </div>

            </div>
        </nav>
    )
}