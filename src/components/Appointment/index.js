import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";

export default function Appointment(props) {
  const { time, interview, student, interviewer, onAdd } = props

  return (
    <article 
    className="appointment"
    >
      <Header time={time}></Header>
      {interview ? <Show student={interview.student} interviewer={interview.interviewer}></Show> : <Empty onAdd={onAdd}></Empty>}
    </article>
  )
};