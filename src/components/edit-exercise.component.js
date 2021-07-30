import React, {useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditExercise(props){

    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);

    const changeState = (newState) => {
        setUsername(newState.username);
        setDescription(newState.description);
        setDuration(newState.duration);
        setDate(newState.date);
        setUsers(newState.users);
    }

    useEffect(() => {       // similar to componentDidMount

        fetch('http://localhost:5000/exercises/'+props.match.params.id)
            .then(res => res.json())
            .then(exerciseData => {
                console.log("Editing exercise: ", exerciseData);
                changeState({
                    username: exerciseData.username,
                    description: exerciseData.description,
                    duration: exerciseData.duration,
                    date: new Date(exerciseData.date),
                    users: users,
                });
            });
            
        fetch('http://localhost:5000/users/')        // get the users from the database
            .then(res => res.json())
            .then(usersData => {
                console.log("Users data: ", usersData);
                if(usersData.length > 0){
                    changeState({
                        username: username,
                        description: description,
                        duration: duration,
                        date: date,
                        users: usersData.map(user => user.username),
                    });
                } else {
                    window.location="/user";        // Go create a user first
                }
    
            })
            .catch(err => console.error("Error: ", err));
    }, []);

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const onChangeDuration = (e) => {
        setDuration(e.target.value);
    };

    const onChangeDate = (date) => {
        setDate(date);
    };

    const onSubmit = (e) => {
        e.preventDefault();     // prevent normal HTML behaviour

        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date,
        }

        console.log(exercise);

        fetch('http://localhost:5000/exercises/update/' + props.match.params.id, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(exercise),
        })
            .then(res => res.json())
            .then(exerciseData => console.log(exerciseData))
            .catch(err => console.error("Error: ", err));

        window.location = "/";  // Take the person back to the homepage
    }

    return(
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select required className="form-control" value={username} onChange={onChangeUsername}>
                        {users.map(user => {                      /* dropdown select menu */
                            return <option key={user} value={user}> {user} </option>
                        })}
                    </select>
                </div>  
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text" required className="form-control" value={description} onChange={onChangeDescription} />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input type="text" required className="form-control" value={duration} onChange={onChangeDuration} />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker selected={date} onChange={onChangeDate} />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Edit Exercise Log" />
                </div>
            </form>
        </div>
    )
}

export default EditExercise;