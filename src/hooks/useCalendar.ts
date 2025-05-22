
import { useState } from 'react';

export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const formattedMonth = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  
  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };
  
  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  return {
    currentDate,
    formattedMonth,
    goToPreviousMonth,
    goToNextMonth
  };
};
