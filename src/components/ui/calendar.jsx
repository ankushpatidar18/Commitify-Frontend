import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { Button } from "@/components/ui/button"

const CustomCalendar = ({ selectedDate, onChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const onDateClick = (day) => {
    onChange(day);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => setCurrentMonth(addDays(currentMonth, -30))}>Prev</Button>
        <span className="text-lg font-bold">{format(currentMonth, 'MMMM yyyy')}</span>
        <Button onClick={() => setCurrentMonth(addDays(currentMonth, 30))}>Next</Button>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = 'EEEE';
    const days = [];
    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="col-center">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 gap-2 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        days.push(
          <div
            key={day.toString()}
            className={`p-2 border rounded-md cursor-pointer ${
              !isSameMonth(day, monthStart) ? 'text-gray-300' : 
              isSameDay(day, selectedDate) ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => onDateClick(cloneDay)}
          >
            {format(day, 'd')}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-2 mb-2">
          {days}
        </div>
      );
      days = [];
    }
    return rows;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default CustomCalendar;

