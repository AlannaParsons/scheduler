  /**
 * @constructor - return an array of appointments for the given day
 * @param {object} state
 * @param {integer} day
 * @returns {array} - objects or empty if none found
 */
export function getAppointmentsForDay(state, day) {
    const findDay = state.days.filter(date => date.name === day);

    const appointments = findDay.length > 0 
        ? findDay[0].appointments.map(appointment_id => state.appointments[appointment_id]) 
        : [];
    
    return appointments;
  }

  /**
 * return an object that contains the interview data if it is passed an object that contains an interviewer
 * @param {object} state
 * @param {object} interview
 * @returns {object} - object or null if none found
 */
export function getInterview(state, interview) {

  return interview 
    ? { 
        ...interview,
        interviewer: state.interviewers[interview.interviewer]
      }
    : null
  ;
}