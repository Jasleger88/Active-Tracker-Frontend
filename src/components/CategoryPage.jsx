import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import SaveLog from './SaveLog'; 

const CategoryPage = ({ categoryId, categoryName }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "",
    name: "",
    description: "",
  });

  const [category, setCategory] = useState('')

  // category (dropdown menu of categories in an array)

  const formCategory = [
    "Chest",
    "Back",
    "Shoulders",
    "Arms",
    "Legs",
    "Core",
  ];
//images assocaited with each respective category
  const categoryImages = {
    Chest: "https://i.pinimg.com/originals/d2/56/c7/d256c714b49a9a1de0084ba395f8719f.jpg",
    Back: "https://i.pinimg.com/736x/aa/54/d7/aa54d7fea6ac490b5cb6368d1ee09929.jpg",
    Shoulders: "https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-6/393811381_18393042871005059_8011973730059705088_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=GWHy54m3Qx0Q7kNvgF4gbIP&_nc_ht=scontent-mia3-1.xx&oh=00_AYBrSGyglpMAv00gedp6MIKOmDd2B_4UPGgLoaGvfPKqBw&oe=66917065",
    Legs: "https://i.pinimg.com/736x/a4/6d/f6/a46df6963126efd722168e5340c005a7.jpg",
    Arms: "https://media.istockphoto.com/id/1309275239/photo/labeled-male-hamstring-muscle-group-on-skeleton.webp?b=1&s=170667a&w=0&k=20&c=BXSvX5o0GZyOteIkZjEsTPfTLkMWnibJRh4JtIYODRQ=",
    Core: 'https://i.pinimg.com/736x/d9/d3/be/d9d3be914562e19f479f413dcf3c74f5.jpg'
  };

//helps to create a new exercise 
// prevents default behavior
//resets the form to empty
//redirects my user to savelog (may need to change this not sure yet.)

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(`http://localhost:8000/api/exercise/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Exercise created successfully!");
      setFormData({
        category: "",
        name: "",
        description: ""
      });


      const exerciseData = {
        category: data.category,
        name: data.name,
        description: data.description,
      };

      // Navigate to SaveLog I need correct path
      navigate('/saveLog')
    } catch (err) {
      console.log(err.response.data);
      toast.error("Sorry, we have encountered an error!");
    }
  }

  //updates the form when this function is called
  // this copies the formData and updates the filed to the changed input

  function handleChange(e) {
    const newFormData = structuredClone(formData);
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
    const categoryToChange = formData.category
    setCategory(cat)
  }


  //when a category is selected, the correct image will show up. 
  //
  function displayMuscleGroupImage(category) {
    if (category && categoryImages.hasOwnProperty(category)) {
      return (
        <img src={categoryImages[category]} alt={`${category} Muscle Groups`} />
      );
    }
    return null;
  }
//my layout divides into two columns
// the selected image shows up with the category
// input name (name, exercise, and description)
// submit button (it will be triggered upon my user clicking submit. The function handleSubmit will happen)
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
                  Add Exercise
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
