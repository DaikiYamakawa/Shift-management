import React, { useState } from 'react'
import { isSameDay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Calendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

// Very rough implementation of multiple date selection
export default function PickDateCalendar() {
  const [selectedDates, setSelectedDates] = useState([])
  const modifiers = {
    selected: date => selectedDates.some(selectedDate => isSameDay(selectedDate, date))
  }
  const handleDayClick = date => {
    if (selectedDates.some(selectedDate => isSameDay(selectedDate, date))) {
      // クリックされた日付が既に存在していた場合、その日付を配列から取り除き、setSelectedDatesを実行します。
      setSelectedDates(
        selectedDates.filter(selectedDate => !isSameDay(selectedDate, date))
      )
    } else {
      // クリックされた日付が既に存在していない場合、今まで通り配列に日付を追加します。
      setSelectedDates([...selectedDates, date])
    }
  }
  return (
    <Calendar onDayClick={handleDayClick} modifiers={modifiers} locale={enGB} />
  )
}