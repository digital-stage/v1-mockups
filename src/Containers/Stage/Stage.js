import React from "react";
import PropTypes from "prop-types";
import "./Stage.css";
import Select from "../../Components/Form/Select";

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
      <div
        ref={(el) => (this.container = el)}
        className={
          selectedValue === "masonary" ? "masonary" : "stage-container"
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

        <div className={selectedValue === "masonary" ? "item" : "photos"}>
          {participants.map((participant, i) => {
            let portraitWidth = `calc(100%/${participants.length})`;
            let portraitHeight = "100vh";
            let landscapeWidth = "50%";
            let landscapeHeight = `calc(100vh/${participants.length / 2})`;
            return (
              <img
                src={participant.image}
                style={{
                  width:
                    selectedValue === "portrait"
                      ? portraitWidth
                      : landscapeWidth,
                  height:
                    selectedValue === "portrait"
                      ? portraitHeight
                      : landscapeHeight,
                }}
                key={i}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

Stage.propTypes = {
  stageNumber: PropTypes.number,
};

export default Stage;
