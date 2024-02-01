
import React, { useState, useEffect } from "react";
import axios from "axios";

// not using prev mode. may cause issue with stale state?
export default function useVisualMode(initial) {

    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {}
      });

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

    const setDay = (day) => setState({ ...state, day });

    useEffect(() => {
        Promise.all([
        axios.get('http://localhost:8001/api/days'),
        axios.get('http://localhost:8001/api/appointments'),
        axios.get('http://localhost:8001/api/interviewers')
        ]).then((all) => {

            setState(prev => ({...prev, 
            days: all[0].data, 
            appointments: all[1].data, 
            interviewers: all[2].data 
            }))

        });
    }, [state.day]);
    //const dailyAppointments = getAppointmentsForDay(state, state.day);
  
    return {state, setDay, bookInterview, cancelInterview}
}