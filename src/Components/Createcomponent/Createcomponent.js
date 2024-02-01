import React from "react";
import "./Createcomponent.css";
import { useNavigate } from "react-router-dom";

const Createcomponent = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/landingpage/create");
  };
  return (
    <div className="m-5" style={{ textAlign: "center" }}>
      <div>
        <span> Nothing to show...yet! Pins you create will live here.</span>
      </div>
      <div>
        <button className="Create" onClick={handleCreateClick}>
          Create Pin
        </button>
      </div>
    </div>
  );
};

export default Createcomponent;
