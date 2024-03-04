import { useState, useEffect } from "react";

function WorldTimer({ datetime, utc_offset }) {
  // Parse hours and minutes from the offset string
  const [sign, hours, minutes] = utc_offset
    .match(/([-+])(\d{2}):?(\d{2})?/)
    .slice(1);

  // Calculate offset in milliseconds
  let offsetMilliseconds =
    (parseInt(hours) * 60 + parseInt(minutes || 0)) * 60 * 1000;
  if (sign === "-") {
    offsetMilliseconds *= -1;
  }

  // Get current date and time
  const currentDate = new Date(datetime);

  // Adjust the date with the offset
  const adjustedDate = new Date(currentDate.getTime() + offsetMilliseconds);

  const [currentTime, setCurrentTime] = useState(adjustedDate);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDateTime = new Date(currentTime);
      currentDateTime.setSeconds(currentDateTime.getSeconds() + 1);
      setCurrentTime(currentDateTime.toISOString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [currentTime, utc_offset]);

  return (
    <div>{currentTime && <p>Current time: {currentTime?.toString()}</p>}</div>
  );
}

export default WorldTimer;
