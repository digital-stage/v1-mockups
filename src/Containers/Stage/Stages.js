import React from "react";
import Stage from "./Stage";
import { stages } from "../../js/stagesMock";
import "../../styles/Stage.scss";
import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/profil.png";

const Stages = () => {
  return (
    <div className="stages">
      <div className="header">
        <div className="header-left">
          <img src={logo} alt="logo"/>
          <h5>Bohemian Rhapsody</h5>
        </div>
        <div className="header-right">
          <img src={profile} alt="profile-pic"/>
        </div>
      </div>
      <div className="stages-container">
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default Stages;
