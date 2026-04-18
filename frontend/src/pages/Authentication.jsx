import { AuthenticationForm } from "../components/AuthenticationForm";

export const Authentication = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-4">
                    <h1 className="text-white text-center mb-4">Authentification</h1>
                    <AuthenticationForm />
                </div>
            </div>
        </div>
    )
}