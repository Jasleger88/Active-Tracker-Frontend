
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ExerciseList from './components/ExerciseList';
import ExerciseManager from './components/ExerciseManager';
// import CategoryPage from './components/CategoryPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/exercise" element={<ExerciseList />} />
        <Route path="/exercise-manager" element={<ExerciseManager />} />
        <Route path="/category-page" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;