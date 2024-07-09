import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
// import '../../styles/Browse.css';

export default function Browse() {
  const [exercises, setExercises] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Categories that users can select from dropdown menu. This stays the same.
  const formCategory = [
    "Chest",
    "Back",
    "Shoulders",
    "Arms",
    "Legs",
    "Core",
  ];

  // Fetch exercises and categories from the API and update the state.
  useEffect(() => {
    async function fetchData() {
      try {
        const exerciseResponse = await axios.get(`http://localhost:8000/api/exercise/`);
        setExercises(exerciseResponse.data);

        const categoryResponse = await axios.get(`http://localhost:8000/api/category/`);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  // Map category names to IDs
  //cat.name  is the name property of cat within the form category.
  //cat.name accesses the name property of the current category object in the itertion 
  function getCategoryID(categoryName) {
    const category = categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
    return category ? category.id : null;
  }

  // Filter exercises based on the selected category.
  function filterExercises() {
    const selectedCategoryID = getCategoryID(selectedCategory);
    console.log("Selected Category:", selectedCategory);
    const filteredExercises = exercises.filter(exercise => {
      console.log("Exercise Category:", exercise.category);
      return (
        selectedCategory === '' || exercise.category === selectedCategoryID
      );
    });
    console.log("Filtered Exercises:", filteredExercises);
    return filteredExercises;
  }

  // Reset the selected category if the user wants to select exercises from a different category.
  function handleReset() {
    setSelectedCategory('');
  }

  // Add an exercise to the log by exercise ID.
  async function handleAddToLog(exerciseId) {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/api/log/', { exercise: exerciseId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Exercise added to log!');
    } catch (error) {
      console.error('Error adding exercise to log:', error);
      toast.error('Failed to add exercise to log.');
    }
  }

  // Render the component.
  return (
    <>
      <div className="section">
        <div className="container">
          <h1 className="title">Browse Exercises</h1>
          <div className="controls">
            <select
              className="input"
              placeholder="Select Category..."
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
              <div
                onClick={() => handleAddToLog(exercise.id)}
                className="browse-column column is-one-third-desktop is-half-tablet is-half-mobile"
                key={index}
              >
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                      <p className="title is-5">{exercise.name}</p>
                      <p>{exercise.description}</p>
                      <button
                        className="button is-primary"
                        onClick={() => handleAddToLog(exercise.id)}
                      >
                        Add to Log
                      </button>
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


