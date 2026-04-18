export const ProfilInfo = ({name, email, role, id, actionButton}) => {
    return (
        <div className="card h-100 shadow-sm bg-dark text-white border-secondary">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title text-info mb-0">{name}</h5>
                    {actionButton && (
                        <div className="ms-2">
                            {actionButton}
                        </div>
                    )}
                </div>
                <h6 className="card-subtitle mb-2 "><strong>Role: </strong>{role}</h6>
                <p className="card-text mb-1"><strong>Email:</strong> {email}</p>
                <p className="card-text small text-secondary"><strong>ID:</strong> {id}</p>
            </div>
        </div>
    )

}