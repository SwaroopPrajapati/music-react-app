import React, { Component } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import SpotifyWebApi from "spotify-web-api-js";
import { AudioControl } from "./audio_control/AudioControl";

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      tracks: [],
    };
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyApi.getUserPlaylists((err, obj) => {
        spotifyApi.getPlaylistTracks(obj.items[0].id, (nerr, nobj) => {
          this.setState({
            tracks: nobj.items,
          });
        });
      }
    );
  }

  render() {
    return (
      <div className="App">
        <a href="http://localhost:8888"> Login to Spotify </a>

        {this.state.loggedIn && (
          <Button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </Button>
        )}
        
        {this.state.loggedIn && (
          <div className="page">
            <AudioControl properties={this.state.tracks} />
          </div>
        )}

      </div>
    );
  }
}

export default App;
