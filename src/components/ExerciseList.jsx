import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryPage from './CategoryPage';
import '../../styles/ExerciseList.css';


const ExerciseList = ({ fetchingExercises }) => {
    const [exercises, setExercises] = useState([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchExercises();
    }, []);

    const fetchExercises = async () => {
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
        <div className='exerciseList'>
            <CategoryPage/>
            






            {/* <ul>
                {exercises.filter(exercise => !filter || exercise.name.startsWith(filter)).map(exercise => (
                    <li key={exercise.id}>{exercise.name} - {exercise.description}</li>
                ))}
            </ul> */}
        </div>
    );
};

export default ExerciseList;