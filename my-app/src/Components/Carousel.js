import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css"; 
import withAutoplay from "react-awesome-slider/dist/autoplay"; 
import "./Carousel.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Carousel = () => {
  return (
    <AutoplaySlider
      play={true} 
      cancelOnInteraction={false} 
      interval={4000} 
      cssModule={{
        ...withAutoplay,
        slider: {
          "& img": {
            maxHeight: "20vh", 
          },
        },
      }}
    >
      <div className="image" data-src="https://i.imgur.com/Kn3nF4I.png" />
      <div className="image" data-src="https://i.imgur.com/lqsePZE.png" />
      <div className="image" data-src="https://i.imgur.com/TGaCrwL.png" />
    </AutoplaySlider>
  );
};

export default Carousel;
