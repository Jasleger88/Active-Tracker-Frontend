
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ExerciseList from './components/ExerciseList';
import CategoryPage from './components/CategoryPage';
import LogForm from './components/LogForm';
import Browse from './components/Browse';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/exercise" element={<ExerciseList />} />
        <Route path="/category-page" element={<CategoryPage />} />
        <Route path="/auth/logForm" element={<LogForm />} />
        <Route path="/auth/browse" element={<Browse />} />
        <Route path="/logform/:id" element={<LogForm />} />

      </Routes>
    </Router>
  );
}

export default App;