export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
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
