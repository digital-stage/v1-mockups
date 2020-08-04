import React from "react";
import PropTypes from "prop-types";
import "../../styles/Stage.scss";
// import Select from "../../Components/Form/Select";
import Masonry from "./StagePreviews/Masonry";
import Portrait from "./StagePreviews/Portrait";
import Landscape from "./StagePreviews/Landscape";
import SoundControler from "../../Components/StageControlers/SoundControler";
import Dropdown from "../../Components/Form/Dropdown";
import { stageWidth, splitArray } from "../../js/Utils";

class Stage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "portrait",
      closeDropdown: false,
      next: false,
    };
  }

  componentDidMount() {}

  onSelectChange = (e) => {
    this.setState({ selectedValue: e.target.value });
  };

  onDropDownClick = (el) => {
    this.setState({
      selectedValue: el,
      closeDropdown: !this.state.closeDropdown,
    });
  };

  hover = () => {
    this.setState({
      closeDropdown: !this.state.closeDropdown,
    });
  };

  nextParticipants = () => {
    this.setState({
      next: !this.state.next,
    });
  };

  participantsToMap = () => {
    let splitedArray = splitArray(this.props.participants);
    if (this.props.participants.length <= 6) {
      return this.props.participants;
    } else if (this.props.participants.length > 6 && !this.state.next) {
      return splitedArray.first;
    } else {
      return splitedArray.second;
    }
  };

  render() {
    const { participants, color, soundTrackerHeight } = this.props;
    const { selectedValue, closeDropdown, next } = this.state;

    return (
      <>
        <div
          ref={(el) => (this.container = el)}
          className={
            selectedValue === "masonry" ? "masonry" : "stage-container"
          }
          style={{
            ...stageWidth(participants.length),
            position: "relative",
            // width: participants.length === 6 ? "35%" : "auto",
            // minWidth: participants.length === 6 ? "35%" : "auto",
            // `calc(100% / ${totalStages})`,
          }}
        >
          <div
            className="overlay"
            style={{
              width: `calc(100% - 28px)`,
            }}
          >
            <Dropdown
              value={selectedValue}
              onClick={this.onDropDownClick}
              closeDropdown={closeDropdown}
              hover={this.hover}
            />
            {/* <Select value={selectedValue} onChange={this.onSelectChange} /> */}
          </div>
          <SoundControler
            color={color}
            soundTrackerHeight={soundTrackerHeight}
          />
          {!next &&
            this.props.participants.length > 6 &&
            selectedValue !== "masonry" && (
              <div className="arrow-next" onClick={this.nextParticipants}>
                <img
                  src={require("../../assets/images/next.png")}
                  alt="next"
                  width="30px"
                  height="30px"
                />
              </div>
            )}
          {next &&
            this.props.participants.length > 6 &&
            selectedValue !== "masonry" && (
              <div className="arrow-prev" onClick={this.nextParticipants}>
                <img
                  src={require("../../assets/images/prev.png")}
                  alt="next"
                  width="30px"
                  height="30px"
                />
              </div>
            )}
          {selectedValue !== "masonry" ? (
            <div className={selectedValue === "masonry" ? "item" : "photos"}>
              {this.participantsToMap().map((participant, i) => {
                if (selectedValue === "portrait")
                  return (
                    <Portrait
                      participant={participant}
                      participants={this.participantsToMap()}
                      i={i}
                      key={i}
                    />
                  );
                else if (selectedValue === "landscape")
                  return (
                    <Landscape
                      participant={participant}
                      participants={this.participantsToMap()}
                      i={i}
                      key={i}
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
