import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { parseISO, format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

// Setup locales for date formatting
const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CommitmentCalendars = () => {
  const [commitments, setCommitments] = useState([]); // State to store fetched commitments
  const [openCommitment, setOpenCommitment] = useState(null); // Track which calendar is open

  // Fetch commitments from the backend
  useEffect(() => {
    const fetchCommitments = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Token for authorization
        const response = await axios.get('http://localhost:3000/commitment', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCommitments(response.data); // Set commitments to state
      } catch (error) {
        console.error('Error fetching commitments:', error);
      }
    };
    fetchCommitments();
  }, []);

  const updateStatus = async (commitmentId, date, newStatus) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.patch(
        `http://localhost:3000/commitment/${commitmentId}/daily-status`,
        { date, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Status updated successfully');
      // Refresh commitments after update
      setCommitments((prev) =>
        prev.map((commitment) =>
          commitment._id === commitmentId ? response.data : commitment
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  return (
    <div className="p-4">
      {commitments.length === 0 ? (
        <p className="text-center text-gray-500">Loading commitments...</p>
      ) : (
        commitments.map((commitment) => {
          // Convert dailyStatuses into events for the calendar
          const events = commitment.dailyStatuses.map((status) => ({
            title: `${status.status}`,
            start: parseISO(status.date),
            end: parseISO(status.date),
            status: status.status, // Custom property for event styling
          }));

          return (
            <div
              key={commitment._id}
              className="mb-4 p-4 border border-gray-300 rounded shadow-sm"
            >
              <h2
                className="text-xl font-semibold text-center cursor-pointer text-blue-600 hover:underline"
                onClick={() =>
                  setOpenCommitment(
                    openCommitment === commitment._id ? null : commitment._id
                  )
                }
              >
                {commitment.name}
              </h2>
              {openCommitment === commitment._id && (
                <Calendar
                  localizer={localizer}
                  events={events}
                  defaultView="agenda"
                  views={['agenda']}
                  style={{ height: 500, margin: '0 auto', maxWidth: 800 }}
                  components={{
                    event: ({ event }) => (
                      <div>
                        <span className="font-medium">{event.title}</span>
                        <button
                          className="ml-2 px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                          onClick={() =>
                            updateStatus(commitment._id, event.start, 'completed')
                          }
                        >
                          Mark Completed
                        </button>
                        <button
                          className="ml-2 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() =>
                            updateStatus(commitment._id, event.start, 'canceled')
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    ),
                  }}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default CommitmentCalendars;
