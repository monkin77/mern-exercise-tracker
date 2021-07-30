import React, {useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise(props){

    const [state, setState] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: [],
    });

    useEffect(() => {       // similar to componentDidMount

        fetch('http://localhost:5000/users/')        // get the users from the database
            .then(res => res.json())
            .then(usersData => {
                console.log(usersData);
                if(usersData.length > 0){
                    setState({
                        ...state,
                        users: usersData.map(user => user.username),
                        username: usersData[0].username,
                    });
                } else {
                    window.location="/user";        // Go create a user first
                }
    
            })
            .catch(err => console.error("Error: ", err));
    }, []);

    const onChangeUsername = (e) => {
        setState({
            ...state,
            username: e.target.value,
        });
    };

    const onChangeDescription = (e) => {
        setState({
            ...state,
            description: e.target.value,
        });
    };

    const onChangeDuration = (e) => {
        setState({
            ...state,
            duration: e.target.value,
        });
    };

    const onChangeDate = (date) => {
        setState({
            ...state,
            date: date,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();     // prevent normal HTML behaviour

        const exercise = {
            username: state.username,
            description: state.description,
            duration: state.duration,
            date: state.date,
        }

        console.log(exercise);

        fetch('http://localhost:5000/exercises/add', {
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
            <h3>Create New Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select /*ref="userInput"*/ required className="form-control" value={state.username} onChange={onChangeUsername}>
                        {state.users.map(user => {                      /* dropdown select menu */
                            return <option key={user} value={user}> {user} </option>
                        })}
                    </select>
                </div>  
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text" required className="form-control" value={state.description} onChange={onChangeDescription} />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input type="text" required className="form-control" value={state.duration} onChange={onChangeDuration} />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker selected={state.date} onChange={onChangeDate} />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Create Exercise Log" />
                </div>
            </form>
        </div>
    )
}

export default CreateExercise;