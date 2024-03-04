import { useEffect, useState } from "react";
import WorldTimer from "./WorldTimer";
import Form from "react-bootstrap/Form";

const WorldClock = () => {
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const timezones = [
    "America/New_York",
    "America/Los_Angeles",
    "America/Chicago",
    "America/Denver",
    "America/Phoenix",
    "America/Detroit",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Europe/Rome",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Asia/Dubai",
    "Asia/Kolkata",
    "Australia/Sydney",
    "Australia/Melbourne",
    "Pacific/Honolulu",
    "Pacific/Auckland",
    "Africa/Johannesburg",
  ];

  // Fetch timezone details form worldtime api
  const fetchCurrentTime = (timezone) => {
    fetch(`http://worldtimeapi.org/api/timezone/${timezone}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentTime(data);
      })
      .catch((error) => {
        console.error("Error fetching time:", error);
      });
  };

  const handleTimezoneChange = (event) => {
    const timezone = event.target.value;
    setSelectedTimezone(timezone);
    fetchCurrentTime(timezone);
  };

  useEffect(() => {
    if (selectedTimezone) {
      fetchCurrentTime(selectedTimezone);
    }
  }, [selectedTimezone]);

  return (
    <div>
      <h4>Timezone Selector</h4>

      <Form.Select
        aria-label="Default select example"
        value={selectedTimezone}
        onChange={handleTimezoneChange}
      >
        <option value="">Select a timezone</option>
        {timezones?.map((e) => (
          <option value={e}>{e}</option>
        ))}
      </Form.Select>

      {currentTime && (
        <WorldTimer
          key={currentTime.timezone}
          datetime={currentTime.datetime}
          utc_offset={currentTime.utc_offset}
        />
      )}
    </div>
  );
};

export default WorldClock;
