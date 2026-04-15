import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const AuthenticationForm = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
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

            if (!response.ok) {
                const data = await response.json();
                alert(data.msg);
                return;
            }

            alert("Logged in successfully!");
            navigate("/");

        } catch (e) {
            alert("Something went wrong: " + e.message);
        }
    }

    return (
        <div>
            <form>
                <label htmlFor="email">Email: </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <br />

                <button onClick={login}>Login</button>
            </form>
        </div>
    )
}
