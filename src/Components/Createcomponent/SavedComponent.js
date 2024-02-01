import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedComponent = () => {
  const [boards, setBoards] = useState({});

  useEffect(() => {
    const fetchSavedPins = async () => {
      try {
        const user_id = Number(sessionStorage.getItem("user_id"));
        const response = await axios.get(`http://127.0.0.1:5000/user_existing_board_or_create_new/${user_id}`);
        organizePinsByBoard(response.data.data);
      } catch (error) {
        console.error("Error fetching saved pins:", error);
      }
    };

    const organizePinsByBoard = (pins) => {
      const boardsMap = {};
      pins.forEach(pin => {
        const boardName = pin.board_name;
        if (!boardsMap[boardName]) {
          boardsMap[boardName] = [];
        }
        boardsMap[boardName].push(pin);
      });
      setBoards(boardsMap);
    };

    fetchSavedPins();
  }, []);

  return (
    <div>
      {Object.keys(boards).length > 0 ? (
        Object.entries(boards).map(([boardName, pins]) => (
          <div key={boardName} className="board-section">
            <h3>{boardName}</h3>
            <div className="pins-container">
              {pins.map((pin, index) => (
                <div key={index} className="pin">
                  <img src={pin.pin_data.image_url} alt={pin.pin_data.title} className="pin-image" />
                  <p>{pin.pin_data.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No saved pins found.</p>
      )}
    </div>
  );
};

export default SavedComponent;
