export const DocumentationTable = ({routes}) => {

    //Simply to have cute colors :)
    // inspired the color with swagger: https://swagger.io/
    const getMethodBgColor = (method) => {
        switch (method) {
            case 'GET': return 'bg-primary';
            case 'POST': return 'bg-success';
            case 'PUT': return 'bg-warning text-dark';
            case 'DELETE': return 'bg-danger';
            default: return 'bg-secondary';
        }
    }

    const getMethodTextColor = (method) => {
        switch (method) {
            case 'GET': return 'text-primary';
            case 'POST': return 'text-success';
            case 'PUT': return 'text-warning';
            case 'DELETE': return 'text-danger';
            default: return 'text-white';
        }
    }

    if (!routes || !Array.isArray(routes) ||routes.length <= 0) {
        return <h3 className="text-center text-danger mt-5">No Documentation Found</h3>
    }

    return (// inspired from : https://getbootstrap.com/docs/4.1/content/tables/
        <div className="container-fluid mt-5 px-4">
            <div className="table-responsive">
                <table className="table table-dark table-hover table-bordered border-secondary align-middle">
                    <thead >
                    <tr>
                        <th>Method</th>
                        <th>Route</th>
                        <th>Description</th>
                        <th>CURL example</th>
                        <th>Expected return</th>
                    </tr>
                    </thead>
                    <tbody>
                    {routes.map((route, index) => (
                        <tr key={index} >
                            <td className="text-center">
                                <span className={`badge ${getMethodBgColor(route.method)} d-block py-2`}>
                                    {route.method}
                                </span>
                            </td>
                            <td>
                                {/*to display as code: https://www.w3schools.com/TAgs/tag_code.asp*/}
                                <code className={`${getMethodTextColor(route.method)} fw-bold`}>{route.path}</code>
                            </td>
                            <td className="small text-white">
                                {route.description}
                            </td>
                            <td>
                                {/*to keep the formate https://www.w3schools.com/TAgs/tag_pre.asp*/}
                                <pre className="text-white p-2 mb-0" style={{fontSize: '0.75rem'}}>
                                    {route.curl}
                                </pre>
                            </td>
                            <td>
                                <pre className="text-white p-2 mb-0"
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
    )
};