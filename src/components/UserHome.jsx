import React from 'react';
import '../../styles/UserHome.css';

const UserHome = () => {
  return (
    <>
      <div className="home-container is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="text-box">
              <h1 id="home-page-header" className="title is-1 has-text-weight-bold animated-bounce-in">
                ACTIVE-TRACKER
              </h1>
              <h2 className="welcome animated-bounce-in">Welcome to Active-Tracker</h2>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="content">
              <h3 className="title is-3">Create Your Own Workout / Track Your Fitness</h3>
              <p>Follow these steps to get started:</p>
              <ol>
                <li><strong>Create a Log:</strong> Navigate to the log creation page.</li>
                <li><strong>Add Exercises:</strong> Click "Add Exercise" and enter the details.</li>
                <li><strong>Save Your Workout:</strong> Save your workout for future tracking.</li>
                <li><strong>Track Progress:</strong> Use the log management feature to monitor your progress.</li>
                <li><strong>Use the Interval Timer:</strong> Set workout times or intervals with our timer.</li>
              </ol>
              <p>Start your fitness journey today with Active-Tracker!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHome;

