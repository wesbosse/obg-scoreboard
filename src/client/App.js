import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerForm from './components/playerForm'
 
import './app.css';

function App() {
  const [data, setData] = useState({ 
    game: {
      turn:0,
      players: []
    }
  });
 
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        '/api/game',
      );
      setData(result.data);
    };
 
    fetchData();
  }, []);

  const playerForms = data.game.players.slice(0,2).map((player) => {
    return ( <PlayerForm player={player} key={player.key} />)
  })

  return (
    <div>
      <form action='/api/turn' method='post'>
        <label>
          Turn <input name="turn" type="text" value={data.game.turn} onChange={e => setData({game: {...data.game, turn: e.target.value}})} required />
        </label>

        <button>Submit</button>
      </form>
      {playerForms}
    </div>
  );
}

export default App;