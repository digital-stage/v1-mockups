import React from "react";
import { useBreakpoint } from "../../breakpoint.js";
import { stages } from "../../js/stagesMock.js";

const SoundControler = (props) => {
  //   constructor(props) {
  //     super(props);
  //     this.state = { audioData: new Uint8Array(0) };
  //     this.tick = this.tick.bind(this);
  //   }

  //   componentDidMount() {
  //     this.getMicrophone();
  //   }

  //   componentDidUpdate(prevProps, prevState) {
  //     if (this.state && this.state.audio) {
  //       console.log("audio", this.state);
  //       this.audioContext = new (window.AudioContext ||
  //         window.webkitAudioContext)();
  //       this.analyser = this.audioContext.createAnalyser();
  //       this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
  //       this.source = this.audioContext.createMediaStreamSource(this.state.audio);
  //       this.source.connect(this.analyser);
  //       this.source.connect(this.analyser);
  //       this.rafId = requestAnimationFrame(this.tick);
  //     }
  //   }

  //   componentWillUnmount() {
  //     cancelAnimationFrame(this.rafId);
  //     this.analyser.disconnect();
  //     this.source.disconnect();
  //   }

  //   async getMicrophone() {
  //     const audio = await navigator.mediaDevices.getUserMedia({
  //       audio: true,
  //       video: false,
  //     });
  //     this.setState({ audio });
  //   }

  //   tick() {
  //     this.analyser.getByteTimeDomainData(this.dataArray);
  //     this.setState({ audioData: this.dataArray });
  //     this.rafId = requestAnimationFrame(this.tick);
  //   }

  const breakpoints = useBreakpoint();

  const { color, soundTrackerHeight } = props;
  const SoundControlerStyle = {
    div: {
      height:
        breakpoints.sm && stages.orinetation === "portrait"
          ? "calc(50vh - 54px)"
          : "calc(100vh - 104px)",
      width: "10px",
      position: "absolute",
      top: "2px",
    },
    span: {
      maxHeight:
        breakpoints.sm && stages.orinetation === "portrait"
          ? "calc(50vh - 54px)"
          : "calc(100vh - 104px)",
      minWidth: "10px",
      display: "inline-block",
      position: "absolute",
      bottom: "0",
      right: 0,
    },
  };
  return (
    <div style={{ backgroundColor: "grey", ...SoundControlerStyle.div }}>
      <span
        style={{
          backgroundColor: color,
          height:
            breakpoints.sm && stages.orinetation === "portrait"
              ? `calc(${soundTrackerHeight} / 2)`
              : soundTrackerHeight,
          ...SoundControlerStyle.span,
        }}
      ></span>
    </div>
  );
};

export default SoundControler;
