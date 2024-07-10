import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../styles/SaveLog.css'; 

//  fetch exercise name asynchronously
const AsyncExerciseName = ({ exerciseId }) => {
  const [exerciseName, setExerciseName] = useState('');

  useEffect(() => {
    fetchExerciseName();
  }, []);

  const fetchExerciseName = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`http://localhost:8000/api/exercise/${exerciseId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExerciseName(data.name);
    } catch (error) {
      console.error(`Error fetching exercise name for ID ${exerciseId}:`, error);
      setExerciseName(`Exercise ID ${exerciseId}`);
    }
  };

  return <span>{exerciseName}</span>;
};

const SaveLog = () => {
  const [logs, setLogs] = useState([]);
  const [editingLog, setEditingLog] = useState(null);
  const [flippedIndex, setFlippedIndex] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`http://localhost:8000/api/log/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
      toast.error('Failed to fetch logs');
    }
  };

  const handleEditLog = (logId) => {
    const logToEdit = logs.find(log => log.id === logId);
    setEditingLog(logToEdit);
  };

  const handleDeleteLog = async (logId) => {
    try {
      await axios.delete(`http://localhost:8000/api/log/${logId}/`);
      toast.success('Log deleted successfully');
      fetchLogs();
    } catch (error) {
      console.error('Error deleting log:', error);
      toast.error('Failed to delete log');
    }
  };

  const handleClearEditing = () => {
    setEditingLog(null);
  };

  const handleSaveLog = async (logData) => {
    try {
      if (editingLog) {
        await axios.put(`http://localhost:8000/api/log/${editingLog.id}/`, logData);
        toast.success('Log updated successfully');
      } else {
        await axios.post(`http://localhost:8000/api/log/`, logData);
        toast.success('Log added successfully');
      }
      fetchLogs();
      handleClearEditing();
    } catch (error) {
      console.error('Error saving log:', error);
      toast.error('Failed to save log');
    }
  };

  const handleCardClick = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <div className="save-log-container">
      <h2 className="title is-4">Past Logs</h2>
      <div className="columns is-multiline">
        {logs.map((log, index) => (
          <div className="column is-one-third" key={log.id}>
            <div className={`card save-log-card ${flippedIndex === index ? 'is-flipped' : ''}`} onClick={() => handleCardClick(index)}>
              <div className="card-content">
                <div className="content">
                  <p><strong>Date:</strong> {log.date}</p>
                  {flippedIndex === index && (
                    <>
                      <p><strong>Duration:</strong> {log.duration} minutes</p>
                      <p><strong>Notes:</strong> {log.notes}</p>
                      <p><strong>Exercises:</strong></p>
                      <ul>
                        {log.exercises.map((exerciseId, i) => (
                          <li key={i}>
                            <AsyncExerciseName exerciseId={exerciseId} />
                          </li>
                        ))}
                      </ul>
                      <div className="buttons">
                        <button className="button is-info" onClick={(e) => { e.stopPropagation(); handleEditLog(log.id); }}>Edit</button>
                        <button className="button is-danger" onClick={(e) => { e.stopPropagation(); handleDeleteLog(log.id); }}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaveLog;
