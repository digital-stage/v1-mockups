import React from "react";

class SoundControler extends React.Component {
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

  render() {
    const { color, soundTrackerHeight } = this.props;
    const SoundControlerStyle = {
      div: {
        height: "calc(100vh - 104px)",
        width: "10px",
        position: "absolute",
        top: "2px",
      },
      span: {
        maxHeight: "calc(100vh - 104px)",
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
            height: soundTrackerHeight,
            ...SoundControlerStyle.span,
          }}
        ></span>
      </div>
    );
  }
}

export default SoundControler;
