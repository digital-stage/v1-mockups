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
      participants: [],
    };
  }

  componentDidMount() {
    this.participantsToMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.next !== prevState.next) {
      this.participantsToMap();
    }
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

  nextParticipants = () => {
    this.setState({
      next: !this.state.next,
    });
  };

  participantsToMap = () => {
    let splitedArray = splitArray(this.props.participants);
    if (this.props.participants.length <= 6) {
      this.setState({
        ...this.state,
        participants: this.props.participants,
      });
    } else if (this.props.participants.length > 6 && !this.state.next) {
      this.setState({
        ...this.state,
        participants: splitedArray.first,
      });
    } else {
      this.setState({
        ...this.state,
        participants: splitedArray.second,
      });
    }
  };

  handleDragStart(e, data, i) {
    this.setState({
      ...this.state,
      elementToDrop: data,
      dragStarted: i,
    });
  }

  onDragOverHandler = (e, i) => {
    e.preventDefault();
    this.setState({
      dragover: i,
    });
  };

  handleDrop = (e, data, i) => {
    e.stopPropagation();
    let dragedData = this.state.participants.indexOf(this.state.elementToDrop);
    let dataToDrop = this.state.participants.indexOf(data);
    let final = this.state.participants;
    final[dragedData] = data;
    final[dataToDrop] = this.state.elementToDrop;
    this.setState({
      ...this.state,
      participants: final,
      dragStarted: null,
      dragover: null,
    });
  };

  render() {
    const { color, soundTrackerHeight, totalStages, breakpoints } = this.props;
    const { selectedValue, closeDropdown, next, participants } = this.state;
    console.log(this.state.dropHover);
    return (
      <>
        <div
          ref={(el) => (this.container = el)}
          className={
            selectedValue === "masonry" ? "masonry" : "stage-container"
          }
          style={{
            ...stageWidth(
              participants.length,
              selectedValue,
              breakpoints,
              totalStages
            ),
            position: "relative",
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
              {participants.map((participant, i) => {
                if (selectedValue === "portrait")
                  return (
                    <Portrait
                      onDragStart={(e) =>
                        this.handleDragStart(e, participant, i)
                      }
                      onDragOver={(e) => this.onDragOverHandler(e, i)}
                      onDrop={(e) => this.handleDrop(e, participant, i)}
                      dragStarted={this.state.dragStarted}
                      dragover={this.state.dragover}
                      participant={participant}
                      participants={participants}
                      i={i}
                      key={i}
                    />
                  );
                else if (selectedValue === "landscape")
                  return (
                    <Landscape
                      onDragStart={(e) =>
                        this.handleDragStart(e, participant, i)
                      }
                      onDragOver={(e) => this.onDragOverHandler(e, i)}
                      onDrop={(e) => this.handleDrop(e, participant, i)}
                      dragStarted={this.state.dragStarted}
                      dragover={this.state.dragover}
                      participant={participant}
                      participants={participants}
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
