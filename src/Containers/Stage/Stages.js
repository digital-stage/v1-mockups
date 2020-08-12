import React, { useState } from "react";
import Stage from "./Stage";
import { stages } from "../../js/stagesMock";
import "../../styles/Stage.scss";
import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/profil.png";
import { useBreakpoint } from "../../breakpoint.js";
import { BsArrowClockwise } from "react-icons/bs";

const Stages = () => {
  const [count, setCount] = useState(0);

  function handleChange() {
    console.log(count);
    if (count === 2) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  }

  const breakpoints = useBreakpoint();
  const stagesContainer =
    stages.orinetation === "landscape"
      ? { flexWrap: "no-wrap" }
      : { flexWrap: "wrap", minHeight: "calc(100vh - 50px)" };
  return (
    <div className="stages">
      <div className="header">
        <div className="header-left">
          <img src={logo} alt="logo" />
          <h5>Bohemian Rhapsody</h5>
        </div>
        <div className="header-right">
          <img src={profile} alt="profile-pic" />
        </div>
      </div>
      <div className="stages-container" style={stagesContainer}>
        {stages.stagesParticipants.map((stage, i) => {
          const { name, participants, color, soundTrackerHeight } = stage;
          return (
            <Stage
              name={name}
              participants={participants}
              totalStages={stages.total}
              color={color}
              soundTrackerHeight={soundTrackerHeight}
              key={name + i}
              breakpoints={breakpoints}
              changeStagePreview={count}
            />
          );
        })}
      </div>
      <div class="change-icon" onClick={handleChange} title="Change stage preview">
        <BsArrowClockwise color="#d5d5d5" style={{ marginTop: "-5px" }} />
      </div>
    </div>
  );
};

export default Stages;
