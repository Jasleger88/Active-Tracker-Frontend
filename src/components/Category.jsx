import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExerciseList = ({ categoryId, categoryName }) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetchExercises();
  }, [categoryId]);

  const fetchExercises = async () => {
    try {
      const response = await axios.get(`/api/exercise?category=${categoryId}`);
      setExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  return (
    <div>
      <h2>Exercises for {categoryName}</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;




