import React from "react";
import "./Masonry.scss";

class Masonry extends React.Component {
  render() {
    const { participants } = this.props;
    return (
      <div className="masonary_test">
        {participants && participants.map((participant) => {
          return (
            <div className="item_test" style={{height:`calc(100vh/${participants.length/1.6})`}}>
              <img src={participant.image} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Masonry;
