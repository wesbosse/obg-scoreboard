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
    console.log(round, total, primary)
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
        round2: playerData.round2,
        round3: playerData.round3,
        round4: playerData.round4,
        round5: playerData.round5,
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
      ...primary
    });
    alert('Submitted')
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
      <PlayerInput
        id={`${id}-round2`}
        type="number"
        label={"Primary - Round 2"}
        onChange={(value)=>handlePrimaryUpdate( 2, Number(value))}
        value={primary.round2}
        max={15}
      />
      <PlayerInput
        id={`${id}-round3`}
        type="number"
        label={"Primary - Round 3"}
        onChange={(value)=>handlePrimaryUpdate( 3, Number(value))}
        value={primary.round3}
        max={15}
      />
      <PlayerInput
        id={`${id}-round4`}
        type="number"
        label={"Primary - Round 4"}
        onChange={(value)=>handlePrimaryUpdate( 4, Number(value))}
        value={primary.round4}
        max={15}
      />
      <PlayerInput
        id={`${id}-round5`}
        type="number"
        label={"Primary - Round 5"}
        onChange={(value)=>handlePrimaryUpdate( 5, Number(value))}
        value={primary.round5}
        max={15}
      />


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
      <br />
      <br />
      <div>
        <div className="submit" onClick={submitPlayer}>Update Player {id}</div>
      </div>
    </div>
  );
};
Player.propTypes = {
  id: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired
};

export default Player;
