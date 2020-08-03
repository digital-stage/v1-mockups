import React from "react";
import "../../../styles/Masonry.scss";

class Masonry extends React.Component {
  render() {
    const { participants } = this.props;
    return (
      <div
        className="masonary_test"
        style={{
          maxHeight: "calc(100vh - 60px)",
          overflowY: "scroll",
          overflowX: "hidden"
        }}
      >
        {participants &&
          participants.map((participant) => {
            return (
              <div className="item_test">
                <img src={participant.image} />
              </div>
            );
          })}
      </div>
    );
  }
}

export default Masonry;
