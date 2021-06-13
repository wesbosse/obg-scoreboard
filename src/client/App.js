import React, { useState } from "react";
import axios from "axios";
import Player from "./Player/index";
import PlayerInput from "./PlayerInput/index"


import "./App.css";

function App() {
  const [visiblePlayer, setVisiblePlayer] = useState(true);
  const [turn, setTurn] = useState(1);

  const submitTurn = () => {
    axios.post(`/api/turn`, {
      turn: turn
    });
  }

  return (
    <div>
      <div className="header">
        <h1>OBG Scoreboard</h1>
      </div>
      <div className="App">
        <button
          className="App__switch-player-button"
          onClick={() => setVisiblePlayer(!visiblePlayer)}>
            Switch to Player { visiblePlayer ? 2 : 1 }
        </button>
        <div>
          <PlayerInput
            id={`turn`}
            label={`Turn`}
            onChange={setTurn}
            value={turn}
            className="turn"
          />
          <div className="submit" onClick={submitTurn}>Change Turn</div>
        </div>
        <div className="App__players">
          <Player id={1} visible={ visiblePlayer }/>
          <Player id={2} visible={ !visiblePlayer }/>
        </div>
        
        <hr />
        <br/>
        <a href='/api/gameOverlay' target='_blank'>Scoreboard</a>

      </div>
    </div>
  );
}

export default App;
