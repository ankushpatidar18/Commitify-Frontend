import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { parseISO, format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import useChallengeStore from '../stores/useChallengeStore';

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

const JoinedChallengeList = () => {
  const { challenges, fetchChallenges, updateChallengeProgress } = useChallengeStore();
  const [openChallenge, setOpenChallenge] = useState(null);

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  return (
    <div className="p-4">
      {challenges.length === 0 ? (
        <p className="text-center text-gray-500">Loading challenges...</p>
      ) : (
        challenges.map((challenge) => {
          const events = challenge.progress.map((day) => ({
            title: `${day.status}`,
            start: parseISO(day.date),
            end: parseISO(day.date),
            status: day.status,
          }));

          return (
            <div
              key={challenge._id}
              className="mb-4 p-4 border border-gray-300 rounded shadow-sm"
            >
              <h2
                className="text-xl font-semibold text-center cursor-pointer text-blue-600 hover:underline"
                onClick={() =>
                  setOpenChallenge(openChallenge === challenge._id ? null : challenge._id)
                }
              >
                {challenge.challenge_id.title}
              </h2>
              {openChallenge === challenge._id && (
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
                            updateChallengeProgress(challenge.challenge_id, event.start, 'completed')
                          }
                        >
                          Mark Completed
                        </button>
                        <button
                          className="ml-2 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() =>
                            updateChallengeProgress(challenge.challenge_id, event.start, 'failed')
                          }
                        >
                          Mark Failed
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

export default JoinedChallengeList;
