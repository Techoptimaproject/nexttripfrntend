import React, { useEffect, useState } from "react";
import "./Profile.css";
import Createcomponent from "../Createcomponent/Createcomponent";
import Avatar from "@mui/material/Avatar";
import SavedComponent from "../Createcomponent/SavedComponent";
import axios from "axios";
 
const Profile = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [data, setData] = useState({});
 
  const handleStepClick = (step) => {
    setActiveStep(step);
  };
  const GetUserId = () => {
    const user_id = Number(sessionStorage.getItem("user_id"));
    return user_id;
  };
 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = GetUserId();
        // const user_id = 1;
        const response = await axios.get(
          `http://127.0.0.1:5000/user_profile/${user_id}`
        );
        setData(response.data);

        const UserProfileId = response.data.UserProfile_id;
        sessionStorage.setItem('UserProfileId', UserProfileId);

       // console.log("Response of an API", response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
 
    fetchData();
  }, []);
 
  return (
    <div className="">
      <div className="row">
        <div className="col-4 "></div>
        <div className="col-4 ">
          <div style={{ textAlign: "center" }}>
            {/* <div className=" mt-5 center-container">
              <Avatar
                aria-label="recipe"
                className="avatar"
                style={{ width: "95px", height: "95px" }}
              >
                <h1>R</h1>
              </Avatar>
            </div> */}
            <div className="font">
              {data && data.data && (
                <div>
                    <div className=" mt-5 center-container">
              <Avatar
                aria-label="recipe"
                className="avatar"
                style={{ width: "95px", height: "95px" }}
              >
                {data.data.first_name}
              </Avatar>
            </div>
                  <div className="font-weight">
                    {data.data.first_name} {data.data.last_name}
                  </div>
                  <div>
                    {/* <strong className="m-1">P</strong> */}
                    {data.data.username}
                  </div>
                </div>
              )}
            </div>
            {/* <div>
              <span>0 following</span>
            </div> */}
            <div className="">
              <button className="sharebutton">Share</button>
              <button className="sharebutton">Edit Profile</button>
            </div>
            <div className="mt-3">
              <span
                className={`stepper-step ${activeStep === 1 ? "active" : ""}`}
                onClick={() => handleStepClick(1)}
              >
                Created
              </span>
              <span
                className={`stepper-step ${activeStep === 2 ? "active" : ""}`}
                onClick={() => handleStepClick(2)}
              >
                Saved
              </span>
            </div>
          </div>
        </div>
        <div className="col-4 "></div>
      </div>
 
      {activeStep === 1 && <Createcomponent />}
      {activeStep === 2 && <SavedComponent />}
    </div>
  );
};
 
export default Profile;
 