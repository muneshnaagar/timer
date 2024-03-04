import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";

const Timer = ({ index, time, deleteTimer, name, uuid }) => {
  const [totalSeconds, setTotalSeconds] = useState(time);
  const [hours, setHours] = useState(Math.floor(totalSeconds / 3600));
  const [minutes, setMinutes] = useState(
    Math.floor((totalSeconds % 3600) / 60)
  );
  const [seconds, setSeconds] = useState(totalSeconds % 60);
  const [progressBarData, setProgressBarData] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        if (totalSeconds <= 0) {
          clearInterval(intervalId);
          setIsRunning(false);
        } else {
          setTotalSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [totalSeconds, isRunning]);

  useEffect(() => {
    setHours(Math.floor(totalSeconds / 3600));
    setMinutes(Math.floor((totalSeconds % 3600) / 60));
    setSeconds(totalSeconds % 60);
    setProgressBarData(calculatePercentage(totalSeconds));
    handleIncrementAPI();
  }, [totalSeconds]);

  const handleIncrementAPI = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${uuid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ time: time - totalSeconds }),
      });
      if (!response.ok) {
        throw new Error("Failed to increment active duration");
      }
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const calculatePercentage = (part) => {
    return 100 - (part / time) * 100;
  };

  const dynamicBG = (per) => {
    if (per > 60 && per < 85) {
      return "warning";
    } else if (per > 85) {
      return "danger";
    } else {
      return "success";
    }
  };

  const handleStartStop = () => {
    setIsRunning((prevState) => !prevState);
  };

  return (
    <div>
      <Card border="primary" style={{ width: "18rem" }}>
        <Card.Header>
          <div className="d-flex justify-content-between">
            <div>{name}</div>
            {totalSeconds > 0 && (
              <Button onClick={handleStartStop}>
                {isRunning ? "Pause" : "Start"}
              </Button>
            )}
            <CloseButton onClick={() => deleteTimer(index)} />
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            {" "}
            {`${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
              seconds < 10 ? "0" : ""
            }${seconds}`}
          </Card.Title>
          <ProgressBar
            variant={dynamicBG(progressBarData)}
            animated
            now={progressBarData}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Timer;
