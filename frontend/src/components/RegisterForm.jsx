import { useEffect, useState} from "react"
import { Route, Routes, useNavigate } from 'react-router-dom';

export const RegisterForm = () => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password_length: 10,
        password: ""
    })

    const [registered, setRegistered] = useState(false)

    const navigate = useNavigate();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    // useEffect(() => {
    //     console.log(formData.username, formData.email)
    // }, [formData])

    useEffect(() => {
        if(registered){
            alert("Registered successfully");
            setTimeout(() => {
                navigate("/authentication")
            }, 1000);
            setFormData({username:"", password_length: 10, email: "", password: ""})
        }
    }, [registered])
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(prevForm => {
            return ({...prevForm, [name]: value})
        })
    }

    const generatePassword = async (event) => {
        event.preventDefault();
        try {
            const password_length = formData.password_length;
            const response = await fetch(`${BACKEND_URL}/api/v1/motdepasse/${password_length}`)
            const data = await response.json();
            const password = data.password;
            setFormData(prevForm => ({ ...prevForm, password }));
        } catch(e){

        }
    }

    const register = async(event) => {
        event.preventDefault();
        try{

            if(formData.username == "" || formData.password == "" || formData.email == ""){
                alert("Please input all fields");
                return;
            }
            const newUser = {
                username: formData.username,
                email: formData.email,
                password: formData.password
            }
            const response = await fetch(`${BACKEND_URL}/api/v1/profils`,{
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(newUser) 
            });

            if (!response.ok) {
                const data = await response.json();
                alert(data.msg);
                return;
            }

            setRegistered(true);

        } catch (e){
            alert("Something went wrong: " + e.message);
        }
    }

    return(
        <div>
            <form>
                <label htmlFor="username">Username: </label>
                <input 
                    type = "text" 
                    id = "username"
                    name = "username"
                    onChange = {handleChange}
                />
                <br></br>

                <label htmlFor="email">Email: </label>
                <input 
                    type = "text" 
                    id = "email"
                    name = "email"
                    onChange = {handleChange}

                />
                <br></br>
                <label htmlFor="password_length">Password Length: </label>
                <input
                    type = "number" 
                    id = "password_length"
                    name = "password_length"
                    onChange = {handleChange}
                />
                <br></br>
                <button onClick={generatePassword}>
                    Generate Password
                </button>
                <br></br>

                <label htmlFor="password">Password: </label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Generate or type your own"
                />
            </form>
            <button onClick = {register}>
                Create account
            </button>
        </div>
    )
}