import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";

const History = () => {
  let [historyList, setHistoryList] = useState([]);
  useEffect(() => {
    getAllHistory();
  }, []);

  // Fetch the history of all timers in the db
  const getAllHistory = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Item created:", data);
      setHistoryList(data);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <div>
      <ListGroup as="ol" numbered>
        {historyList?.map((e) => (
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{e.name}</div>
              <br></br>
              {e?.creationDate && (
                <span>Creation Date : {e?.creationDate}</span>
              )}
              <br></br>
              {e?.activeDuration && (
                <span> Active Duration : {e?.activeDuration}</span>
              )}
              <br></br>
              {e?.deleteDate && <span> Delete Date : {e?.deleteDate}</span>}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default History;
