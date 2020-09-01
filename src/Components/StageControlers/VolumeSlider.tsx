import React from "react";
import { FaVolumeUp } from "react-icons/fa";

const VolumeSlider = () => {
  return (
    <div className="volume-slider">
      <input
        type="range"
        className="slider vertical-lowest-first round range"
      />
      <br />
      <div className="icon">
        <FaVolumeUp />
      </div>
    </div>
  );
};

export default VolumeSlider;
