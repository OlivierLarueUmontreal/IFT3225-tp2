import { useState } from "react"
import { Link } from "react-router-dom";

export const AuthenticationForm = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevForm => ({ ...prevForm, [name]: value }));
    }

    const login = async (event) => {
        event.preventDefault();

        if (formData.email === "" || formData.password === "") {
            alert("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();
            if (!response.ok) {
                alert(data.msg);
                return;
            }

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isAdmin', data.user.role === "admin" ? 'true' : 'false');

            alert("Logged in successfully!");
            window.location.href= "/";

        } catch (e) {
            alert("Something went wrong: " + e.message);
        }
    }

    return (
        <div className="card bg-dark text-white border-secondary shadow">
            <div className="card-body p-4">
                {/*inspired from bootstrap official doc on forms: https://getbootstrap.com/docs/5.3/forms/layout/*/}
                <form onSubmit={login}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email: </label>
                        <input
                            className="form-control border-0"
                            type="text"
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password: </label>
                        <input
                            className="form-control border-0"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="******"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 mb-3">Login</button>
                </form>
                <div className="text-center mt-3 pt-3 border-top border-secondary">
                    <p className="text-white small">No account yet ?</p>
                    <Link className="text-info small text-decoration-none" to="/register">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    )
}
