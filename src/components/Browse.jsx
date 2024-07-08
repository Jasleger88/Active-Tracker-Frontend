import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function Browse() {
  const [cats, setCats] = useState([]);
  const [catFilter, setCatFilter] = useState('');
  const [selectedExercise, setSelectedExercise] = useState('');

  const formCategory = [
    "Chest",
    "Back",
    "Shoulders",
    "Arms",
    "Legs",
    "Core",
  ];

  useEffect(() => {
    async function fetchCats() {
      try {
        const resp = await axios.get(`http://localhost:8000/api/auth/l/`);
        const data = await resp.data;
        setCats(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to fetch categories');
      }
    }
    fetchCats();
  }, []);

  function filterCats() {
    const filteredCats = cats.filter(cat => {
      const category = cat.name.toLowerCase();
      const filterText = catFilter.toLowerCase();
      return category.includes(filterText)
        && (selectedExercise === '' || cat.name === selectedExercise);
    });
    return filteredCats;
  }

  function handleReset() {
    setCatFilter('');
    setSelectedExercise('');
  }

  async function handleAddToWishlist(cat) {
    try {
      console.log(cat);
      const token = localStorage.getItem("token");

      const { data } = await axios.post(`/api/LogForm`, { cat }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Added To Log!");
    } catch {
      toast.error("Category Not Added");
    }
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <h1 className="title">Select Exercises To Add to Your Log</h1>
          <div className="controls">
            <select
              className="input"
              placeholder="Select Category.."
              onChange={(event) => setSelectedExercise(event.target.value)}
              value={selectedExercise}
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
            {filterCats().map((cat, index) => (
              <div
                onClick={() => handleAddToWishlist(cat)}
                className="browse-column column is-one-third-desktop is-half-tablet is-half-mobile"
                key={index}
              >
                <div className="card">
                  <div className="card-content">
                    <div className="card-image">
                      <div className="container t-shirt-container" id={cat.name}>
                        <div className="container image-overlay-container">
                          <img src={cat.imageUrl} alt={`picture of ${cat.name}`} />
                        </div>
                      </div>
                    </div>
                    <div className="card-content">
                      <p><strong>Category:</strong> {cat.name}</p>
                      <p><strong>Description:</strong> {cat.description}</p>
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
