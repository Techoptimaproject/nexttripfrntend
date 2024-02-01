import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircleUp } from "@fortawesome/free-solid-svg-icons";

import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2';

import axios from "axios";

import "./Create.css";

 
const Create = () => {

  const [mediaItems, setMediaItems] = useState([]);

  const [newImageFile, setNewImageFile] = useState('');
 
  const [selectedTags, setSelectedTags] = useState('');

  const [uploading, setUploading] = useState(false);

  const [boardsData, setBoardsData] = useState([]);

  const [selectedBoard, setSelectedBoard] = useState(0);
 
  const [selectedFile, setSelectedFile] = useState([]);

  const [boardid, setboardid] = useState([]);

  const [message, setmessage] = useState("");
 
 
  const history = useNavigate();
 
 
  const navtoURLpath = () => {

    history('/landingpage/UrlPopup')

  }
 
  const [data, setdata] = useState({

    user_board_id: selectedBoard,

    board_name: "",

    board_image: "",

    is_secret: false,

    userprofile_id: 0

  });
 
 
  const [createpin, setCreatePin] = useState({
    image: "",
    title: "",
    description: "",
    link: "",
    userboard_id: 0,
    tags: "",
    userprofile_id: 0,
    is_saved:false,
    // is_saved:true
  });
 
 
  // Function for cancel file upload

  const cancelUpload = () => {
 
    setNewImageFile(null);

    setUploading(false);

  };
 
  //  User_Id  comes from Session 

  const GetUserProfileId = () => {

    const user_id = Number(sessionStorage.getItem('user_id'));

    return user_id;

  }
 
  // const GetUserProfileId = () => {

  //   const UserProfileId = Number(sessionStorage.getItem("UserProfileId"));

  //   return UserProfileId;

  // };
 
  useEffect(() => {

    BoardData();

  }, []);
 
 
  const BoardData = async () => {
    try {
      //e.preventDefault();
      const userid = GetUserProfileId();
      //  const userid = 3;
      const response = await axios.get(`http://127.0.0.1:5000/board/${userid}`);
      const boardsData = response.data.data;
      //console.log("boardsData", boardsData)
      const extractedBoards = boardsData.map(item => ({
        board_id: item.board_data.board_id,
        board_name: item.board_data.board_name,
        board_image: item.board_data.board_image
      }));
     // console.log("extractedBoards", extractedBoards)
      setboardid(extractedBoards);
    } catch (error) {
     console.error('Error fetching data:', error);
    }
  };
 
 
  const handleBoardCreate = async () => {
    try {
      const { value: formValues } = await Swal.fire({
        title: 'Create New Board',
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Enter the Text">  </br></br>
          <input type="checkbox" id="swal-input2">
          <label for="swal-input2"> <b>Keep this board secret </b></label>
          <p> So only you and collaborators can see it. Learn more  </p>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').checked
          ];
        }
      });

      const [url, checkboxValue] = formValues;
      const data = {
        board_name: url,
        is_secret: checkboxValue,
        userprofile_id: GetUserProfileId(),
      };
      if (url) {
        try {
          debugger
          const response = await axios.post('http://127.0.0.1:5000/board', data);
          const res = response.data.data;
          const message = response.data.message;
         // alert(message)
          createpin.userboard_id = res.user_board_id;
          //setSelectedBoard(res.board_name);
          BoardData();
        } catch (error) {
          console.error('Error creating board:', error);
        }
      }
    }
    catch {
    }
  };
 
  // Function for handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setNewImageFile(file);
    setUploading(true);
  };
 
  // Function for handle file drop

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setNewImageFile(file);
      setUploading(true);
    }
  };
 
 
  // Function for handle board selectValue from dropdown

  const handleBoardOptionSelect = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "create_new_board") {
      handleBoardCreate();
    } else {
      const selectedBoardAsNumber = Number(selectedValue);
      setCreatePin((prevCreatePin) => ({
        ...prevCreatePin,
        userboard_id: selectedBoardAsNumber
      }));
      setSelectedBoard(selectedBoardAsNumber);
    }
  };
 
 
  const hadeelsubmit = async (e) => {
    e.preventDefault();
    debugger
    const userid = GetUserProfileId();
    const formData = new FormData();
    formData.append('userprofile_id', userid);
    formData.append('userboard_id', createpin.userboard_id);
    formData.append('title', createpin.title);
    formData.append('description', createpin.description);
    formData.append('link', createpin.link);
    formData.append('tags', createpin.tags);
    // formData.append('image', "https://assets-global.website-files.com/6508d3c7a4b4a8b87f81e02b/65145d0598d4becad911360c_Alt%20Logo%20-%20white%201.pg");
    formData.append('image', selectedFile);
    formData.append('is_saved',true)
    console.log("formData :", formData)
    try {
      console.log("selectedFile",selectedFile)
      console.log("createpin.is_saved",createpin.is_saved)

      const response = await axios.post('http://127.0.0.1:5000/create_pins', formData);
      const  message = response.data.message;
      alert(message);
    } catch (error) {
      console.error('Error creating pin:', error);
      alert(error)
    }
  };
  const handlechange = (e) => {
    setCreatePin({ ...createpin, [e.target.name]: e.target.value });
  }


  return (

    <div>
      <form onSubmit={hadeelsubmit} >
        <div className="d-flex">
          {!uploading && (
            <div
              className="upload-portal" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e)}
            >
              <label className="lblicon">
                <FontAwesomeIcon icon={faCircleUp} size="3x" />
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,video/*,audio/*"
                  style={{ display: 'none' }}
                />

              </label>
 
              <div className="mb-3">
                <label style={{ paddingLeft: '28px' }} htmlFor="Choose a file" className="form-label">
                  &nbsp;&nbsp; Choose a file or drag and drop it here
                </label>
 
                <label style={{ paddingTop: '220px' }} htmlFor="Choose a file" className="form-label">

                  &nbsp;&nbsp;&nbsp;&nbsp; We recommend uploading an image or .mp4

                </label>

              </div>
 
              <br />

              <hr style={{ height: '1px', width: '400px', marginTop: '84%' }} />

              <div>

                <div

                  style={{

                    display: 'flex',

                    alignItems: 'center',

                    justifyContent: 'center',

                    width: '400px',

                    height: '50px',

                    backgroundColor: '#e0e0e0',

                    borderRadius: '20px',

                    cursor: 'pointer',

                    // marginLeft: '250px',

                  }}

                >

                  <span className="savefromurl" onClick={navtoURLpath}>Save From URL</span>

                </div>

              </div>

              <br />

              <hr style={{ height: '1px', width: '450px', marginLeft: '220px' }} />

            </div>
 
          )}
 
          {/* Uploading content section */}

          {uploading && (

            <div className="uploadedcontent">

              {newImageFile && (

                <div className="card card-sm">

                  {newImageFile.type.startsWith('image') ? (

                    <img src={URL.createObjectURL(newImageFile)} className="card-img-top" alt="Uploaded Image" />

                  ) : newImageFile.type.startsWith('video') ? (

                    <div className="video-container">

                      <video className="card-img-top" controls>

                        <source src={URL.createObjectURL(newImageFile)} type={newImageFile.type} />

                        Your browser does not support the video tag.

                      </video>

                    </div>

                  ) : (

                    <p className="card-text">Unsupported media type</p>

                  )}

                  <button className="btn btn-danger mt-2" onClick={cancelUpload}>

                    Cancel

                  </button>

                </div>

              )}

            </div>

          )}
 
          {/* Input details section */}

          <div className="uploaddtl">

            <div className="mb-3 mt-">

              <label htmlFor="Title" className="form-label">

                Title

              </label>

              <input

                type="text"

                className="form-control"

                id="image"

                name='title'

                placeholder="Add a title"

                onChange={handlechange} value={createpin.title}

              />

            </div>
 
            <div className="mb-5">

              <label htmlFor="Description" className="form-label">

                Description

              </label>

              <textarea className="form-control" name="description" value={createpin.description} placeholder="Add a detailed description" onChange={handlechange}></textarea>

            </div>
 
            <div className="mb-3">

              <label className="form-label">

                Link

              </label>

              <input

                type="text"

                className="form-control"

                id="link"

                name='link'

                placeholder="Add a link"

                onChange={handlechange}

                value={createpin.link}
 
              />

              {/* <input type="text" className="form-control" id=""   placeholder="Add a link"  onChange={handlechange}/> */}

            </div>
 
 
            <div className="mb-3">

              <label htmlFor="Boards" className="form-label">

                Board

              </label>

              {/* Dropdown for selecting existing boards or creating a new one */}

              <select className="form-control" id="boardSelect" value={selectedBoard} onChange={handleBoardOptionSelect} >

              <option value="">Select a board</option>

                {boardid.map((board, board_id) => (

                  <option key={board_id} value={board.board_id}>{board.board_name}</option>

                ))}

                {/* {boardsData.map((board, index) => (

                  <option key={index} value={board.board_data.board_id}>

                    {board.board_data.board_name}

                  </option>

                ))} */}

                <option value="create_new_board" className="btn btn-primary ml-2">

                  Create New Board

                </option>

              </select>

              {selectedBoard === "create_new_board" && (

                <button className="btn btn-primary ml-2"  onClick={handleBoardCreate} >

                  Create Board

                </button>

              )}

            </div>

            <div className="mb-3">

              <label className="form-label">

                Tags

              </label>

              <input

                type="text" className="form-control" id="tags" name='tags' placeholder="Add a Tags"

                onChange={handlechange} value={createpin.tags}
 
              />

              {/* Help text for boards */}

              <small id="passwordHelpBlock" className="form-text text-muted">

                Don't worry, people won't see your tags

              </small>

            </div>
 
            {/* Upload button */}

            <div className="mb-3">

              <button className="uploadbtn" >

                Upload

              </button>

            </div>

          </div>

        </div>

      </form>

    </div>

  );

};
 
export default Create;
