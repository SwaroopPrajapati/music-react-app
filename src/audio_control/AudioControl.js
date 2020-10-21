import React, { Component } from "react";
import { Container, Button, ProgressBar } from "react-bootstrap";
import "../styleSheets/myStyle.scss";
import CardExample from "../card/CardExample";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { IconContext } from "react-icons";
import { MdPauseCircleOutline, MdPlayCircleOutline } from "react-icons/md";

export class AudioControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      isPlaying: false,
      playingUrl: "",
      audio: null,
      currTime: 0,
    };
  }

  playSong(url) {
    let audio = new Audio(url);
    if (!this.state.isPlaying) {
      audio.play();
      this.setState({
        isPlaying: true,
        playingUrl: url,
        audio,
      });
    } else {
      if (this.state.preview_url === url) {
        if (this.state.audio != null) this.state.audio.pause();
        this.setState({
          isPlaying: false,
        });
      } else {
        if (this.state.audio != null) this.state.audio.pause();
        audio.play();
        this.setState({
          isPlaying: true,
          playingUrl: url,
          audio,
        });
      }
    }
  }

  next = () => {
    if (this.state.count < this.props.properties.length - 1)
      this.setState(
        {
          count: this.state.count + 1,
          isPlaying: true,
          playingUrl: this.props.properties[this.state.count + 1].track
            .preview_url,
          currTime: 0,
        },
        () => {
          this.playSong(this.state.playingUrl);
        }
      );
  };

  previous = () => {
    if (this.state.count > 0)
      this.setState(
        {
          count: this.state.count - 1,
          isPlaying: true,
          playingUrl: this.props.properties[this.state.count - 1].track
            .preview_url,
          currTime: 0,
        },
        () => {
          this.playSong(this.state.playingUrl);
        }
      );
  };

  pause() {
    this.state.audio.pause();
    this.setState({
      isPlaying: false,
      audio: this.state.audio,
    });
  }

  play() {
    if (this.state.audio === null){
      this.playSong(this.props.properties[this.state.count].track
            .preview_url);  
    }
    else{ 
      this.state.audio.play();
      this.setState({
        isPlaying: true,
        audio: this.state.audio,
      });
    }
  }

  calTime() {
    if (this.state.audio != null) {
      if (Math.floor(this.state.audio.currentTime) === 30){
        this.setState({
          isPlaying: false,
        },
          ()=> this.next());
      }
      this.setState({
        currTime: this.state.audio.currentTime,
      });
    }
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.calTime();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div class="container">
        <div class="row1">
          <div className="col">
            <CardExample
              properties={this.props.properties}
              count={this.state.count}
            />
          </div>
        </div>
        <div class="row2">
          <div style={{ left: "45%" }} class="col-12 d-flex">
            <IconContext.Provider value={{ size: "24px" }}>
              <div className="previous pt-2">
                <MdSkipPrevious onClick={this.previous}></MdSkipPrevious>
              </div>
            </IconContext.Provider>
            <IconContext.Provider value={{ size: "48px" }}>
              <div>
                {!this.state.isPlaying ? (
                  <MdPlayCircleOutline
                    onClick={() => this.play()}
                  ></MdPlayCircleOutline>
                ) : (
                  <MdPauseCircleOutline
                    onClick={() => this.pause()}
                  ></MdPauseCircleOutline>
                )}
              </div>
            </IconContext.Provider>
            <IconContext.Provider value={{ size: "24px" }}>
              <div className="next pt-2">
                <MdSkipNext onClick={this.next}></MdSkipNext>
              </div>
            </IconContext.Provider>
          </div>
          <div class="row marginTop">
            <div class="col-2" style={{ left: "84px" }}>
              {"0:" + Math.floor(this.state.currTime)}
            </div>
            <div class="col-8">
              <div className="progressBar">
                {this.state.audio && (
                  <ProgressBar now={(this.state.currTime * 100) / 30} />
                )}
              </div>
            </div>
            <div class="col-2" style={{ right: "84px" }}>
              {"0:30"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AudioControl;
