import React from 'react';


const ExerciseCard = ({ exercise }) => {
  return (
    <div className="exercise-card">
      <img src={exercise.image} alt={exercise.name} />
      <div className="exercise-details">
        <h3>{exercise.name}</h3>
        <p>{exercise.description}</p>
        <p>Category: {exercise.category}</p>
      </div>
    </div>
  );
};

export default ExerciseCard;
