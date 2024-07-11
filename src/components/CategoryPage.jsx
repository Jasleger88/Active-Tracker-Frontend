import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import '../../styles/CategoryPage.css';

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
        { name: "Bench Press", image: 'https://i.imgur.com/yMdE9Op.png'},
        { name: "Push-ups", image: "https://images.unsplash.com/photo-1718633625616-e5f297177a26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVzaHVwc3xlbnwwfHwwfHx8MA%3D%3D" },
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
                {/* <div className="field">
                  <div className="control">
                    <button type="submit" className="button is-primary">Save Exercise</button>
                  </div>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
