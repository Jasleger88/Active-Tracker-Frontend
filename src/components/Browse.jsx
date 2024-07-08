import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
// import '../../styles/Browse.css';

export default function Browse() {
  const [exercises, setExercises] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const formCategory = [
    "Chest",
    "Back",
    "Shoulders",
    "Arms",
    "Legs",
    "Core",
  ];

  useEffect(() => {
    async function fetchExercises() {
      try {
        const response = await axios.get(`http://localhost:8000/api/exercise/`);
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    }

    fetchExercises();
  }, []);

  function filterExercises() {
    return exercises.filter(exercise => 
      selectedCategory === '' || exercise.category === selectedCategory
    ).sort((a, b) => a.name.localeCompare(b.name));
  }

  function handleReset() {
    setSelectedCategory('');
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <h1 className="title">Browse Exercises</h1>
          <div className="controls">
            <select
              className="input"
              onChange={(event) => setSelectedCategory(event.target.value)}
              value={selectedCategory}
            >
              <option value="">Select Category</option>
              {formCategory.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button className="button is-danger" onClick={handleReset}>Reset</button>
          </div>
          <div className="browse-columns columns is-multiline is-mobile">
            {filterExercises().map((exercise, index) => (
              <div className="browse-column column is-one-third-desktop is-half-tablet is-half-mobile" key={index}>
                <div className="card">
                  <div className="card-content">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={exercise.image} alt={`Image of ${exercise.name}`} />
                      </figure>
                    </div>
                    <div className="content">
                      <p className="title is-5">{exercise.name}</p>
                      <p>{exercise.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}