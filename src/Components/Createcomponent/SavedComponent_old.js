import React, { useEffect ,useState} from "react";
import axios from "axios";
import "./SavedComponent.css"



const SavedComponent = () => {


  const [boardid, setboardid] = useState([]);
  

  useEffect(() => {
    BoardData();
  }, []);
  
  
  const GetUserId = () => {
    const user_id = Number(sessionStorage.getItem("user_id"));
    return user_id;
  };
  
  
  const BoardData = async () => {
    try {
      debugger
      //e.preventDefault();
      //const userid = GetUserId();
      const userid = 3;
      const response = await axios.get(`http://127.0.0.1:5000/user_existing_board_or_create_new/${userid}`);
  
      const boardsData = response.data.data;
      //console.log("boardsData", boardsData)
      const extractedBoards = boardsData.map(item => ({
        board_id: item.board_data.board_id,
        board_name: item.board_data.board_name,
        board_image: item.pin_data ? item.pin_data.image_url : null, // Access pin_data correctly
        // board_image: item.pin_data.image_url,
      }));
      console.log("extractedBoards", extractedBoards)
      // Setting the state with the extracted boards data  
      setboardid(extractedBoards);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  


  const mediaItems = boardid.map(board => ({
    type: 'image', // Assuming all are images, you might want to adjust this based on your data
    url: board.board_image,
  }));

  return (
    <div className="container">
      <div className="gallery">
        {mediaItems.map((media, index) => (
          <div key={index} className="gallery-item">
            {media.type === 'image' ? (
              
              <img src={media.url} alt={`Image ${index}`} />
              
            ) : media.type === 'video' ? (
              <div className="video-container">
                <video controls>
                  <source src={media.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="video-buttons">
                  <button>Play</button>
                  <button>Pause</button>
                  
                </div>
              </div>
            ) : (
              <p>{media.url}</p>
            )}
          </div>
          
        ))}
        
      </div>
    </div>
  );
            }



export default SavedComponent;
