import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Fetch initial time from the API
    const fetchTime = async () => {
      try {
        const res = await fetch('https://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh');
        const data = await res.json();
        setTime(new Date(data.datetime));
      } catch (err) {
        console.error("Error fetching time:", err);
      }
    };

    fetchTime();

    // Update time every second locally
    const clockInterval = setInterval(() => {
      setTime(prevTime => new Date(prevTime.getTime() + 1000));
    }, 1000);

    // Clean up interval on unmount
    return () => clearInterval(clockInterval);
  }, []);

  // Format the date and time
  const date = time.toISOString().substring(0, 10);
  const timeString = time.toTimeString().substring(0, 8);

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>{date}, {timeString}</h2>
    </div>
  );
}

export default Clock;
