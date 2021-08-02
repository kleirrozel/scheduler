import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props){

  // Map over the days array to return three <DayListItem /> components as children
  // Use id value as value for key prop aka {day.id}?

  return(
    <ul> {
      props.days.map((day) =>
        < 
          DayListItem key = {day.id}
          name = {day.name}  
          spots = {day.spots} 
          selected = {day.name === props.day}
          setDay = {props.setDay}  
        />
      )};
    </ul>
  )
};
