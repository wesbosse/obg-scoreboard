const express = require('express');
var bodyParser = require('body-parser');
const os = require('os');
var path = require('path');
var Jimp = require('jimp');
var wwwhisper = require('connect-wwwhisper');

var dir = path.join(__dirname, 'public');
var gameData = {
    turn: 1,
    players: [
        {
            key: 1,
            faction: 'Salamanders',
            name: 'Griffin',
            teamName: 'Titans',
            round2: 0,
            round3: 0,
            round4: 0,
            round5: 0,
            secondary1: 0,
            secondary2: 0,
            secondary3: 0,
            paintedPoints: 0,
            cp: 1
        },
        {
            key: 2,
            faction: 'Necrons',
            name: 'Wesley',
            teamName: 'OBG',
            round2: 0,
            round3: 0,
            round4: 0,
            round5: 0,
            secondary1: 0,
            secondary2: 0,
            secondary3: 0,
            paintedPoints: 0,
            cp: 1
        }
    ]
}


const app = express();



app.use(express.static(dir));
app.use(express.static('dist'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/api/gameOverlay', (req, res) => {res.sendFile(path.join(__dirname+'/scoreboard.html'));});

app.use(wwwhisper());

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/player/:index', (req, res) => res.send({ player: gameData.players[req.params.index - 1] }));
app.post('/api/player/:index', (req, res) => {
    gameData.players[req.params.index - 1] = {
        ...gameData.players[req.params.index - 1],
        ...req.body
    }

    res.status(200).redirect('/')
});

app.get('/api/game', (req, res) =>res.json({game: gameData}));

app.post('/api/turn', (req, res) => {
    gameData.turn = req.body.turn
    res.status(200)
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));