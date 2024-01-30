
import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Appointment";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterviewersForDay, getInterview} from "../helpers/selectors.js";

//PROBLEM get appointments and getinterviewers running perpetually


export default function Application(props) {
  //maybe remove?
  const calls = {
    "GET_DAYS":     'http://localhost:8001/api/days',
    "GET_APPOINTMENTS": 'http://localhost:8001/api/appointments',
    "GET_INTERVIEWERS": 'http://localhost:8001/api/interviewers'
  }

  //combine book and cancel? similar
  async function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //optomistic set state :s

    let response = await axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    
    setState({
      ...state, 
      appointments
    }) 

    return response
  }

  async function cancelInterview(id) {

    
    const appointment = {
      ...state.appointments[id],
      interview: null 
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let response = await axios.delete(`http://localhost:8001/api/appointments/${id}`)
    
    setState({
      ...state, 
      appointments
    }) 

    return response
  }

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = (day) => setState({ ...state, day });
  //const dailyAppointments = getAppointmentsForDay(state, state.day);

  useEffect(() => {
    Promise.all([
      axios.get(calls.GET_DAYS),
      axios.get(calls.GET_APPOINTMENTS),
      axios.get(calls.GET_INTERVIEWERS)
      ]).then((all) => {

        setState(prev => ({...prev, 
          days: all[0].data, 
          appointments: all[1].data, 
          interviewers: all[2].data 
        }))

    });
  }, [state.day]);

  
  //look into get interviewersforday. use effect? running too much
  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
     );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
} 
