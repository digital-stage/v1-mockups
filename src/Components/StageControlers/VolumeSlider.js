import React from "react";
import "../../styles/Range.scss";
import { FaVolumeUp } from "react-icons/fa";

const VolumeSlider = () => {
  return (
    <div className="volume-slider">
      <input
        type="range"
        orient="vertical"
        class="slider vertical-lowest-first round range"
      />
      <br />
      <div class="icon">
        <FaVolumeUp />
      </div>
    </div>
  );
};

export default VolumeSlider;
