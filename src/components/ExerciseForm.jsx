import React, { useState, useEffect } from 'react';
import axios from 'axios';



const ExerciseForm = ({ fetchExercises }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/api/categories/')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const exerciseData = { name, description, category };

        try {
            await axios.post('/api/exercise/', exerciseData);
            fetchExercises();
            setName('');
            setDescription('');
            setCategory('');
        } catch (err) {
            console.error('Error adding exercise:', err);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">Exercise Name</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Description</label>
                <div className="control">
                    <textarea
                        className="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
            </div>
            <div className="field">
                <label className="label">Category</label>
                <div className="control">
                    <div className="select">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                    {/* <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option> */}
                    {/* ))} */}
                    </select>
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button className="button is-primary" type="submit">Add Exercise</button>
                </div>
            </div>
        </form>
    );
};

export default ExerciseForm;