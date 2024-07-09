import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import LogForm from './LogForm';


//
const SaveLog = () => {
    const [logs, setLogs] = useState([]);
    const [editingLog, setEditingLog] = useState(null);

// fetching the log from the backend
// this is currently not happening
    useEffect(() => {
        fetchLogs();
    }, []);


    //sending get request to the backend 
    //set the fetched data to the logs state variable
    //should catch the logs and any errors
    const fetchLogs = async () => {
        try {
            const token = localStorage.getItem('token')
            const { data } = await axios.get(`http://localhost:8000/api/log/`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(data)
            console.log("This is data")

            setLogs(data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    }

// two functions one for editing the log/ deleting the log
//
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
// resets the editing log to null
// do I need this?
    const handleClearEditing = () => {
        setEditingLog(null);
    };
//saves and edit a log based on the editing log set state
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
//should see a container for the save log functionality/ a list of past logs
// not seeing a list though???????
//
    return (
        <div className="save-log-container">
            <div className="log-list">
                <h2>Past Logs</h2>
                <ul>
                    {logs.map(log => (
                        <li key={log.id}>
                            <p>Date: {log.date}</p>
                            <p>Duration: {log.duration} minutes</p>
                            <p>Notes: {log.notes}</p>
                            <p>Exercises: {log.exercises.join(', ')}</p>
                            <button onClick={() => handleEditLog(log.id)}>Edit</button>
                            <button onClick={() => handleDeleteLog(log.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SaveLog;


// this page should help me to fetch and display save logs
// should allow user to edit and edit
//
