import React from "react";
import InterviewerListItem from "components/InterviewerListItem.js";
import "components/InterviewerList.scss";

// interviewers:array - an array of objects as seen above
// setInterviewer:function - a function that accepts an interviewer id. This function will simply be passed down to the <InterviewerListItem>
// interviewer:number - a number that represents the id of the currently selected interviewer

export default function InterviewerList(props) {

  return (

    <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">

            {props.interviewers.map((interviewer, i) => {
                return <InterviewerListItem
                    key={interviewer.id}
                    name={interviewer.name}
                    avatar={interviewer.avatar}
                    selected={props.value === interviewer.id}
                    setInterviewer={() => props.onChange(interviewer.id)}
                    >
                </InterviewerListItem>
            })}

        </ul>
    </section>

  );
}