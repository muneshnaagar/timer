import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TimerForm from "./components/TimerForm";
import TimerList from "./components/TimerList";
import WorldClock from "./components/WorldClock";
import History from "./components/History";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [timers, setTimers] = useState([]);

  const addTimer = ({ hours, minutes, seconds, name, uuid }) => {
    setTimers([...timers, { hours, minutes, seconds, name, uuid }]);
  };

  const deleteTimer = (index) => {
    handleDeleteAPI(timers[index].uuid);
    const newTimers = [...timers];
    newTimers.splice(index, 1);
    setTimers(newTimers);
  };

  const handleDeleteAPI = async (uuid) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${uuid}`, {
        method: "delete",
      });
      if (!response.ok) {
        throw new Error("Failed to increment active duration");
      }
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={6} md={6} sm={12}>
            <h1>Timer</h1>
            <div className="">
              <TimerForm onAddTimer={addTimer} />
              <TimerList timers={timers} deleteTimer={deleteTimer} />
            </div>
          </Col>
          <Col xs={6} md={6} sm={12}>
            <h1>World Clock</h1>
            <div>
              <WorldClock></WorldClock>
            </div>
          </Col>
        </Row>
        <Row className="add-space">
          <Col xs={6} md={6} sm={12}>
            <h1>History</h1>
            <History></History>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
