import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";


function Home() {
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    fetchMediaData();
  }, []);

  const fetchMediaData = async () => {
    try {
      const mediaApiUrl = `http://127.0.0.1:5000/get_all_images/home`;
      const response = await axios.get(mediaApiUrl);
      const data = response.data
      // const extractedBoards = data.map(item => ({
      //   image_url: item.image_url
      // }));
       console.log("data", data[0].image_url)
      setMediaItems(data);
      console.log("setMediaItems(data.image_url):", mediaItems)
    } catch (error) {
      console.error("Error fetching media data:", error);
    }
  };

  const GetimagesByUserId = () => {
    const userid = GetUserProfileId();
    const mediaApiUrl = `http://127.0.0.1:5000/get_all_images/${userid}`;
    // const mediaApiUrl = `http://127.0.0.1:5000/get_all_images/home`;
    const fetchMediaData = async () => {
      try {
        const response = await axios.get(mediaApiUrl);
        const data = response.data.data[0].image_guids
        const extractedBoards = data.map(item => ({
          board_id: item.board_id,
          user_id: item.user_id,
          // image_guids: item.image_guids ? item.image_guids.image_url : null, // Access pin_data correctly
          image_guids: item.image_guids
          // board_image: item.pin_data.image_url,

        }));
        setMediaItems(extractedBoards);
        console.log("")

      } catch (error) {
        console.error("Error fetching media data:", error);
      }
    };

  }

  const GetUserProfileId = () => {
    const user_id = Number(sessionStorage.getItem('user_id'));
    return user_id;
  }

  return (
    
    <div className="container">
      <div className="container">
        <div className="gallery">
          {  mediaItems.map((media, index) => (
            <div key={index} className="gallery-item">
              {media.type === 'image' ? (
                <img src={media.image_url} alt={`Image ${index}`} />
              ) : media.type === 'video' ? (
                <div className="video-container">
                  <video controls>
                    <source src={media.image_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="video-buttons">
                    <button>Play</button>
                    <button>Pause</button>
                  </div>
                </div>
              ) : (
                <p></p>
              )}
            </div>
          ))}
        </div>
      </div>
    {/* <div> <img src="http://127.0.0.1:5000/get_all_images/get_image/b878b7c8-650e-4993-beb9-0e435258359a"/></div> */}


    </div>
  );
}

export default Home;
