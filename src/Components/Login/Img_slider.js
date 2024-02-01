import React from 'react';
import Slider from 'react-slick';
import chaitimeSnacks from './../img/Dashboard_Images/chaitime_snacks.png';
import home from './../img/Dashboard_Images/Home_decor.png';
import outfit from './../img/Dashboard_Images/outfit.png';
import diy from './../img/Dashboard_Images/DIY.png';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const ImageSlider = () => {
  const images = [chaitimeSnacks, home, outfit, diy];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <div>

    
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '100%' }} />
        </div>
      ))}
  
    </Slider>
{/* <img src={image5} alt="Image5" style={{ width: '1520px', height: '700px',width:'100%',height:'100%' }}/> 
<img src={image6} alt="Image6" style={{ width: '1520px', height: '800px',width:'100%',height:'100%' }}/> 
<img src={image7} alt="Image7" style={{ width: '1520px', height: '700px',width:'100%',height:'100%' }}/> 
<img src={image8} alt="Image8" style={{ width: '1520px', height: '700px',width:'100%',height:'100%' }}/>  */}

    </div>


  );
  
};

export default ImageSlider

