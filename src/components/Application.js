import React from "react";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import useApplicationData from "hooks/useApplicationData";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  /* 
    Displaying Appointments
    Returns an array of Appointment objects 
    from the function made in selector.js
  */
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  /*
  Creates an interviewers array
  */
  const interviewers = getInterviewersForDay(state, state.day);

  /* 
    This generates Appointment components
  */
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <
        Appointment 
        key={appointment.id} 
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler" />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              day={state.day}
              setDay={setDay}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}