import React from "react";
import "../../../styles/Masonry.scss";
import { MdClear } from "react-icons/md";

class Masonry extends React.Component {
  render() {
    const {
      participant,
      participants,
      i,
      onDragStart,
      onDragOver,
      onDrop,
      dragover,
      enableHideScreens,
      hideScreen,
    } = this.props;
    return (
      <div
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        dragover={dragover}
        className="item_test"
        style={{
          position: "relative",
          height: `calc((100vh - 100px)/ ${Math.round(participants.length / 2)})`,
        }}
      >
        {enableHideScreens && participants.length > 1 && (
          <div className="hide-screen" onClick={hideScreen}>
            <MdClear title="Hide screen" size="1em" />
          </div>
        )}
        <img src={participant.image} alt={"masonry-image" + i} />
      </div>
    );
  }
}

export default Masonry;
