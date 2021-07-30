import React, {useState, useEffect} from "react";
import { Router } from "react-router-dom";

function CreateUser(){

    const [username, setUsername] = useState('');

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        const user = {
            username: username,
        }

        console.log(user);
        fetch('http://localhost:5000/users/add', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => {
                console.error("Error: ", err);
            });  

        setUsername('');
    }

    return(
        <div>
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text" required className="form-control" value={username} onChange={onChangeUsername} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateUser;