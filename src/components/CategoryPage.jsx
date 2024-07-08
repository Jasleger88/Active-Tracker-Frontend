import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import '../../styles/CategoryPage.css'




const CategoryPage = ({ categoryId, categoryName }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "",
    name: "Name of Exercise",
    description: "Add Description Here",

  });

  const formCategory = [
    "Chest",
    "Back",
    "Shoulders",
    "Arms",
    "Legs",
    "Core",
  ];

  // update my pictures later
  const categoryImages = {
    Chest:"https://media.istockphoto.com/id/1309275239/photo/labeled-male-hamstring-muscle-group-on-skeleton.webp?b=1&s=170667a&w=0&k=20&c=BXSvX5o0GZyOteIkZjEsTPfTLkMWnibJRh4JtIYODRQ=",
    Back:"https://media.istockphoto.com/id/1309275239/photo/labeled-male-hamstring-muscle-group-on-skeleton.webp?b=1&s=170667a&w=0&k=20&c=BXSvX5o0GZyOteIkZjEsTPfTLkMWnibJRh4JtIYODRQ=",
    Shoulders:"https://media.istockphoto.com/id/1309275239/photo/labeled-male-hamstring-muscle-group-on-skeleton.webp?b=1&s=170667a&w=0&k=20&c=BXSvX5o0GZyOteIkZjEsTPfTLkMWnibJRh4JtIYODRQ=",
    Legs: "https://media.istockphoto.com/id/1309275239/photo/labeled-male-hamstring-muscle-group-on-skeleton.webp?b=1&s=170667a&w=0&k=20&c=BXSvX5o0GZyOteIkZjEsTPfTLkMWnibJRh4JtIYODRQ=",
    Arms: "https://media.istockphoto.com/id/1309275239/photo/labeled-male-hamstring-muscle-group-on-skeleton.webp?b=1&s=170667a&w=0&k=20&c=BXSvX5o0GZyOteIkZjEsTPfTLkMWnibJRh4JtIYODRQ=",
    Core:'https://media.istockphoto.com/id/1309275239/photo/labeled-male-hamstring-muscle-group-on-skeleton.webp?b=1&s=170667a&w=0&k=20&c=BXSvX5o0GZyOteIkZjEsTPfTLkMWnibJRh4JtIYODRQ='
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(`http://localhost:8000/api/exercise/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Exercise created successfully!");
      navigate("/log");
    } catch (err) {
      toast.error("Sorry, we have encountered an error!");
    }
  }

  function handleChange(e) {
    const newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
  }

  function displayMuscleGroupImage(category) {
    if (category && categoryImages.hasOwnProperty(category)) {
      return (
        <img src={categoryImages[category]} alt={`${category} Muscle Groups`} />
      );
    }
    return null;
  }

  return (
    <div className="section">
      <div className="columns">
        <div className="column is-half">
          <div className="container image-overlay">
            {formData.category && (
              <div className="muscle-group-image">
                {displayMuscleGroupImage(formData.category)}
              </div>
            )}
          </div>
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
                      onChange={handleChange}
                      value={formData.category}
                    >
                      <option value="">Select Category</option>
                      {formCategory.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name="description"
                      onChange={handleChange}
                      value={formData.description}
                    />
                  </div>
                </div>
                <button className="button" type="submit">
                  Log Exercise
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
