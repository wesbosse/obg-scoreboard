import React, { useState } from "react";
import Player from "./Player/index";
import axios from "axios";

import "./App.css";

function App() {
  const [visiblePlayer, setVisiblePlayer] = useState(true);

  let [playerArray, setPlayerArray] = React.useState([0,1]);

  const fetchData = React.useCallback(() => {
    console.log('firing fetch');

    axios({
      "method": "GET",
      "url": "http://localhost:8080/api/game",
    })
    .then((response) => {
      setPlayerArray(response.data.game.players);
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

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
        
        <div className="App__players">
          <Player id={1} visible={ visiblePlayer } info={playerArray[1]}/>
          <Player id={2} visible={ !visiblePlayer } info={playerArray[2]}/>
        </div>
        
        <hr />
        
        <a target='_blank'>Submit</a>
        <br/>
        <a href='api/game' target='_blank'>Scoreboard</a>

      </div>
    </div>
  );
}

export default App;
