import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/LogForm.css';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../config';

const LogForm = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedExercise, setSelectedExercise] = useState('');
  const [exercises, setExercises] = useState([]);
  const [logExercises, setLogExercises] = useState([]);

  useEffect(() => {
    async function fetchExercises() {
      try {
        const response = await axios.get(`${baseUrl}/exercise/`);
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    }

    fetchExercises();
  }, []);

 
  const filteredExercises = exercises.filter(
    (exercise) => exercise.category === parseInt(selectedCategory)
  );

 
  const handleAddToLog = () => {
    const exerciseToAdd = exercises.find(
      (exercise) => exercise.id === parseInt(selectedExercise)
    );
    if (exerciseToAdd) {
      setLogExercises([...logExercises, exerciseToAdd]);
      setSelectedExercise('');
      toast.success('Exercise added to log successfully');
    }
  };


  const handleDeleteExercise = (index) => {
    const updatedExercises = [...logExercises];
    updatedExercises.splice(index, 1);
    setLogExercises(updatedExercises);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const logData = { date, duration, notes, exercises: logExercises.map((exercise) => exercise.id) };
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${baseUrl}/log/`, logData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/saveLog');
      toast.success('Log added successfully');
      setDate('');
      setDuration('');
      setNotes('');
      setLogExercises([]);
    } catch (err) {
      console.error('Error adding log:', err);
      toast.error('Failed to add log');
    }
  };

  return (
    <div className="columns">
      <ToastContainer />
      <div className="column is-6" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '10px' }}>
        <h2 className="title is-4">Log Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Date</label>
            <div className="control">
              <input
                className="input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Duration (minutes)</label>
            <div className="control">
              <input
                className="input"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Notes</label>
            <div className="control">
              <textarea
                className="textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <div className="select">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedExercise(''); 
                  }}
                >
                  <option value="">Select Category</option>
                  <option value="1">Arms</option>
                  <option value="2">Shoulders</option>
                  <option value="3">Chest</option>
                  <option value="4">Back</option>
                  <option value="5">Legs</option>
                  <option value="6">Core</option>
                </select>
              </div>
            </div>
          </div>
          {selectedCategory && (
            <div className="field">
              <label className="label">Exercise</label>
              <div className="control">
                <div className="select">
                  <select
                    value={selectedExercise}
                    onChange={(e) => setSelectedExercise(e.target.value)}
                  >
                    <option value="">Select Exercise</option>
                    {filteredExercises.map((exercise) => (
                      <option key={exercise.id} value={exercise.id}>
                        {exercise.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="button is-info ml-2"
                  type="button"
                  onClick={handleAddToLog}
                >
                  Add Exercise to Log
                </button>
              </div>
            </div>
          )}
          <div className="field is-grouped" style={{ marginTop: '10px' }}>
            <div className="control">
              <button className="button is-success" type="submit">
                Save Log
              </button>
            </div>
            <div className="control">
              <button
                className="button is-warning is-light"
                type="button"
                onClick={() => {
                  setDate('');
                  setDuration('');
                  setNotes('');
                  setSelectedCategory('');
                  setSelectedExercise('');
                  setLogExercises([]);
                }}
              >
                Clear Form
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="column is-6" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '10px' }}>
        <h2 className="title is-4">Log Details</h2>
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Duration:</strong> {duration} minutes
        </p>
        <p>
          <strong>Notes:</strong> {notes}
        </p>
        <p>
          <strong>Exercises:</strong>
        </p>
        {logExercises.length > 0 ? (
          <ul>
            {logExercises.map((ex, index) => (
              <li key={index}>
                {ex.name}
                <button
                  className="button is-small is-danger is-outlined ml-2"
                  onClick={() => handleDeleteExercise(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No exercises added yet</p>
        )}
      </div>
    </div>
  );
};

export default LogForm;

