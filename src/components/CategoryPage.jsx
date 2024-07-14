import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import '../../styles/CategoryPage.css';
import { baseUrl } from '../config';

const CategoryPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    description: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [ "Chest", "Shoulders", "Back", "Arms", "Legs", "Core"];

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(`${baseUrl}/exercise/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Exercise created successfully!");
      setFormData({
        category: "",
        name: "",
        description: ""
      });

      navigate('/saveLog');
    } catch (err) {
      console.log(err.response.data);
      toast.error("Sorry, we encountered an error!");
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function displayExercisesDropdown(categoryName) {
    const category = categories.find(cat => cat.name === categoryName);
    if (category) {
      return (
        <div className="field">
          <label className="label">Select Exercise</label>
          <div className="control">
            <select
              className="input"
              name="name"
              onChange={handleChange}
              value={formData.name}
            >
              <option value="">Select Exercise</option>
              {category.exercises.map((exercise, index) => (
                <option key={index} value={exercise.name}>
                  {exercise.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }
    return null;
  }

  function displayMuscleGroupImage(categoryName) {
    const category = categories.find(cat => cat.name === categoryName);
    if (category) {
      return (
        <div className="image-overlay">
          <img src={category.exercises[0].image} alt={`${categoryName} Muscle Groups`} />
        </div>
      );
    }
    return null;
  }

  return (
    <div className="section category-page">
      <div className="columns">
        <div className="column is-half">
          {selectedCategory && displayMuscleGroupImage(selectedCategory)}
        </div>
        <div className="column is-half">
          <div className="section">
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Select Category</label>
                  <div className="control">
                    <select
                      className="input"
                      name="category"
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setFormData({ ...formData, category: e.target.value });
                      }}
                      value={formData.category}
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.name} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {selectedCategory && displayExercisesDropdown(selectedCategory)}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
