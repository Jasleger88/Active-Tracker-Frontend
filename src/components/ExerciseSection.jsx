import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const ExerciseSection = () => {
  const [exercises, setExercises] = useState([]);
  const [fetchingExercises, setFetchingExercises] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchExercises();
    fetchCategories();
  }, []);

  const fetchExercises = async () => {
    try {
      setFetchingExercises(true);
      const response = await axios.get("/api/exercise");
      setExercises(response.data);
    } catch (err) {
      console.error("Error fetching exercises:", err);
    } finally {
      setFetchingExercises(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmitExercise = async (exerciseData) => {
    try {
      await axios.post("/api/exercise/", exerciseData);
      fetchExercises();
      toast.success("Exercise added successfully");
    } catch (err) {
      console.error("Error adding exercise:", err);
      toast.error("Failed to add exercise");
    }
  };

  const handleDeleteExercise = async (exerciseId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/exercise/${exerciseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Exercise deleted successfully");
      fetchExercises();
    } catch (err) {
      console.error("Error deleting exercise:", err);
      toast.error("Failed to delete exercise");
    }
  };

  return (
    <div>
      <h1>Exercise Manager</h1>
      {/* <ExerciseForm */}
        categories={categories}
        onSubmit={handleSubmitExercise}
        fetchExercises={fetchExercises}
      />
      <h2>Exercise List</h2>
      {!fetchingExercises && Array.isArray(exercises) && (
        <ul>
          {exercises.map((exercise) => (
            <li key={exercise.id}>
              {exercise.name} - {exercise.description}
              <button
                onClick={() => handleDeleteExercise(exercise.id)}
                className="button is-danger is-small ml-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {fetchingExercises && <p>Loading exercises...</p>}
    </div>
  );
};

export default ExerciseSection;
