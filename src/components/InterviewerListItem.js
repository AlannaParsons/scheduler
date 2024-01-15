import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  function formatSpots(props) {
    switch (props.spots) {
      case 0: return "no spots remaining";
      case 1: return "1 spot remaining";
      default: return `${props.spots} spots remaining`;
    }
  }


  let liClass = classNames('day-list__item ', {
    'day-list__item--full': (props.spots === 0),
    'day-list__item--selected' : props.selected
  });



  return (

    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>

  );
}