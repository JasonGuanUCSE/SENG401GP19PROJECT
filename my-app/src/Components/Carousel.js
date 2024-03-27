import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css"; // Import main styles
import withAutoplay from "react-awesome-slider/dist/autoplay"; // Import autoplay styles
import "./Carousel.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Carousel = () => {
  return (
    <AutoplaySlider
      play={true} // Set to true for autoplay
      cancelOnInteraction={false} // Set to false to continue autoplay after user interaction
      interval={4000} // Time interval between slides in milliseconds (e.g., 4000 ms or 4 seconds)
      cssModule={{
        ...withAutoplay,
        slider: {
          "& img": {
            maxHeight: "20vh", // Constrain image height to prevent carousel from expanding
          },
        },
      }}
    >
      <div className="image" data-src="https://i.imgur.com/Kn3nF4I.png" />
      <div className="image" data-src="https://i.imgur.com/lqsePZE.png" />
      <div className="image" data-src="https://i.imgur.com/TGaCrwL.png" />
      {/* Add more slides as needed */}
    </AutoplaySlider>
  );
};

export default Carousel;
