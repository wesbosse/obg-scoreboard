import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const RoundScorerPointSelector = ({handlePointSelection, points, selected}) => {
  const classes = classNames("RoundScorer__element", "RoundScorer__points", {
    "RoundScorer__points--active": selected
  });

  return (
    <div
      className={ classes }
      onClick={() => handlePointSelection(points)}
    >
      { points }
    </div>
  );
};



export default RoundScorerPointSelector;