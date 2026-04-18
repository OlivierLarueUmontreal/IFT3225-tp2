export const LogoutButton = () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleLogout = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/auth/logout`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                localStorage.removeItem('isLoggedIn');

                alert("Log out with success");
                window.location.href = "/";
            }
        } catch (e) {
            console.error("Error while deconnecting", e);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="btn btn-danger rounded">
            Logout
        </button >
    )
}