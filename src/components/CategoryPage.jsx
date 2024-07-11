import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const CategoryPage = () => {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    category: "",
    name: "",
    description: "",
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  
  const categories = [
    {
      name: "Chest",
      exercises: [
        { name: "Bench Press", image: "jpeg;base64,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" },
        { name: "Push-ups", image: "https://example.com/pushups.jpg" },
        { name: "Chest Fly", image: "https://example.com/chest_fly.jpg" },
        { name: "Dips", image: "https://example.com/dips.jpg" },
        { name: "Incline Press", image: "https://example.com/incline_press.jpg" }
      ],
    },
    {
      name: "Back",
      exercises: [
        { name: "Pull-ups", image: "https://example.com/pullups.jpg" },
        { name: "Deadlifts", image: "https://example.com/deadlifts.jpg" },
        { name: "Rows", image: "https://example.com/rows.jpg" },
        { name: "Lat Pulldowns", image: "https://example.com/lat_pulldowns.jpg" },
        { name: "Hyperextensions", image: "https://example.com/hyperextensions.jpg" }
      ],
    },
    {
      name: "Shoulders",
      exercises: [
        { name: "Overhead Press", image: "https://example.com/overhead_press.jpg" },
        { name: "Lateral Raises", image: "https://example.com/lateral_raises.jpg" },
        { name: "Front Raises", image: "https://example.com/front_raises.jpg" },
        { name: "Shrugs", image: "https://example.com/shrugs.jpg" },
        { name: "Upright Rows", image: "https://example.com/upright_rows.jpg" }
      ],
    },
    {
      name: "Arms",
      exercises: [
        { name: "Bicep Curls", image: "https://example.com/bicep_curls.jpg" },
        { name: "Tricep Dips", image: "https://example.com/tricep_dips.jpg" },
        { name: "Hammer Curls", image: "https://example.com/hammer_curls.jpg" },
        { name: "Skull Crushers", image: "https://example.com/skull_crushers.jpg" },
        { name: "Close-grip Bench Press", image: "https://example.com/close_grip_bench_press.jpg" }
      ],
    },
    {
      name: "Legs",
      exercises: [
        { name: "Squats", image: "https://example.com/squats.jpg" },
        { name: "Lunges", image: "https://example.com/lunges.jpg" },
        { name: "Deadlifts", image: "https://example.com/deadlifts_legs.jpg" },
        { name: "Leg Press", image: "https://example.com/leg_press.jpg" },
        { name: "Calf Raises", image: "https://example.com/calf_raises.jpg" }
      ],
    },
    {
      name: "Core",
      exercises: [
        { name: "Planks", image: "https://example.com/planks.jpg" },
        { name: "Crunches", image: "https://example.com/crunches.jpg" },
        { name: "Leg Raises", image: "https://example.com/leg_raises.jpg" },
        { name: "Russian Twists", image: "https://example.com/russian_twists.jpg" },
        { name: "Hanging Leg Raises", image: "https://example.com/hanging_leg_raises.jpg" }
      ],
    }
  ];

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

      // Navigate to appropriate page after form submission
      navigate('/saveLog');
    } catch (err) {
      console.log(err.response.data);
      toast.error("Sorry, we encountered an error!");
    }
  }

  // Function to handle change in form fields
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Function to display exercises dropdown based on selected category
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

  // Function to display image based on selected category
  function displayMuscleGroupImage(categoryName) {
    const category = categories.find(cat => cat.name === categoryName);
    if (category) {
      return (
        <div className="container image-overlay">
          <img src={category.image} alt={`${categoryName} Muscle Groups`} />
        </div>
      );
    }
    return null;
  }

  return (
    <div className="section">
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
                {/* <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name="description"
                      onChange={handleChange}
                      value={formData.description}
                    />
                  </div>
                </div> */}
                {/* <div className="field">
                  <div className="control">
                    <button className="button is-primary" type="submit">
                      Save Exercise
                    </button>
                  </div> */}
                {/* </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;