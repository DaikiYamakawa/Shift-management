import React, { useState } from "react";
import { isSameDay } from "date-fns";
import { enGB } from "date-fns/locale";
import { Calendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";

// Very rough implementation of multiple date selection
export default function PickDateCalendar(props) {
  
  const modifiers = {
    selected: (date) => props.selectedDates.some((selectedDate) => isSameDay(selectedDate, date)),
  };

  const handleDayClick = (date) => {
    if (props.selectedDates.some((selectedDate) => isSameDay(selectedDate, date))) {
      // クリックされた日付が既に存在していた場合、その日付を配列から取り除き、setSelectedDatesを実行します。
      props.setSelectedDates(props.selectedDates.filter((selectedDate) => !isSameDay(selectedDate, date)));
    } else {
      // クリックされた日付が既に存在していない場合、今まで通り配列に日付を追加します。
      props.setSelectedDates([...props.selectedDates, date]);
    }
  };

  return <Calendar onDayClick={handleDayClick} modifiers={modifiers} locale={enGB} />;
}
