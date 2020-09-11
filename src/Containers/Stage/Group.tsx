import React from "react";
import Portrait from "./StagePreviews/Portrait";
import Landscape from "./StagePreviews/Landscape";
import SoundControler from "../../Components/StageControlers/SoundControler";
import Dropdown from "../../Components/Form/Dropdown";
import { stageWidth, splitArray } from "../../js/Utils";
import ShowScreensDropdown from "../../Components/Form/ShowScreensDropdown";
import { FaVolumeUp } from "react-icons/fa";
import VolumeSlider from "../../Components/StageControlers/VolumeSlider";
import Masonry from "./StagePreviews/Masonry";

interface Props {
  color: string,
  soundTrackerHeight: string,
  totalStages: number,
  breakpoints: Object,
  changeStagePreview: number,
  stagesEffect: Object,
  participants: Array<Object>
}

interface State {
  selectedValue: string,
  closeDropdown: boolean,
  next: boolean,
  participants: Array<Object>,
  hiddenScreens: Array<Object>,
  enableHideScreens: boolean,
  arrangeVolume: boolean,
  effect: boolean,
  effectOnSingleImage: number | null,
  elementToDrop: Object,
  dragStarted: number | null,
  dragoverElement?: number | null | undefined,
}

class Group extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedValue: "portrait",
      closeDropdown: false,
      next: false,
      participants: [],
      hiddenScreens: [],
      enableHideScreens: false,
      arrangeVolume: false,
      effect: false,
      effectOnSingleImage: null,
      elementToDrop: {},
      dragStarted: null
    };
  }

  componentDidMount() {
    this.participantsToMap();
    this.setState({
      effect: !this.state.effect,
    });
    setTimeout(() => {
      this.setState({
        effect: !this.state.effect,
      });
    }, 2000);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.next !== prevState.next) {
      this.participantsToMap();
    }
  }

  onSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ selectedValue: e.target.value });
  };

  onDropDownClick = (el: string) => {
    this.setState({
      selectedValue: el,
      closeDropdown: !this.state.closeDropdown,
      effect: !this.state.effect,
    });
    setTimeout(() => {
      this.setState({
        effect: !this.state.effect,
      });
    }, 2000);
  };

  hover = () => {
    this.setState({
      closeDropdown: !this.state.closeDropdown,
    });
  };

  nextParticipants = () => {
    this.setState({
      next: !this.state.next,
      effect: !this.state.effect,
    });
    setTimeout(() => {
      this.setState({
        effect: !this.state.effect,
      });
    }, 2000);
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

  handleDragStart(e: React.DragEvent<HTMLDivElement>, data: Object, i: number) {
    this.setState({
      ...this.state,
      elementToDrop: data,
      dragStarted: i,
    });
  }

  onDragOverHandler = (e: React.DragEvent<HTMLDivElement>, i: number) => {
    e.preventDefault();
    this.setState({
      dragoverElement: i,
    });
  };

  handleDrop = (e: React.DragEvent<HTMLDivElement>, data: Object) => {
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
      dragoverElement: null,
    });
  };

  hideScreenHandler = (i: number) => {
    let hiddenScreens = [
      ...this.state.hiddenScreens,
      this.state.participants[i],
    ];
    this.state.participants.splice(i, 1);
    this.setState({
      hiddenScreens,
      participants: this.state.participants,
      effectOnSingleImage: i,
    });
  };

  onShowScreenClick = (el: string) => {
    let participants = [...this.state.participants, el];
    this.state.hiddenScreens.splice(this.state.hiddenScreens.indexOf(el), 1);
    this.setState({
      participants,
      effectOnSingleImage: this.state.participants.length,
    });
  };

  enableHideScreensHandler = () => {
    this.setState({
      enableHideScreens: !this.state.enableHideScreens,
    });
  };

  arrangeVolumeHandler = () => {
    this.setState({
      arrangeVolume: !this.state.arrangeVolume,
    });
  };

  render() {
    const {
      color,
      soundTrackerHeight,
      totalStages,
      breakpoints,
      changeStagePreview,
      stagesEffect,
    } = this.props;
    const {
      selectedValue,
      closeDropdown,
      next,
      participants,
      hiddenScreens,
      enableHideScreens,
      arrangeVolume,
      effect,
      effectOnSingleImage,
    } = this.state;
    const stagesWidth =
      changeStagePreview === 0
        ? stageWidth(
          participants.length,
          selectedValue,
          breakpoints,
          totalStages
        )
        : null;
    const addEffectClass =
      effect || stagesEffect ? "stage-container-animation" : "";
    return (
      <>
        <div
          className={["stage-container", addEffectClass].join(" ")}
          style={{
            ...stagesWidth,
            position: "relative",
            width: `${changeStagePreview === 1 ? `calc(100% / ${totalStages})` : null}`,
          }}
        >
          <div
            className="overlay"
            style={{
              width: `calc(100% - 28px)`,
            }}
          >
            <div className="volume-icon" onClick={this.arrangeVolumeHandler}>
              <FaVolumeUp
                title={
                  arrangeVolume
                    ? "Show volume controler"
                    : "Hide volume controler"
                }
              />
            </div>
            <ShowScreensDropdown
              hiddenScreens={hiddenScreens}
              onShowScreenClick={this.onShowScreenClick}
              enableHideScreensHandler={this.enableHideScreensHandler}
              enableHideScreens={enableHideScreens}
              hover={this.hover}
            />
            <Dropdown
              value={selectedValue}
              onClick={this.onDropDownClick}
              closeDropdown={closeDropdown}
              hover={this.hover}
            />
          </div>
          {arrangeVolume && <VolumeSlider />}
          <SoundControler
            color={color}
            soundTrackerHeight={soundTrackerHeight}
          />
          {!next && this.props.participants.length > 6 && (
            <div className="arrow-next" onClick={this.nextParticipants}>
              <img
                src={require("../../assets/images/next.png")}
                alt="next"
                width="30px"
                height="30px"
              />
            </div>
          )}
          {next && this.props.participants.length > 6 && (
            <div className="arrow-prev" onClick={this.nextParticipants}>
              <img
                src={require("../../assets/images/prev.png")}
                alt="next"
                width="30px"
                height="30px"
              />
            </div>
          )}

          <div
            className={"photos"}
            style={selectedValue !== "masonry" ? { display: "flex" } : { display: "initial" }}
          >
            {participants.map((participant, i) => {
              if (selectedValue === "portrait")
                return (
                  <Portrait
                    effectOnSingleImage={effectOnSingleImage}
                    hideScreen={() => this.hideScreenHandler(i)}
                    enableHideScreens={enableHideScreens}
                    onDragStart={(e: React.DragEvent<HTMLDivElement>) => this.handleDragStart(e, participant, i)}
                    onDragOver={(e: React.DragEvent<HTMLDivElement>) => this.onDragOverHandler(e, i)}
                    onDrop={(e: React.DragEvent<HTMLDivElement>) => this.handleDrop(e, participant)}
                    dragStarted={this.state.dragStarted}
                    dragoverElement={this.state.dragoverElement}
                    participant={participant}
                    participants={participants}
                    i={i}
                    key={i}
                  />
                );
              else if (selectedValue === "landscape")
                return (
                  <Landscape
                    effectOnSingleImage={effectOnSingleImage}
                    hideScreen={() => this.hideScreenHandler(i)}
                    enableHideScreens={enableHideScreens}
                    onDragStart={(e: React.DragEvent<HTMLDivElement>) => this.handleDragStart(e, participant, i)}
                    onDragOver={(e: React.DragEvent<HTMLDivElement>) => this.onDragOverHandler(e, i)}
                    onDrop={(e: React.DragEvent<HTMLDivElement>) => this.handleDrop(e, participant)}
                    dragStarted={this.state.dragStarted}
                    dragoverElement={this.state.dragoverElement}
                    participant={participant}
                    participants={participants}
                    i={i}
                    key={i}
                  />
                );
              else if (selectedValue === "masonry")
                return (
                  <Masonry
                    effectOnSingleImage={effectOnSingleImage}
                    hideScreen={() => this.hideScreenHandler(i)}
                    enableHideScreens={enableHideScreens}
                    onDragStart={(e:React.DragEvent<HTMLDivElement>) => this.handleDragStart(e, participant, i)}
                    onDragOver={(e: React.DragEvent<HTMLDivElement>) => this.onDragOverHandler(e, i)}
                    onDrop={(e: React.DragEvent<HTMLDivElement>) => this.handleDrop(e, participant)}
                    dragStarted={this.state.dragStarted}
                    dragoverElement={this.state.dragoverElement}
                    participant={participant}
                    participants={participants}
                    i={i}
                    key={i}
                  />
                );
            })}
          </div>
        </div>
      </>
    );
  }
}


export default Group;
