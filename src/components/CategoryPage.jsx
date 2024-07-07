import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const CategoryPage = ({ categoryId, categoryName }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "Leg Curl",
    description: "Bending legs",
    category: "",
  });

  const formCategory = [
    "Chest",
    "Back",
    "Shoulders",
    "Arms",
    "Legs",
    "Core",
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(`http://localhost:8000/api/exercise/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("CHANGE THIS WHEN YOU GET A CHANCE");
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

  return (
    <>
      <div className="section">
        <div className="columns">
          <div className="column is-half">
            <div className="container image-overlay -container"></div>
          </div>
          <div className="column is-half">
            <div className="section">
              <div className="container">
                <form onSubmit={handleSubmit}>
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
                      <input
                        className="input"
                        type="text"
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                      />
                    </div>
                  </div>
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
                  <button className="button" type="submit">
                    Create Exercise
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
