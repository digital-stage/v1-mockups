import React from "react";
import PropTypes from "prop-types";
import "../../styles/Stage.scss";
import Select from "../../Components/Form/Select";
import Masonry from "./StagePreviews/Masonry";
import Portrait from "./StagePreviews/Portrait";
import Landscape from "./StagePreviews/Landscape";
import SoundControler from "../../Components/StageControlers/SoundControler";
import Dropdown from "../../Components/Form/Dropdown";

class Stage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "portrait",
      overlayWidth: 0,
      closeDropdown: false,
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

  stageWidth = (width) => {
    switch (width) {
      case 12:
      case 11:
      case 10:
      case 9:
        return { width: "50%", minWidth: "50%" };
      case 8:
      case 7:
      case 6:
      case 5:
        return { width: "30%", minWidth: "30%" };
      case 4:
      case 3:
      case 2:
      case 1:
        return { width: "20%", minWidth: "20%" };
      default:
        return { width: "auto", minWidth: "auto" };
    }
  };

  render() {
    const {
      name,
      totalStages,
      participants,
      color,
      soundTrackerHeight,
    } = this.props;
    const { selectedValue, overlayWidth, closeDropdown } = this.state;
    console.log(closeDropdown);
    return (
      <>
        <div
          ref={(el) => (this.container = el)}
          className={
            selectedValue === "masonry" ? "masonry" : "stage-container"
          }
          style={{
            ...this.stageWidth(participants.length),
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
