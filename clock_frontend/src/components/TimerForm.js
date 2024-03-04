import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { v4 as uuidv4 } from "uuid";

const TimerForm = ({ onAddTimer }) => {
  const [name, setName] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || (hours == 0 && minutes == 0 && seconds == 0)) {
      alert("Invalid input. Please fill all fields with valid values.");
      return;
    }
    let uuid = uuidv4();
    onAddTimer({ hours, minutes, seconds, name, uuid });
    console.log(process.env);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, uuid }),
      });
      const data = await response.json();
      console.log("Item created:", data);
      // Reset form fields after successful creation
      setName("");
      setHours("");
      setMinutes("");
      setSeconds("");
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <Card border="primary" style={{ width: "18rem" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Provide Timer Name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Hours</Form.Label>
          <Form.Control
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Hours"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Minutes</Form.Label>
          <Form.Control
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="Minutes"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Seconds</Form.Label>
          <Form.Control
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            placeholder="Seconds"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Start Timer
        </Button>
      </Form>
    </Card>
  );
};

export default TimerForm;
