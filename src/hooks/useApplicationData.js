
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

        //optomistic set state :s . response unused currently
        let response = await axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
        //axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
            //.then(() => {
                let days = updateSpots(-1)


            //})

            setState({
                ...state, 
                appointments,
                days
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
            //.then(() => {
                let days = updateSpots(1)

                setState({
                ...state, 
                appointments,
                days
                }) 
            //})

        return response
    }

    function updateSpots(update) {

        const days = [...state.days]
        console.log('wtf',days,'STATE',state);
        let index = days.findIndex( day => day.name === state.day ) 
        console.log('happen:', index);
        days[index] = {...days[index], spots: days[index].spots + update }
        return days
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

    return {state, setDay, bookInterview, cancelInterview}
}