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
  const [selectedExercise, setSelectedExercise] = useState("");

  const categories = [
    {
      name: "Chest",
      exercises: [
        { name: "Bench Press", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR13NK-xEu0MUCt_aWNGYewLnu3AYlVp0Aofw&s'},
        { name: "Push-ups", image: "https://static.strengthlevel.com/images/exercises/push-ups/push-ups-800.avif" },
        { name: "Chest Fly", image: "https://static.strengthlevel.com/images/exercises/machine-chest-fly/machine-chest-fly-800.avif" },
        { name: "Dips", image: "https://kinxlearning.com/cdn/shop/files/dips_2_1000x.jpg?v=1690669329" },
        { name: "Incline Press", image: "https://static.strengthlevel.com/images/exercises/incline-bench-press/incline-bench-press-800.jpg" }
      ],
    },
    {
      name: "Back",
      exercises: [
        { name: "Pull-ups", image: "https://cdn.shopify.com/s/files/1/0705/5432/1194/files/mikolo-pull-ups-blog-2.png?v=1693468017" },
        { name: "Deadlifts", image: "https://www.evolvefitstudios.com/uploads/1/0/2/9/102951852/deadlifts_orig.jpeg" },
        { name: "Rows", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHSiUknfSJ2wQP9NRB0u2c-9jiql5pkUpFaA&s" },
        { name: "Lat Pulldowns", image: "https://static.strengthlevel.com/images/exercises/lat-pulldown/lat-pulldown-800.jpg" },
        { name: "Hyperextensions", image: "https://www.dmoose.com/cdn/shop/articles/main_image_304d7bbb-42b0-4258-9020-96274ff23949.jpg?v=1672847807" }
      ],
    },
    {
      name: "Shoulders",
      exercises: [
        { name: "Overhead Press", image: "https://static.strengthlevel.com/images/exercises/shoulder-press/shoulder-press-800.jpg" },
        { name: "Lateral Raises", image: "https://static.strengthlevel.com/images/exercises/dumbbell-lateral-raise/dumbbell-lateral-raise-800.jpg" },
        { name: "Front Raises", image: "https://static.strengthlevel.com/images/exercises/dumbbell-front-raise/dumbbell-front-raise-800.jpg" },
        { name: "Shrugs", image: "https://anabolicaliens.com/cdn/shop/articles/5ee17b445694cd8620bba313_dumbbell-shrug-exercise-anabolic-aliens-p-500.png?v=1644921383" },
        { name: "Upright Rows", image: "https://www.dmoose.com/cdn/shop/articles/1_8db57df7-b8f2-412e-a364-745224090211.jpg?v=1647872727" }
      ],
    },
    {
      name: "Arms",
      exercises: [
        { name: "Bicep Curls", image: "https://cdn.shopify.com/s/files/1/2384/0833/files/inner-bicep-curl-benefits.jpg?v=1689192787" },
        { name: "Tricep Dips", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReQP0CUD90fEMHcnAXxbgj5elFBkuQEAlejQ&s" },
        { name: "Hammer Curls", image: "https://cdn.shopify.com/s/files/1/1876/4703/files/shutterstock_419477203_480x480.jpg?v=1636560233" },
        { name: "Skull Crushers", image: "https://i.pinimg.com/originals/d2/65/6b/d2656bc140333708c1fa5e6be5703a97.jpg" },
        { name: "Close-grip Bench Press", image: "https://miro.medium.com/v2/resize:fit:679/0*V0PWKZQ5mmhXtK6d" }
      ],
    },
    {
      name: "Legs",
      exercises: [
        { name: "Squats", image: "https://static.strengthlevel.com/images/exercises/bodyweight-squat/bodyweight-squat-800.jpg" },
        { name: "Lunges", image: "https://cdn.shopify.com/s/files/1/1497/9682/files/4.Split_Squat_Lunges.jpg?v=1672764672" },
        { name: "Deadlifts", image: "https://cdn.shopify.com/s/files/1/1497/9682/files/2_illustration.jpg?v=1629114354" },
        { name: "Leg Press", image: "https://static.strengthlevel.com/images/exercises/sled-leg-press/sled-leg-press-800.jpg" },
        { name: "Calf Raises", image: "https://static.strengthlevel.com/images/exercises/seated-calf-raise/seated-calf-raise-800.jpg" }
      ],
    },
    {
      name: "Core",
      exercises: [
        { name: "Planks", image: "https://fitnessexposedblog.com/wp-content/uploads/2023/11/plank-benefits.png" },
        { name: "Crunches", image: "https://static.strengthlevel.com/images/exercises/crunches/crunches-800.jpg" },
        { name: "Leg Raises", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6UA9BK6xUI9A1X5Ot0xhFr0xD0n0NFGsyNA&s" },
        { name: "Russian Twists", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLEPg_XIunqbn1h6_FuGdkTBuRkVfoclpeww&s" },
        { name: "Hanging Leg Raises", image: "https://www.burnthefatinnercircle.com/members/images/1789c.jpg?cb=20240423044650" }
      ],
    }
  ];

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

  function handleExerciseChange(e) {
    setSelectedExercise(e.target.value);
    handleChange(e);
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
              onChange={handleExerciseChange}
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
          {selectedExercise && displayExerciseImage(categoryName, selectedExercise)}
        </div>
      );
    }
    return null;
  }

  function displayMuscleGroupImage(categoryName) {
    const category = categories.find(cat => cat.name === categoryName);
    
  }

  function displayExerciseImage(categoryName, exerciseName) {
    const category = categories.find(cat => cat.name === categoryName);
    if (category) {
      const exercise = category.exercises.find(ex => ex.name === exerciseName);
      if (exercise) {
        return (
          <div className="columns is-centered" id="exercise-image-columns">
            <div className="column is-half" id="exercise-image-column">
              <div className="card" id="exercise-image-card">
                <div className="card-image" id="exercise-card-image">
                  <figure className="image is-4by3" id="exercise-figure">
                    <img src={exercise.image} alt={exercise.name} id="exercise-img" />
                  </figure>
                </div>
                <div className="card-content" id="exercise-card-content">
                  <div className="content" id="exercise-content">
                    <p className="title is-4" id="exercise-title">{exercise.name}</p>
                    <p id="exercise-description">{exercise.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    return null;
  }
  
  return (
    <div className="section category-page" id="category-page">
      <div className="columns" id="category-columns">
      
          {selectedCategory && !selectedExercise && displayMuscleGroupImage(selectedCategory)}
       
        <div className="column is-half" id="category-column-right">
          <div className="section" id="category-section">
            <div className="container" id="category-container">
              <form onSubmit={handleSubmit} id="category-form">
                <div className="field" id="category-dropdown-field">
                  <label className="label" id="category-dropdown-label">Select Category</label>
                  <div className="control" id="category-dropdown-control">
                    <select
                      className="input"
                      id="category-dropdown-select"
                      name="category"
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setFormData({ ...formData, category: e.target.value });
                        setSelectedExercise("");
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