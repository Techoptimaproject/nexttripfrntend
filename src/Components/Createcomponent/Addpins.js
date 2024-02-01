import React, { useState, useEffect } from 'react';
import './Addpins.css';
import Swal from 'sweetalert2';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// Define fetchBoards outside of the component
const fetchBoards = async (userprofileId, setBoards) => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/board/${userprofileId}`);
    setBoards(response.data.data);
    console.log("Board drop down:", response.data.data);
  } catch (error) {
    console.error('Error fetching boards:', error);
  }
};

const Addpins = () => {
  const location = useLocation();
  const selectedImages = location.state?.selectedImages || [];
  const userprofileId = parseInt(sessionStorage.getItem('user_id'), 10) || 0;
  const [savedImages, setSavedImages] = useState([]);

  const [pinsData, setPinsData] = useState(selectedImages.map(image => ({
    image: image.imageUrl,
    title: "",
    description: "",
    link: image.websiteLink,
    userboard_id: 0,
    tags: "",
    userprofile_id: userprofileId,
    is_saved: true
  })));
  const [boards, setBoards] = useState([]);


  useEffect(() => {
    fetchBoards(userprofileId, setBoards);
  }, [userprofileId]); // Only runs when userprofileId changes

  const handleInputChange = (index, field, value) => {
    const newPinsData = pinsData.map((pin, idx) => {
      if (idx === index) {
        return { ...pin, [field]: value };
      }
      return pin;
    });
    setPinsData(newPinsData);
    console.log("newPinsData",newPinsData); // Log to see the updated state

  };

  const handleSubmit = async (index, e) => {
    e.preventDefault();
    const pin = pinsData[index];
    console.log('Pin Data:', pin);

    const formData = new FormData();
    formData.append('userprofile_id', pin.userprofile_id.toString());
    formData.append('userboard_id', pin.userboard_id.toString());
    formData.append('title', pin.title);
    formData.append('description', pin.description);
    formData.append('link', pin.link);
    formData.append('tags', pin.tags);
    formData.append('is_saved', pin.is_saved.toString());

    try {
      const response = await fetch(pin.image);
      const imageBlob = await response.blob();
      const imageType = pin.image.split('.').pop();
      const mimeType = `image/${imageType}`;
      const imageFile = new File([imageBlob], `pin_image.${imageType}`, { type: mimeType });
      formData.append('image', imageFile);

      const postResponse = await axios.post('http://127.0.0.1:5000/create_pins', formData);
      if (postResponse.status === 201) {
        console.log('Pin created successfully:', postResponse.data);
        // Move the saved pin to savedImages and remove it from pinsData
        setSavedImages(prev => [...prev, pinsData[index]]);
        setPinsData(prev => prev.filter((_, idx) => idx !== index));
      }
      } catch (error) {
      console.error('Error creating pin:', error);
    }
  };

  const handleCreateNewBoard = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Create New Board',
      html: `
        <input id="swal-input-board-name" class="swal2-input" placeholder="Board Name">
        <input type="checkbox" id="swal-input-secret">
        <label for="swal-input-secret">Keep this board secret</label>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          boardName: document.getElementById('swal-input-board-name').value,
          isSecret: document.getElementById('swal-input-secret').checked
        };
      }
    });

    if (formValues) {
      try {
        const data = {
          board_name: formValues.boardName,
          is_secret: formValues.isSecret,
          userprofile_id: userprofileId
        };

        const response = await axios.post('http://127.0.0.1:5000/board', data);
        if (response.status === 201) {
          setTimeout(() => fetchBoards(userprofileId, setBoards), 500); // 500ms delay
        }
      } catch (error) {
        console.error('Error creating new board:', error);
      }
    }
  };

  return (
    <div className='img_bg_color'>
      <div className='m-5'>
        <div style={{ paddingLeft: '360px' }}>
          {savedImages.map((image, index) => (
            <div key={index} className="saved-image-thumbnail">
              <img src={image.image} alt={`Saved Image ${index}`} style={{ width: '100px', height: '100px' }} />
              <p>Saved</p>
            </div>
          ))}
        </div>

        {pinsData.map((pin, index) => (
          <form onSubmit={(e) => handleSubmit(index, e)} key={index}>
            <div style={{ paddingLeft: '360px' }}>

            <div className='card card_size'>
              <div>


              </div>
              <div style={{ padding: '10px', }}>
                <Button variant="" type="">
                  ...
                </Button>
              </div>
              <div style={{ paddingLeft: '400px' }}>

              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <Select className="form-control" style={{width:'120px'}}
                    value={pin.userboard_id}
                    onChange={(e) => handleInputChange(index, 'userboard_id', e.target.value)}
                    displayEmpty
                  >
                    {boards.map((board, idx) => (
                      <MenuItem key={idx} value={board.user_board_id}>{board.board_name}</MenuItem>
                    ))}
                    <MenuItem value="new" onClick={handleCreateNewBoard}>Create New Board</MenuItem>
                  </Select>
                </FormControl>
                <Button type='submit'>Save</Button>
              </div>
              <div className='d-flex'>
                <div>
                  <img className='image_width' src={pin.image} alt={`Selected Image ${index}`} />
                </div>
                <div >
                  <div style={{ paddingLeft: '47px', paddingTop: '29px' }}>

                    <TextField
                      value={pin.title}
                      onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                      placeholder='Add Your title'
                    />
                  </div>
                  <div style={{ paddingLeft: '47px', paddingTop: '29px' }}>
                    <TextField
                      value={pin.description}
                      onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                      placeholder='Describe your pin'
                    />
                  </div>
                  <div style={{ paddingLeft: '47px', paddingTop: '29px' }}>
                    <TextField
                      value={pin.link}
                      disabled
                      fullWidth
                      margin="normal"
                      InputProps={{ readOnly: true }}
                    />
                  </div>
                </div>
            </div>
            </div>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
};

export default Addpins;