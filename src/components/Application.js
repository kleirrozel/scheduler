import React, { useState, useEffect } from "react";

import useVisualMode from "hooks/useVisualMode";

import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

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
    This will be passed to each Appointment component 
    Under the save function
  */
  const bookInterview = (id, interview) => {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Add a PUT request to /api/appointments/:id 
    return axios.put(`/api/appointments/${id}`, {interview}).then(response => {
      setState({
        ...state,
        appointments
      });
    })
  };

  /* 
    Function that cancels an interview
    Use the appointment id to find the right appointment slot 
    and set it's interview data to null
  */
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Add a DELETE request to /api/appointments/:id 
    return axios.delete(`/api/appointments/${id}`).then(response => {
      setState({
        ...state,
        appointments
      });
    })
  };

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

  /* 
    Updates the day state when sidebar is clicked
  */
  const setDay = day => setState({ ...state, day });

  /* 
    State will request to the days 
    and then appointments endpoints 
  */
  useEffect(() => {
    const getDays = "api/days";
    const getAppointments = "api/appointments";
    const getInterviewers = "api/interviewers";

    Promise.all([
      axios.get(getDays),
      axios.get(getAppointments),
      axios.get(getInterviewers)
    ]).then((all) => {
      setState((prev) => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data
      }))
    })
  }, []);

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