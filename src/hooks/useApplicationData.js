import { useState, useEffect } from "react";
import axios from 'axios';

import { updateAppointments, rectifySpots } from '../helpers';

export default function useApplicationData () {

  const initialState = {
    day: 'Monday',
    days: [],
    appointments: {}
  };

  // state
  const [state, setState] = useState(initialState);
  // set the current day
  const setDay = day => setState(prev => ({ ...prev, day })); 

  useEffect(()=> {
    const getDays = axios.get('/api/days');
    const getAppointments = axios.get('/api/appointments');
    const getInterviewers = axios.get('/api/interviewers');
    
    Promise.all([getDays, getAppointments, getInterviewers]).then((all) => {
      const [
        { data: days }, { data: appointments }, { data: interviewers }
      ] = all;

      setState(prev => ({...prev, days, appointments, interviewers}));
    }).catch(err => {
      console.log(err);
    });
  }, []);

  // update the state object 
  const bookInterview = (interview, appointmentId) => {

    const appointments = updateAppointments(state, interview, appointmentId);
    const days = rectifySpots({ days:state.days, appointments }, appointmentId);

    const url = `/api/appointments/${appointmentId}`
    return axios.put(url, { interview }).then(res => {
      setState(prev => {
        return {...prev, appointments, days};
      });
    });
  }

  // update state
  const cancelInterview = (appointmentId) => {

    const appointments = updateAppointments(state, null, appointmentId);
    const days = rectifySpots({ days:state.days, appointments }, appointmentId);

    const url = `/api/appointments/${appointmentId}`
    return axios.delete(url).then(res => {
      setState(prev => {
        return {...prev, appointments, days};
      });
    });
  }


  return {state, setDay, bookInterview, cancelInterview};
}