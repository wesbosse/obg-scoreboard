const express = require('express');
var bodyParser = require('body-parser');
const os = require('os');
var path = require('path');

var Jimp = require('jimp');
const concurrently = require('concurrently');

var imageData = {
    turn: 1,
    players: [
        {
            key: 1,
            faction: 'Salamanders',
            name: 'Griffin',
            teamName: 'TN Titans',
            primary2: 5,
            primary3: 10,
            primary4: 15,
            primary5: 10,
            secondary1: 7,
            secondary2: 12,
            secondary3: 9,
            paintedPoints: 1,
            cp: 6
        },
        {
            key: 2,
            faction: 'Necrons',
            name: 'Wesley',
            teamName: 'OBG',
            round2: 5,
            round3: 0,
            round4: 5,
            round5: 0,
            secondary1: 2,
            secondary2: 1,
            secondary3: 4,
            paintedPoints: 0,
            cp: 1
        }
    ]
}


const updateOverlay = () => {
    let url = 'https://cdn.shoplightspeed.com/shops/634891/files/32936232/obg-twitchoverlay1-layers-2102011822.png'
    Jimp.read(url, (err, overlay) => {
        if (err) throw err;
        Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(font1 => {
            Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font2 => {
                overlay.print(font1, 1550, 80, imageData.turn); // turn counter
                overlay.print(font1, 1535, 272, imageData.players[0].army); // player 1 army
                overlay.print(font2, 1550, 335, imageData.players[0].name + ' | ' + imageData.players[0].team); // player 1 name/team
                if(imageData.players[0].score / 10 > 1) {
                    overlay.print(font1, 1568, 375, imageData.players[0].score); // player 1 score
                } else {
                    overlay.print(font1, 1583, 375, imageData.players[0].score);
                }
                overlay.print(font1, 1698, 375, imageData.players[0].cp); // player 1 CP
                overlay.print(font1, 1535, 492, imageData.players[1].army); // player 2 army
                overlay.print(font2, 1550, 555, imageData.players[1].name + ' | ' + imageData.players[1].team); // player 1 name/team
                if(imageData.players[1].score / 10 > 1) {
                    overlay.print(font1, 1568, 595, imageData.players[1].score); // player 2 score
                } else {
                    overlay.print(font1, 1583, 595, imageData.players[1].score);
                }
                overlay.print(font1, 1698, 595, imageData.players[1].cp); // player 2 CP
                return overlay
            }).then(overlay => {
                return overlay.write('./public/overlay-current.png'); // save
            }).catch(err => {
                console.error(err);
            });
        });
    });

    return 420;
}

const htmlGenerator = (gameData) => {
    return true;
}


const app = express();

var dir = path.join(__dirname, 'public');

app.use(express.static(dir));

app.use(express.static('dist'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/api/getUsername', (req, res) => 
    res.send({ username: os.userInfo().username })
);

app.get('/api/player/:index', (req, res) => 
    res.send({ player: imageData.players[req.params.index - 1] })
);

app.post('/api/player/:index', (req, res) => {
    imageData.players[req.params.index - 1] = {
        ...imageData.players[req.params.index - 1],
        ...req.body
    }

    res.status(200).redirect('/')
});

app.get('/api/game', (req, res) =>
    res.json({game: imageData})
);

app.post('/api/turn', (req, res) => {
    imageData.turn = req.body.turn
    res.status(200).redirect('/')
});

app.get('/api/gameOverlay', (req, res) => {
    res.sendFile(path.join(__dirname+'/scoreboard.html'));
});


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
