import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Kleir Miranda",
//       interviewer: {
//         id: 1, 
//         name: "Sylvia Palmer", 
//         avatar: "https://i.imgur.com/LpaY82x.png" 
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Elvis Bun",
//       interviewer: {
//         id: 2, 
//         name: "Tori Malcolm", 
//         avatar: "https://i.imgur.com/Nmx0Qxo.png" 
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Moe Ali",
//       interviewer: {
//         id: 4, 
//         name: "Cohana Roy", 
//         avatar: "https://i.imgur.com/FK8V841.jpg"
//       }
//     }
//   },
//   {
//     id: "last",
//     time: "5pm",
//     interview: {
//       student: "Ollie Bean",
//       interviewer: {
//         id: 5, 
//         name: "Sven Jones", 
//         avatar: "https://i.imgur.com/twYrpay.jpg"
//       }
//     }
//   }
// ];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: []
  });

    /* 
    Displaying Appointments
    Returns an array of Appointment objects 
    from the function made in selector.js
  */
    const dailyAppointments = getAppointmentsForDay(state, state.day);

  /* 
    Updates the day state when sidebar is clicked
  */
  const setDay = day => setState({ ...state, day });

  /* 
    State will request to the days 
    and then appointments endpoints 
  */
  useEffect(() => {
    // axios.get("/api/days").then(response => {
    //   setState(response.data)
    //   // console.log("THIS IS THE RESPONSE.DATA   ", response.data);
    // });
    const getDays = "api/days";
    const getAppointments = "api/appointments";
    const getInterviews = "api/interviewers";

    Promise.all([
      axios.get(getDays),
      axios.get(getAppointments),
      axios.get(getInterviews)
    ]).then((all) => {
      setState((prev) => ({...prev, days: all[0].data, appointments: all[1].data
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
      <section className="schedule"> {
        dailyAppointments.map((appointment) =>
        <
          Appointment key={appointment.id} 
          {...appointment} 
        />
        )}
      </section>
    </main>
  );
}