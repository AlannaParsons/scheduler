import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";

export default function Appointment(props) {

    function interviewCheck() {
        return (props.interview ? 
            <Show
                student={props.interview.student}
                interviewer={props.interview.interviewer}
                //onEdit={("onEdit")}
                //onDelete={("onDelete")}
            /> : 
            <Empty/>);
    }

    return (
        <article className="appointment">
            <Header
                time = {props.time}
            />
            {interviewCheck()}

        </article>
    );
 }