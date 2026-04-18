import React, {useEffect, useState} from 'react';
import {Loading} from "../components/Loading.jsx";

export const ApiDocumentation = () => {

    if (isLoading) return <Loading/>;

    return (
        // inspired from : https://getbootstrap.com/docs/4.1/content/tables/
        <div className="container-fluid mt-5 px-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-white">Documentation API REST</h1>
            </div>

            <div className="table-responsive">
                <table className="table table-dark table-hover table-bordered border-secondary align-middle">
                    <thead className="table-secondary">
                    <tr>
                        <th style={{width: "100px"}}>Method</th>
                        <th style={{width: "200px"}}>Route</th>
                        <th>Description</th>
                        <th>CURL example</th>
                        <th>Expected return</th>
                    </tr>
                    </thead>
                    <tbody>
                    {docs.map((route, index) => (
                        <tr key={index}>
                            <td className="text-center">
                                <span className={`badge ${getMethodColor(route.method)} d-block py-2`}>
                                    {route.method}
                                </span>
                            </td>
                            <td>
                                <code className="text-info fw-bold">{route.path}</code>
                            </td>
                            <td className="small text-light">
                                {route.description}
                            </td>
                            <td>
                                <pre className="bg-black text-success p-2 rounded mb-0 border border-secondary"
                                     style={{fontSize: '0.75rem'}}>
                                    {route.curl}
                                </pre>
                            </td>
                            <td>
                                <pre className="bg-black text-info p-2 rounded mb-0 border border-secondary"
                                     style={{fontSize: '0.75rem'}}>
                                    {route.response}
                                </pre>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

//Simply to have cute colors :)
const getMethodColor = (method) => {
    switch (method) {
        case 'GET':
            return 'bg-success';
        case 'POST':
            return 'bg-primary';
        case 'PUT':
            return 'bg-warning text-dark';
        default:
            return 'bg-secondary';
    }
};