import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {

  return (

    <ul>
      {props.days.map((day, i) => {
        return <DayListItem
              key={day.id}
              name={day.name}
              spots={day.spots}
              selected={day.name === props.day}
              setDay={props.setDay}
        />
      })}
    </ul>

  );
}