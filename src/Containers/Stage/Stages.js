import React, { useState } from "react";
import Stage from "./Stage";
import { stages } from "../../js/stagesMock";
import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/profil.png";
import { useBreakpoint } from "../../breakpoint.js";
import { BsArrowClockwise } from "react-icons/bs";

const Stages = () => {
  const [count, setCount] = useState(0);
  const [stagesEffect, setStagesEffect] = useState(false);

  function handleChange() {
    if (count === 2) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
    setStagesEffect(true);
    setTimeout(() => {
      setStagesEffect(false);
    }, 1000);
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
              stagesEffect={stagesEffect}
            />
          );
        })}
      </div>
      <div
        className="change-icon"
        onClick={handleChange}
        title="Change stage preview"
      >
        <BsArrowClockwise color="#d5d5d5" style={{ marginTop: "-5px" }} />
      </div>
    </div>
  );
};

export default Stages;
