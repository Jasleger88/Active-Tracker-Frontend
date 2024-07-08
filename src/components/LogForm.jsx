import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../styles/LogForm.css';

const LogForm = ({ fetchLogs }) => {
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [exercise, setExercise] = useState('');
  const [exercises, setExercises] = useState([]);

  const handleAddExercise = () => {
    if (exercise.trim()) {
      setExercises([...exercises, exercise]);
      setExercise('');
    }
  };

  const handleDeleteExercise = (index) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(index, 1);
    setExercises(updatedExercises);
  };

  const handleClearForm = () => {
    setDate('');
    setDuration('');
    setNotes('');
    setExercises([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const logData = { date, duration, notes, exercises };

    try {
      await axios.post('/api/log/', logData);
      fetchLogs();
      handleClearForm();
      toast.success('Log added successfully');
    } catch (err) {
      console.error('Error adding log:', err);
      toast.error('Failed to add log');
    }
  };

  return (
    <div className="columns">
      <div className="column is-6">
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
            <label className="label">Exercises</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
              />
              <button
                className="button is-warning"
                type="button"
                onClick={handleAddExercise}
              >
                Add Exercise
              </button>
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-success"
                type="submit"
              >
                Save Log
              </button>
            </div>
            <div className="control">
              <button
                className="button is-warning is-light"
                type="button"
                onClick={handleClearForm}
              >
                Clear Form
              </button>
            </div>
            <div className="control">
            <button
                className="button is-danger is-dark"
                onClick={() => handleDeleteExercise(index)}
              >
               Edit
              </button>
              </div>
          </div>
        </form>
      </div>
      <div className="column is-6" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
        <h2 className="title is-4">Log Details</h2>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Duration:</strong> {duration} minutes</p>
        <p><strong>Notes:</strong> {notes}</p>
        <p><strong>Exercises:</strong></p>
        <ul>
          {exercises.map((ex, index) => (
            <li key={index}>
              {ex}
              <button
                className="button is-small is-danger is-outlined ml-2"
                onClick={() => handleDeleteExercise(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LogForm;

