import React , { useState } from 'react'

const User = ({name, city}) => {
    const [count, setCount] = useState(0);

    return (
        <div className="user-card">
            <h2>Name : {name}</h2>
            <h3>Location : {city}</h3>
            <h3>Contact : @chahatb03</h3>
            <p>Count : {count}</p>
        </div>
    )
}

export default User