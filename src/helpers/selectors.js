  /**
 * @constructor - return an array of appointments for the given day
 * @param {object} state
 * @param {integer} day
 * @returns {array} - appointment objects or empty if none found
 */
export function getAppointmentsForDay(state, day) {

    const findDay = state.days.filter(date => date.name === day);

    const appointmentsForDay = findDay.length > 0 
        ? findDay[0].appointments.map(appointment_id => state.appointments[appointment_id]) 
        : [];
    
    return appointmentsForDay;
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

//   /**
//    * double check what interviewers SHOULD be being returned. currently returns interviewers who have other interviews that day?? incorrect?
//    * 
//  * return an array of objects that contains all interviewers active in given day
//  * @param {object} day
//  * @returns {array} - interviewer objects or empty if none found
//  */
//   export function getInterviewersForDay(state, day) {
    
//     let interviewersForDay = [];
//     const findDay = state.days.filter(date => date.name === day);
//     let interviewer_ids = [];
    
    
//     //filter to find valid interviews. use valid interviews to pull interviewer obj
//     if (findDay.length > 0) {
//       interviewersForDay = findDay[0].appointments
//         //.filter(appointment_id => state.appointments[appointment_id].interview)
//         .filter(appointment_id => {
//           if (state.appointments[appointment_id].interview) {
//             if (!interviewer_ids.includes(state.appointments[appointment_id].interview.interviewer)) {
//               interviewer_ids.push(state.appointments[appointment_id].interview.interviewer)
//               return appointment_id;
//             } else return false;
//           } else return false;
//         })
//         .map(appointment_id => {
//           let interviewer_id = state.appointments[appointment_id].interview.interviewer
//           return state.interviewers[interviewer_id];
//         })
//     }

//     return interviewersForDay;
//   }

  /**
   * revisit. mayeb interviewer cannot do more than 1 interviewer per day
   * 
 * return an array of objects that contains all interviewers active in given day
 * @param {object} day
 * @returns {array} - interviewer objects or empty if none found
 */
  export function getInterviewersForDay(state, day) {
    const found = state.days.find(d => day === d.name);
  
    if (state.days.length === 0 || found === undefined) return [];

    return found.interviewers.map(id => state.interviewers[id]);
  }