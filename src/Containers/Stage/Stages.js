import React from "react";
import Stage from "./Stage";
import { stages } from "../../js/stagesMock";
import "./Stage.scss";

const Stages = () => {
  return (
    <div className="stages-container">
      {stages.stagesParticipants.map((stage) => {
        const { name, participants } = stage;
        return (
          <Stage
            name={name}
            participants={participants}
            totalStages={stages.total}
            key={name}
          />
        );
      })}
    </div>
  );
};

export default Stages;
