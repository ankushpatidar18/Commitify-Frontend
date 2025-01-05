import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { parseISO, format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import useCommitmentStore from '../stores/useCommitmentStore';

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

const CommitmentList = () => {
  const { commitments, fetchCommitments, updateCommitmentStatus } = useCommitmentStore();
  const [openCommitment, setOpenCommitment] = useState(null);

  useEffect(() => {
    fetchCommitments();
  }, [fetchCommitments]);

  return (
    <div className="p-4">
      {commitments.length === 0 ? (
        <p className="text-center text-gray-500">Loading commitments...</p>
      ) : (
        commitments.map((commitment) => {
          const events = commitment.dailyStatuses.map((status) => ({
            title: `${status.status}`,
            start: parseISO(status.date),
            end: parseISO(status.date),
            status: status.status,
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
                            updateCommitmentStatus(commitment._id, event.start, 'completed')
                          }
                        >
                          Mark Completed
                        </button>
                        <button
                          className="ml-2 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() =>
                            updateCommitmentStatus(commitment._id, event.start, 'canceled')
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

export default CommitmentList;
