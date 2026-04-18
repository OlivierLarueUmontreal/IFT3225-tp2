import {useEffect, useState} from "react"
import {Link, Navigate} from 'react-router-dom';
import {Loading} from "./Loading.jsx";

export const RegisterForm = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === 'true';

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password_length: 10,
        password: "",
        isAdmin: false
    })

    const [registered, setRegistered] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (registered) {
            alert("Registered successfully");
            window.location.href = '/';
            setFormData({username: "", password_length: 10, email: "", password: "", isAdmin: false})
        }
    }, [registered])

    const handleChange = (event) => {
        const {name, value, type, checked} = event.target;
        setFormData(prevForm => {
            return ({
                ...prevForm,
                [name]: type === "checkbox" ? checked : value
            })
        });
    }

    const generatePassword = async (event) => {
        event.preventDefault();
        try {
            const password_length = formData.password_length;
            const response = await fetch(`${BACKEND_URL}/api/v1/motdepasse/${password_length}`)
            const data = await response.json();
            const password = data.password;
            setFormData(prevForm => ({...prevForm, password}));
        } catch (e) {
            console.log(e)
        }
    }

    const register = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true)
            if (formData.username === "" || formData.password === "" || formData.email === "") {
                alert("Please input all fields");
                return;
            }
            const newUser = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: formData.isAdmin ? "admin" : "user"
            }
            const response = await fetch(`${BACKEND_URL}/api/v1/profils`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            const data = await response.json();
            if (!response.ok) {
                alert(data.msg);
                return;
            }

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isAdmin', data.user.role === "admin" ? 'true' : 'false');
            setRegistered(true);

        } catch (e) {
            alert("Something went wrong: " + e.message);
        }finally {
            setIsLoading(false)
        }
    }

    if (isLoggedIn) {
        return <Navigate to='/'/>
    }

    if(isLoading)
        return <Loading/>

    return (
        // inspired from : https://getbootstrap.com/docs/5.3/forms/layout/ inside a card
        <div className="card bg-dark text-white border-secondary shadow">
            <div className="card-body p-4">
                <form onSubmit={register}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text"
                            className="form-control border-0"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control border-0"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required/>
                    </div>

                    <div className="mb-3 p-3 rounded border border-secondary border-opacity-50">
                        <label className="form-label small text-info">Password generator</label>
                        <div className="d-flex gap-2">
                            <input
                                type="number"
                                className="form-control border-0 w-25"
                                name="password_length"
                                value={formData.password_length}
                                onChange={handleChange}
                                min="4"
                                max="50"
                            />
                            <button className="btn btn-outline-info btn-sm flex-grow-1" onClick={generatePassword}>
                                Generate
                            </button>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control border-0"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Generate or enter your own"
                            required
                        />
                    </div>

                    <div className="mb-4 form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="isAdmin"
                            name="isAdmin"
                            checked={formData.isAdmin}
                            onChange={handleChange}
                        />
                        <label className="form-check-label text-white" htmlFor="isAdmin">
                            Admin account
                        </label>
                    </div>

                    <button type="submit" className="btn btn-success w-100">
                        Register
                    </button>
                </form>

                <div className="text-center mt-3 pt-3 border-top border-secondary">
                    <p className="text-white small">Already have an account ? </p>
                    <Link className="text-info small text-decoration-none" to="/authentication">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}