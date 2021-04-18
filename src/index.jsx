import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const DATA = [
    { 
        id: 'player-1',
        name: 'Player 1',
        completed: false,
        score: 4
    },
    { 
        id: 'player-2',
        name: 'Player 2',
        completed: false,
        score: 3
    },

]

ReactDOM.render(<App tasks={DATA} />, document.getElementById('root'));
