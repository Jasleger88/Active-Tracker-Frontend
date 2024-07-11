
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ExerciseList from './components/ExerciseList';
import CategoryPage from './components/CategoryPage';
import LogForm from './components/LogForm';
import SaveLog from './components/SaveLog';
import TimerComponent from './components/UniqueTimerComponent';
import UserHome from './components/UserHome'



function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/userHome" element={<UserHome />} />   
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/exercise" element={<ExerciseList />} />
        <Route path="/category-page" element={<CategoryPage />} />
        <Route path="/auth/logForm" element={<LogForm />} />
        <Route path="/logForm/:id" element={<LogForm />} />
        <Route path="/saveLog" element={<SaveLog />} />
        <Route path="/timerComponent" element={<TimerComponent />} />

      

      </Routes>
    </Router>
  );
}

export default App;