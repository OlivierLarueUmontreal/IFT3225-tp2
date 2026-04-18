import {useEffect, useState} from 'react';
import {Loading} from "../components/Loading.jsx";
import {DocumentationTable} from "../components/DocumentationTable.jsx";

export const ApiDocumentation = () => {
    const [routes, setRoutes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const getRoutesDoc = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${BACKEND_URL}/api/v1/doc`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                setRoutes(data);
            } catch (e) {
                console.error("Error while retrieving doc !", e);
            } finally {
                setIsLoading(false);
            }
        };
        getRoutesDoc();
    }, []);

    if (isLoading) return <Loading/>;

    return (
        // <div className="container mt-5">
        <div>
            <h1 className="text-white mb-4 text-center">API Documentation</h1>
            <DocumentationTable routes={routes}/>
        </div>
    );
};