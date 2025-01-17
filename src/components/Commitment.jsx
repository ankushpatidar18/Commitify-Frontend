import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import CustomCalendar from '../components/ui/calendar';

const Commitment = () => {
  const [formData, setFormData] = useState({
    name: '',
    frequency: 'one-time',
    weeklyDays: [],
    endDate: '',
  });

  const [isNameExpanded, setIsNameExpanded] = useState(false);
  const [isFrequencyExpanded, setIsFrequencyExpanded] = useState(false);
  const [isDurationExpanded, setIsDurationExpanded] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWeeklyDaysChange = (day) => {
    const updatedDays = formData.weeklyDays.includes(day)
      ? formData.weeklyDays.filter((d) => d !== day)
      : [...formData.weeklyDays, day];
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
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex">
            {/* Motivational Quote Card */}
            <Card className="w-3/12 mr-6 flex items-center bg-[#F2EFEF]">
              <CardContent className="p-4">
                <p className="text-2xl font-semibold font-poppin">
                  Commitment is what transforms a promise into reality.
                </p>
              </CardContent>
            </Card>

            {/* Main Form Card */}
            <div className="w-9/12">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold font-inter">Create Commitment</CardTitle>
                <p className="text-base text-gray-700 font-poppin">Let us know what you want to commit to</p>
              </CardHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <div 
                    className="flex justify-between items-center p-3 bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => setIsNameExpanded(!isNameExpanded)}
                  >
                    <span className="font-semibold text-gray-700 font-inter">Name</span>
                    {isNameExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </div>
                  {isNameExpanded && (
                    <div className="mt-3 p-3 bg-white rounded-md shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="w-1/3">
                          <p className="text-sm text-gray-600 font-poppin">Name your commitment</p>
                          <p className="text-sm text-gray-500 italic">Eg. "Doing Yoga"</p>
                        </div>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter commitment name"
                          className="w-2/3"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Frequency */}
                <div>
                  <div 
                    className="flex justify-between items-center p-3 bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => setIsFrequencyExpanded(!isFrequencyExpanded)}
                  >
                    <span className="font-semibold text-gray-700 font-inter">Frequency</span>
                    {isFrequencyExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </div>
                  {isFrequencyExpanded && (
                    <div className="mt-3 p-3 bg-white rounded-md shadow-sm">
                      <Select 
                        onValueChange={(value) => setFormData({ ...formData, frequency: value })}
                        value={formData.frequency}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="one-time">One-Time</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>

                      {formData.frequency === 'weekly' && (
                        <div className="mt-4 space-y-2">
                          <p className="font-semibold text-gray-700 font-inter">Select Days:</p>
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                            <div key={day} className="flex items-center space-x-2">
                              <Checkbox
                                id={day}
                                checked={formData.weeklyDays.includes(day)}
                                onCheckedChange={() => handleWeeklyDaysChange(day)}
                              />
                              <label htmlFor={day} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-poppin">
                                {day}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <div 
                    className="flex justify-between items-center p-3 bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => setIsDurationExpanded(!isDurationExpanded)}
                  >
                    <span className="font-semibold text-gray-700 font-inter">Duration</span>
                    {isDurationExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </div>
                  {isDurationExpanded && (
                    <div className="mt-3 p-3 bg-white rounded-md shadow-sm">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={`w-full justify-start text-left font-normal ${!formData.endDate && "text-muted-foreground"}`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.endDate ? format(new Date(formData.endDate), "PPP") : <span>Pick an end date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CustomCalendar
                            selectedDate={formData.endDate ? new Date(formData.endDate) : new Date()}
                            onChange={(date) => setFormData({ ...formData, endDate: date.toISOString() })}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-[#8046F3] hover:bg-[#6A35D9] text-white font-inter">
                  Create Commitment
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Commitment;

