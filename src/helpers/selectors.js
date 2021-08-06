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
  Returns a new object containing the interview data 
  when we pass it an object that contains the interviewer. 
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

/*
  Creates an interviewers array 
  that will first be passed to the Appointment component 
  and then passed down to the Form component.
*/
export function getInterviewersForDay(state, day) {
  const dayOfInterview = state.days.find(weekday => weekday.name === day);

  if (state.days.length === 0 || dayOfInterview === undefined) {
    return [];
  }

  const interviewersArray = dayOfInterview.interviewers.map(id => state.interviewers[id]);
  return interviewersArray;
};