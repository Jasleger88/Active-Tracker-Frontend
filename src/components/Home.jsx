import React from 'react';
import '../../styles/Home.css';


const Home = () => {
  return (
    <>
      <div className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 id="home-page-header" className="title is-1 has-text-weight-bold animated-bounce-in">
              ACTIVE-TRACKER
            </h1>
            <h2>Track Your Workout with Ease</h2>
          </div>
          <div className="image-grid">
            <img src="https://images.unsplash.com/photo-1627483297886-49710ae1fc22?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8" alt="Workout Image 1" />
            <img src="https://images.unsplash.com/photo-1627483297929-37f416fec7cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D" alt="Workout Image 2" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
