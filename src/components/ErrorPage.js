import React from 'react'
import { useRouteError, useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate();
    const error = useRouteError();
    const userLocation = JSON.parse(localStorage.getItem("swgy_userLocation"));

    if(!userLocation) {
        navigate("/");
    }

    return (
        <div>
            <h1>Oops!</h1>
            <h2>Something went wrong!</h2>
            <br />
            <p>{error.status + " : " + error.statusText}</p>
        </div>
    )
}

export default ErrorPage