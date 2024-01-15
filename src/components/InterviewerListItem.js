import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  function showName(props) { 
    return (props.selected && <>{props.name}</>);
  }

  let liClass = classNames('interviewers__item ', {
    'interviewers__item--selected' : props.selected
  });

  return (

    <li className={liClass}
        onClick={() => props.setInterviewer() }>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {showName(props)}
    </li>

  );
}