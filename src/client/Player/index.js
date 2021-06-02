import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import PlayerDetails from "../PlayerDetails";
import PrimaryObjectiveScorer from "../PrimaryObjectiveScorer";
import SecondaryObjectiveScorer from "../SecondaryObjectiveScorer";


import "./style.css";

const Player = ({id, visible}) => {
  const [primaryPoints, setPrimaryPoints] = useState(0);
  const [secondaryPoints, setSecondaryPoints] = useState(0);
  const [paintedPoints, setPaintedPoints] = useState(0);

  const classes = classNames("Player", {
    "Player--visible": visible
  });

  return (
    <div className={ classes }>
      <PlayerDetails id={id} />
      <PrimaryObjectiveScorer updateTotal={setPrimaryPoints} />
      <SecondaryObjectiveScorer updateTotal={setSecondaryPoints} />

      <div className="total-points">
        <div className="total-points__label">
                    Painted Bonus
        </div>
        <div 
          id="painted-bonus" 
          className={ paintedPoints ? 'total-points__number painted-active' : 'total-points__number painted-bonus' } 
          onClick={ () => {
            console.log(paintedPoints);
            setPaintedPoints(1-paintedPoints);
          } 
        }>
           10
        </div>
      </div>


      <div className="total-points">
        <div className="total-points__label">
          Final Total
        </div>
        <div className="total-points__number">
          { primaryPoints + secondaryPoints + (paintedPoints * 10)} / 100
        </div>
      </div>
    </div>
  );
};
Player.propTypes = {
  id: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired
};

export default Player;
