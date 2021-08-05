export function getAppointmentsForDay(state, day) {
  /*
    Returns an array of appointments for that day
  */
  const filteredDays = state.days.filter(theDay => theDay.name === day)[0];
  if (!filteredDays) {
    return [];
  }

  const result = [];
  for (let id of filteredDays.appointments) {
    let appointmentsArray = state.appointments[id];
    result.push(appointmentsArray);
  }
  return result;
};


/* 
  Returns a new object containing the interview data when we pass it an object that contains the interviewer. 
  Otherwise, the function should return null 
*/
export function getInterview(state, interview) {
  if (!interview) return null;

  const id = interview.interviewer;
  const newInterviewObj = {};
  newInterviewObj.interviewer = state.interviewers[id];
  newInterviewObj.student = interview.student;

  return newInterviewObj;
};