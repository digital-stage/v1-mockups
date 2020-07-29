import React from "react";
import PropTypes from "prop-types";
import "./Stage.scss";
import Select from "../../Components/Form/Select";
import Masonry from "./StagePreviews/Masonry";
import Portrait from "./StagePreviews/Portrait";
import Landscape from "./StagePreviews/Landscape";

class Stage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "portrait",
      overlayWidth: 0,
    };
  }

  componentDidMount() {
    this.setState({
      overlayWidth: this.container.offsetWidth,
    });
  }

  onSelectChange = (e) => {
    this.setState({ selectedValue: e.target.value });
  };

  render() {
    const { name, totalStages, participants } = this.props;
    const { selectedValue, overlayWidth } = this.state;
    console.log(overlayWidth);
    return (
      <>
        <div
          ref={(el) => (this.container = el)}
          className={
            selectedValue === "masonry" ? "masonry" : "stage-container"
          }
          style={{
            width: `calc(100% / ${totalStages})`,
          }}
        >
          <div
            className="overlay"
            style={{
              width: `${overlayWidth - 50}px`,
            }}
          >
            <Select value={selectedValue} onChange={this.onSelectChange} />
          </div>

          {selectedValue != "masonry" ? (
            <div className={selectedValue === "masonry" ? "item" : "photos"}>
              {participants.map((participant, i) => {
                if (selectedValue === "portrait")
                  return (
                    <Portrait
                      participant={participant}
                      participants={participants}
                      i={i}
                    />
                  );
                else if (selectedValue === "landscape")
                  return (
                    <Landscape
                      participant={participant}
                      participants={participants}
                      i={i}
                    />
                  );
              })}
            </div>
          ) : (
            <Masonry participants={participants} />
          )}
        </div>
      </>
    );
  }
}

Stage.propTypes = {
  stageNumber: PropTypes.number,
};

export default Stage;
