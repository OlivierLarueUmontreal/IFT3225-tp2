export const Loading = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            {/* inspiration: https://getbootstrap.com/docs/4.4/components/spinners/*/}
            <div className="spinner-border text-white" role="status" style={{width: '3rem', height: '3rem'}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};