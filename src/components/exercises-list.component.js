import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Exercise from "./exercise.component";

function ExercisesList(){

    const [exercises, setExercises] = useState([]);

    useEffect(() => {       // constructor
        fetch('http://localhost:5000/exercises')
            .then(res => res.json())
            .then(exercisesData => {
                console.log(exercisesData);
                setExercises(exercisesData);
            })
            .catch(err => console.error("Error: ", err));
    }, []);

    const deleteExercise = (id) => {
        fetch('http://localhost:5000/exercises/'+id, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(status => {
                console.log(status);
                setExercises(exercises.filter(exercise => exercise._id !== id));
            })
            .catch(err => console.error("Error: ", err));
    }

    function exerciseList(){
        return exercises.map(exercise => {
            return <Exercise exercise={exercise} deleteExercise={deleteExercise} key={exercise._id} />
        })
    }

    return(
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { exerciseList() }
                </tbody>
            </table>
        </div>
    )
}

export default ExercisesList;