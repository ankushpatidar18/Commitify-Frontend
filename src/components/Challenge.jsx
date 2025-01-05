import React, { useState } from 'react';
import axios from 'axios';

const Challenge = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    start_date: '',
    duration: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken'); 
      await axios.post('http://localhost:3000/challenges',
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Challenge created successfully!');
      setForm({ title: '', description: '', start_date: '', duration: '' });
    } catch (error) {
      console.error('Error creating challenge:', error);
      alert('Failed to create challenge. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="challenge-form">
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="date"
        name="start_date"
        value={form.start_date}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="duration"
        value={form.duration}
        onChange={handleChange}
        placeholder="Duration in days"
        required
      />
      <button type="submit">Create Challenge</button>
    </form>
  );
};

export default Challenge;
