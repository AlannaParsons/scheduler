import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Form from "./Form.js";
import Status from "./Status.js";
import Confirm from "./Confirm.js";
import Error from "./Error.js";
import useVisualMode from "../../hooks/useVisualMode.js";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

    async function save(name, interviewer) {

        const interview = {
            student: name,
            interviewer
          };

        transition(SAVING, true);

        props
            .bookInterview(props.id, interview, mode === EDIT)
            .then(() => transition(SHOW))
            .catch(error => { transition(ERROR_SAVE, true)
            });
    }

    function destroy(event) {
        transition(DELETING, true);
        props
            .cancelInterview(props.id)
            .then(() => transition(EMPTY))
            .catch(error => transition(ERROR_DELETE, true));
    }

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );

    return (
        <article className="appointment" data-testid="appointment">
            <Header
                time = {props.time}
            />

            {mode === EMPTY && (
                <Empty 
                    onAdd={() => (transition(CREATE))} 
                />
            )}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                    onDelete={() => (transition(CONFIRM))}
                    onEdit={() => (transition(EDIT))}
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
                    onConfirm={destroy}
                />
            )}
            {mode === DELETING && (
                <Status 
                    message={'Deleting'}
                />
            )}
            {mode === EDIT && (
                <Form
                    student={props.interview.student}
                    interviewer={props.interview.interviewer.id}
                    interviewers={props.interviewers}
                    onCancel={back}
                    onSave={save}
                />
            )}
            {mode === ERROR_SAVE && (
                <Error
                    message={'Error saving appointment'}
                    onClose={back}
                />
            )}
            {mode === ERROR_DELETE && (
                <Error
                    message={'Error deleting appointment'}
                    onClose={back}
                />
            )}

        </article>
    );
 }