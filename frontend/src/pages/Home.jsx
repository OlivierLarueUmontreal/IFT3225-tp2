import React from "react"

export const Home = () => {
    const [msg, setMsg] = React.useState("")
    React.useEffect(() => {
        const fetchMessage = async () => {
            try {
                const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
                const response = await fetch(`${BACKEND_URL}/health`)
                const data = await response.json();
                setMsg(data.message)

            } catch (err){
                console.log(err);
                setMsg("Cant connect");
            }
        }

        fetchMessage();

    }, [])

    return (
        <div>
            <h1>
               Message from backend: {msg}
            </h1>
        </div>
    )
}