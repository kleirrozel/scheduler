import React from "react";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";

export default function Appointment(props) {
  const { time, interview, bookInterview, id, interviewers } = props

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    console.log("THIS IS BOOKINTERVIEW: ", interview, "INTERVIEWER: ", interviewer)
    bookInterview(id, interview).then(() => transition(SHOW));
  }

  return (
    <article 
    className="appointment"
    >
      <Header time={time}></Header>
      {/* {interview ? <Show student={interview.student} interviewer={interview.interviewer}></Show> : <Empty onAdd={onAdd}></Empty>} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && ( 
        <Form 
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING}
    </article>
  )
};