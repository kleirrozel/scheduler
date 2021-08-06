import { useState, useEffect } from "react";

import axios from "axios";

/* 
  Our useApplicationData Hook will return an object with four keys.

  The state object will maintain the same structure.
  The setDay action can be used to set the current day.
  The bookInterview action makes an HTTP request and updates the local state.
  The cancelInterview action makes an HTTP request and updates the local state.
 */

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

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

  return { state, setDay, bookInterview, cancelInterview };
};