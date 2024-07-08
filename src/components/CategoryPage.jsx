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

  // update my pictures for Arms
  const categoryImages = {
    Chest:"https://i.pinimg.com/originals/d2/56/c7/d256c714b49a9a1de0084ba395f8719f.jpg",
    Back:"https://i.pinimg.com/736x/aa/54/d7/aa54d7fea6ac490b5cb6368d1ee09929.jpg",
    Shoulders:"https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-6/393811381_18393042871005059_8011973730059705088_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=GWHy54m3Qx0Q7kNvgF4gbIP&_nc_ht=scontent-mia3-1.xx&oh=00_AYBrSGyglpMAv00gedp6MIKOmDd2B_4UPGgLoaGvfPKqBw&oe=66917065",
    Legs: "https://i.pinimg.com/736x/a4/6d/f6/a46df6963126efd722168e5340c005a7.jpg",
    Arms: "https://media.istockphoto.com/id/1309275239/photo/labeled-male-hamstring-muscle-group-on-skeleton.webp?b=1&s=170667a&w=0&k=20&c=BXSvX5o0GZyOteIkZjEsTPfTLkMWnibJRh4JtIYODRQ=",
    Core:'https://i.pinimg.com/736x/d9/d3/be/d9d3be914562e19f479f413dcf3c74f5.jpg'
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
                  Add to Log
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
