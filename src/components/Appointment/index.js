import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Form from "./Form.js";
import Status from "./Status.js";
import Confirm from "./Confirm.js";
import useVisualMode from "../../hooks/useVisualMode.js";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";

export default function Appointment(props) {

    async function save(name, interviewer) {
        transition(SAVING);
        const interview = {
          student: name,
          interviewer
        };
        //eventual check?? 
        let something = await props.bookInterview(props.id, interview)
        
        transition(SHOW);
    }

    async function deletion() {

        transition(DELETING);
        let something = await props.cancelInterview(props.id)
        transition(EMPTY);
        
    }

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );

    return (
        <article className="appointment">
            <Header
                time = {props.time}
            />

            {mode === EMPTY && (
                <Empty 
                    onAdd={() => (transition(CREATE))} />
            )}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                    onDelete={() => (transition(CONFIRM))}
                />
            )}
            {mode === CREATE && (
                <Form 
                    //student={props.interview.student}
                    interviewers={props.interviewers}
                    onCancel={back}
                    onSave={save}
                 />
            )}
            {mode === SAVING && (
                <Status 
                    message={'Saving'}
                 />
            )}
            {mode === CONFIRM && (
                <Confirm 
                    message={'Are you sure you would like to delete this appointment?'}
                    onCancel={back}
                    onConfirm={deletion}
                 />
            )}
            {mode === DELETING && (
                <Status 
                    message={'Deleting'}
                 />
            )}

        </article>
    );
 }