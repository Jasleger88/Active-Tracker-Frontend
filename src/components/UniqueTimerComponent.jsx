import React, { useState, useEffect } from 'react';
import '../../styles/UniqueTimerComponent.css';

const UniqueTimerComponent = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              clearInterval(interval);
              setIsActive(false);
            } else {
              setHours(hours => hours - 1);
              setMinutes(59);
              setSeconds(59);
            }
          } else {
            setMinutes(minutes => minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds => seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, hours, minutes, seconds]);

  const startTimer = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      return;
    }
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div className="unique-timer-container" id="unique-timer-container">
      <p id="unique-timer-intro">Start interval training Now with a timer!</p>
      <div className="unique-timer-input" id="unique-timer-input-hours">
        <label>Hours:</label>
        <input type="number" value={hours} onChange={(e) => setHours(parseInt(e.target.value, 10))} />
      </div>
      <div className="unique-timer-input" id="unique-timer-input-minutes">
        <label>Minutes:</label>
        <input type="number" value={minutes} onChange={(e) => setMinutes(parseInt(e.target.value, 10))} />
      </div>
      <div className="unique-timer-input" id="unique-timer-input-seconds">
        <label>Seconds:</label>
        <input type="number" value={seconds} onChange={(e) => setSeconds(parseInt(e.target.value, 10))} />
      </div>
      <div className="unique-timer-controls" id="unique-timer-controls">
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="unique-timer-display" id="unique-timer-display">
        <svg className="unique-timer-svg">
          <circle
            className="unique-timer-circle"
            cx="50%"
            cy="50%"
            r="45%"
            fill="transparent"
            strokeDasharray={`${Math.PI * 2 * 45}% ${Math.PI * 2 * 45}%`}
            strokeDashoffset={`-${Math.PI * 2 * 45}%`}
          />
        </svg>
        <div className="unique-timer-label" id="unique-timer-label">
          <h1>Timer: {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</h1>
        </div>
      </div>
    </div>
  );
};

export default UniqueTimerComponent;

