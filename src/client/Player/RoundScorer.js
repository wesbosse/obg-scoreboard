import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import RoundScorerPointSelector from "./RoundScorerPointSelector";

const RoundScorer = ({round, handlePointUpdate}) => {
  const [currentSelection, setCurrentSelection] = useState(false);

  const handlePointSelection = useCallback((newPoints) => {
    if(currentSelection === newPoints) {
      setCurrentSelection(false);
      handlePointUpdate(0);
    } else {
      setCurrentSelection(newPoints);
      handlePointUpdate(newPoints);
    }
  }, [handlePointUpdate, currentSelection]);

  return (
    <div className="RoundScorer">
      <div className="RoundScorer__element RoundScorer__title">Primary Objective - Round { round }</div>
      <input type="number" onChange={handlePointUpdate}/>
    </div>
  );
};

RoundScorer.propTypes = {
  round: PropTypes.number.isRequired,
  handlePointUpdate: PropTypes.func.isRequired
};

export default RoundScorer;