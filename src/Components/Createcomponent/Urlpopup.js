
import React, { useState } from 'react';
import './Urlpopup.css';
// import Arrow_icon from './../Icons/Arrow icon-modified.png';
import { useNavigate } from 'react-router-dom';
 
const Urlpopup = () => {
  const [websiteLink, setWebsiteLink] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const [selectedImages, setSelectedImages] = useState([]);
 
  const navigate = useNavigate();
 
  const handleInputChange = (event) => {
    setWebsiteLink(event.target.value);
  };
 
  const fetchImages = async () => {
    // Check if input value is not empty
    if (!websiteLink) {
      console.log('Please enter a valid URL.');
      return;
    }
 
    const encodedUrl = (websiteLink);
    console.log("Encoded URL data", encodedUrl);
 
    // Construct the backendUrl
    const backendUrl = 'http://127.0.0.1:5000/media/extract-media';
    debugger
 
    try {
      setLoading(true);
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: encodedUrl }),
      });
 
      const data = await response.json();
 
      if (Array.isArray(data) && data.length > 0 && data[0].url) {
        setImages(data.map((item) => item.url));
      } else {
        console.log('No images found.');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      // Set loading to false when fetching is done
      setLoading(false);
    }
  };
 
  const handleCheckboxChange = (index, imageUrl) => {
    const selectedImageIndex = selectedImages.findIndex(item => item.index === index);
 debugger
    if (selectedImageIndex === -1) {
      // Image is not in the array, add it
      setSelectedImages([...selectedImages, { index, imageUrl ,websiteLink}]);
    } else {
      // Image is already in the array, remove it
      const updatedSelectedImages = selectedImages.filter(item => item.index !== index);
      setSelectedImages(updatedSelectedImages);
    }
  };
 
 
  // const handleAddPin = () => {
  //   navigate('/pins', { state: { selectedImages } });
  // };
 
  const handleAddPin = () => {
    debugger
    console.log('Navigating to /pins with:', selectedImages);
    navigate('/Landingpage/pins', { state: { selectedImages } });
  };




 
  return (
    <div className="main-container">
      <div className="popup-container">
        {/* Search bar */}
        <h4>Save ideas from website</h4>
        <p>Select up to 10 images</p>
 
        <div className="search-bar-container">
          <input
            id='urlInput'
            type="text"
            placeholder="Paste website link..."
            value={websiteLink}
            onChange={handleInputChange}
            className="input-field"
          />
          <button onClick={fetchImages} className="fetch-button">
           Enter
          </button>
        </div>
 
        <div className="images-container">
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            <div className="image-list-container">
              {images.map((imageUrl, index) => (
                <div key={index} className="image-container">
                  <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    onChange={() => handleCheckboxChange(index,imageUrl)}
                  />
                  <img src={imageUrl} alt={`Image ${index}`} className="image" />
                </div>
              ))}
            </div>
          )}
        </div>
        <button onClick={handleAddPin} disabled={selectedImages.length === 0}>
          Add Pins {selectedImages.length}
        </button>
 
 
      </div>
    </div>
 
  );
};
 
export default Urlpopup;
 