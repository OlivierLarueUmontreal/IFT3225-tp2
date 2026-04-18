import { RegisterForm } from "../components/RegisterForm.jsx"

export const Register = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">
                    <h1 className="text-white text-center mb-4">Register</h1>
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}