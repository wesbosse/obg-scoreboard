import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import PlayerInput from "../PlayerInput";
// import PrimaryObjectiveScorer from "../PrimaryObjectiveScorer";
// import SecondaryObjectiveScorer from "../SecondaryObjectiveScorer";
import axios from "axios";
import RoundScorer from "./RoundScorer";
import SecondaryObjectiveTally from "./SecondaryObjectiveTally";

import "./style.css";

const calculateTotal = (points) => Object.values(points).reduce((total, round) => {
  total += round;
  return total >= 45 ? 45 : total;
}, 0);

const Player = ({id, visible}) => {
  const [primaryPoints, setPrimaryPoints] = useState(0);
  const [secondaryPoints, setSecondaryPoints] = useState(0);
  const [paintedPoints, setPaintedPoints] = useState(0);
  const [name, setName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [cp, setCP] = useState("0");
  const [faction, setFaction] = useState("");
  const [primary, setPrimary] = useState({
    round2: 0,
    round3: 0,
    round4: 0,
    round5: 0,
  });
  const [points, setPoints] = useState({
    secondary1: 0,
    secondary2: 0,
    secondary3: 0,
  });

  const classes = classNames("Player", {
    "Player--visible": visible
  });

  const handlePointUpdate = React.useCallback((secondary, total) => {
    setPoints({
      ...points,
      ...{[`secondary${secondary}`]: total}
    });
  }, [setPoints, points]);

  const handlePrimaryUpdate = React.useCallback((round, total) => {
    
    setPrimary({
      ...primary,
      ...{[`round${round}`]: total}
    });
  }, [setPrimary, primary]);

  const fetchData = React.useCallback(() => {
    console.log('firing fetch: ', `https://obg-scoreboard.herokuapp.com/api/player/${id}`);

    axios({
      "method": "GET",
      "url": `https://obg-scoreboard.herokuapp.com/api/player/${id}`,
    })
    .then((response) => {
      console.log(response)
      let playerData = response.data.player
      setName(playerData.name)
      setTeamName(playerData.teamName)
      setCP(playerData.cp)
      setFaction(playerData.faction)
      setPaintedPoints(playerData.paintedPoints)
      setPrimary({
        round2: playerData.primary2,
        round3: playerData.primary3,
        round4: playerData.primary4,
        round5: playerData.primary5,
      })
      setPoints({
        secondary1: playerData.secondary1,
        secondary2: playerData.secondary2,
        secondary3: playerData.secondary3,
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  const submitPlayer = () => {
    axios.post(`/api/player/${id}`, {
      faction: faction,
      name: name,
      teamName: teamName,
      cp: cp,
      ...points,
      ...primaryPoints
    });
  }

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  React.useEffect(() => {
    setSecondaryPoints(calculateTotal(points));
  }, [points, setSecondaryPoints]);

  React.useEffect(() => {
    setPrimaryPoints(calculateTotal(primary));
  }, [primary, setPrimaryPoints]);

  return (
    <div className={ classes }>
      <div className="PlayerDetails">
      <PlayerInput
        id={`player-name-${id}`}
        label={`Player ${id} Name`}
        onChange={setName}
        value={name}
        className="PlayerInput__name"
      />
      <PlayerInput
        id={`player-team-${id}`}
        label={`Player ${id} Team Name`}
        onChange={setTeamName}
        value={teamName}
        className="PlayerInput__name"
      />
      <PlayerInput
        id={`cp-${id}`}
        type="number"
        label={"CP"}
        onChange={setCP}
        value={cp}
        className="PlayerInput__cp"
      />
      <PlayerInput
        id={`faction-${id}`}
        label={"Faction"}
        onChange={setFaction}
        value={faction}
      />
    </div>
      <div className="PrimaryObjectiveScorer">
        <RoundScorer
          round={2}
          handlePrimaryUpdate={(primary) => handlePrimaryUpdate(2, primary)} />
        <RoundScorer
          round={3}
          handlePrimaryUpdate={(primary) => handlePrimaryUpdate(3, primary)} />
        <RoundScorer
          round={4}
          handlePrimaryUpdate={(primary) => handlePrimaryUpdate(4, primary)} />
        <RoundScorer
          round={5}
          handlePrimaryUpdate={(primary) => handlePrimaryUpdate(5, primary)} />

        <div className="total-points">
          <div className="total-points__label">
                      Primary Points Total
          </div>
          <div className="total-points__number">
            { calculateTotal(primary) } / 45
          </div>
        </div>
      </div>
      
      <div className="SecondaryObjectiveScorer">
        <SecondaryObjectiveTally
          number="One"
          handlePointUpdate={(points) => handlePointUpdate(1, points)} />
        <SecondaryObjectiveTally
          number="Two"
          handlePointUpdate={(points) => handlePointUpdate(2, points)} />
        <SecondaryObjectiveTally
          number="Three"
          handlePointUpdate={(points) => handlePointUpdate(3, points)}/>
          
        <div className="total-points">
          <div className="total-points__label">
                      Secondary Points Total
          </div>
          <div className="total-points__number">
            { calculateTotal(points) } / 45
          </div>
        </div>
      </div>

      <div className="total-points">
        <div className="total-points__label">
                    Painted Bonus
        </div>
        <div 
          id="painted-bonus" 
          className={ paintedPoints ? 'total-points__number painted-active' : 'total-points__number painted-bonus' } 
          onClick={ () => {
            setPaintedPoints(1-paintedPoints);
          } 
        }>
           {paintedPoints * 10} / 10
        </div>
      </div>


      <div className="total-points">
        <div className="total-points__label">
          Final Total
        </div>
        <div className="total-points__number">
          
          { primaryPoints + secondaryPoints + (paintedPoints * 10) } / 100
        </div>
      </div>
      <div>
        <button onClick={submitPlayer}>Update Player {id}</button>
      </div>
    </div>
  );
};
Player.propTypes = {
  id: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired
};

export default Player;
