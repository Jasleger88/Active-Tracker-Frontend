import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const LogForm = ({ fetchLogs }) => {
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const logData = { date, duration, notes };

    try {
      await axios.post('/api/log/', logData);
      fetchLogs();
      setDate('');
      setDuration('');
      setNotes('');
      toast.success('Log added successfully');
    } catch (err) {
      console.error('Error adding log:', err);
      toast.error('Failed to add log');
    }
  };

  return (
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
        <div className="control">
          <button className="button is-primary" type="submit">Add Log</button>
        </div>
      </div>
    </form>
  );
};

export default LogForm;
