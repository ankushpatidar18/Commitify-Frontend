// components/CreateCommitmentForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateCommitment = () => {
  const [formData, setFormData] = useState({
    name: '',
    frequency: 'one-time',
    weeklyDays: [],
    endDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWeeklyDaysChange = (e) => {
    const { value, checked } = e.target;
    const updatedDays = checked ? [...formData.weeklyDays, value]
      : formData.weeklyDays.filter((day) => day !== value);

    setFormData({ ...formData, weeklyDays: updatedDays });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      await axios.post('http://localhost:3000/commitment/create', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Commitment created successfully');
      setFormData({ name: '', frequency: 'one-time', weeklyDays: [], endDate: '' });
    } catch (error) {
      console.error('Error creating commitment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Commitment</h2>

      {/* Name */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Commitment Name"
        className="w-full p-2 border mb-4"
        required
      />

      {/* Frequency */}
      <select
        name="frequency"
        value={formData.frequency}
        onChange={handleChange}
        className="w-full p-2 border mb-4"
        required
      >
        <option value="one-time">One-Time</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>

      {/* Weekly Days (only if frequency is 'weekly') */}
      {formData.frequency === 'weekly' && (
        <div className="mb-4">
          <label className="block font-bold mb-2">Select Days:</label>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
            (day) => (
              <label key={day} className="block">
                <input
                  type="checkbox"
                  value={day}
                  checked={formData.weeklyDays.includes(day)}
                  onChange={handleWeeklyDaysChange}
                  className="mr-2"
                />
                {day}
              </label>
            )
          )}
        </div>
      )}

      {/* Duration */}
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        className="w-full p-2 border mb-4"
        required
      />

      {/* Submit Button */}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Commitment
      </button>
    </form>
  );
};

export default CreateCommitment;
