import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ExerciseList = ({ fetchingAllExercises }) => {
    const [exercises, setExercises] = useState([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchingAllExercises();
    }, []);

    const fetchingAllExercises = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/exercise');
            setExercises(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching Exercises:', err);
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <label>Filter Exercises: </label>
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value="">All</option>
                {[...'A-Z'].map(letter => (
                    <option key={letter} value={letter}>{letter}</option>
                ))}
            </select>
            <ul>
                {exercises.filter(exercise => !filter || exercise.name.startsWith(filter)).map(exercise => (
                    <li key={exercise.id}>{exercise.name} - {exercise.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default ExerciseList;