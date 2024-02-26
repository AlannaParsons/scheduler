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
    'day-list__item--selected': props.selected
  });

  return (

    <li className={liClass} 
      data-testid="day" 
      onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light"> {formatSpots(props)}</h3>
    </li>

  );
}

