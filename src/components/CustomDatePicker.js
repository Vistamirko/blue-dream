"use client";

import React, { useState, useEffect, useRef } from 'react';

const CustomDatePicker = ({ selectedDate, onDateSelect, language = 'it', isDateDisabled, durationDays = 1 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(selectedDate ? new Date(selectedDate) : new Date());
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysOfWeekIt = ['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'];
  const daysOfWeekEn = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const daysOfWeek = language === 'it' ? daysOfWeekIt : daysOfWeekEn;

  const monthNamesIt = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthNames = language === 'it' ? monthNamesIt : monthNamesEn;

  // Helper to get days in a month
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  
  // Helper to get first day of the week (0 = Sunday)
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const renderMonth = (dateOffset) => {
    const targetDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + dateOffset, 1);
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    // Empty slots for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`} className="p-0"></td>);
    }
    
    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // Determine if date is past (before today)
      const dateObj = new Date(year, month, day);
      const isPast = dateObj < new Date(new Date().setHours(0,0,0,0));
      const isDisabled = isPast || (isDateDisabled && isDateDisabled(dateObj));

      let isSelected = false;
      let isInRange = false;
      let isRangeStart = false;
      let isRangeEnd = false;

      if (selectedDate) {
        const start = new Date(selectedDate);
        start.setHours(0,0,0,0);
        const end = new Date(start);
        end.setDate(end.getDate() + durationDays - 1);
        
        const current = new Date(year, month, day);
        
        isSelected = currentDateString === selectedDate;
        if (current >= start && current <= end) {
          isInRange = true;
          if (current.getTime() === start.getTime()) isRangeStart = true;
          if (current.getTime() === end.getTime()) isRangeEnd = true;
        }
      }

      days.push(
        <td key={day} className="p-0 relative">
          {isInRange && durationDays > 1 && (
            <div className={`absolute inset-y-1 ${isRangeStart ? 'left-1/2 right-0' : isRangeEnd ? 'left-0 right-1/2' : 'left-0 right-0'} bg-[#e6f4ed] z-0`}></div>
          )}
          <div 
            onClick={() => {
              if (!isDisabled) {
                onDateSelect(currentDateString);
                setIsOpen(false);
              }
            }}
            className={`relative size-10 focus:outline-none flex items-center justify-center mx-auto z-10 ${isDisabled ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'}`}
          >
            <div className={`relative flex size-full items-center justify-center rounded-full text-sm transition-all duration-200
              ${isSelected || isRangeEnd ? 'bg-[#009649] text-white font-bold shadow-md' : isInRange ? 'text-[#009649] font-bold' : 'text-[#414651] hover:bg-[#f3f4f6] hover:text-[#009649] hover:font-medium'}
            `}>
              {day}
            </div>
          </div>
        </td>
      );
    }

    // Group into weeks (rows)
    const weeks = [];
    let currentWeek = [];
    days.forEach((dayComponent, idx) => {
      currentWeek.push(dayComponent);
      if (currentWeek.length === 7 || idx === days.length - 1) {
        // Pad the last week if necessary
        while (currentWeek.length < 7) {
          currentWeek.push(<td key={`empty-end-${currentWeek.length}`} className="p-0"></td>);
        }
        weeks.push(<tr key={idx} className="border-b-4 border-transparent last-of-type:border-none">{currentWeek}</tr>);
        currentWeek = [];
      }
    });

    return (
      <div className={`flex flex-col gap-3 px-6 py-5 ${dateOffset > 0 ? 'border-l border-[#e9eaeb] hidden md:flex' : ''}`}>
        <header className={`relative flex items-center ${dateOffset === 0 ? 'justify-between md:justify-start' : 'justify-end'}`}>
          {dateOffset === 0 && (
            <button 
              onClick={handlePrevMonth}
              type="button" 
              className="flex items-center justify-center size-8 rounded-lg text-[#414651] hover:bg-[#f3f4f6] transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </button>
          )}
          
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-[#414651]">
            {monthNames[month]} {year}
          </h2>

          {(dateOffset === 1 || (dateOffset === 0 && typeof window !== 'undefined' && window.innerWidth < 768)) && (
            <button 
              onClick={handleNextMonth}
              type="button" 
              className="flex items-center justify-center size-8 rounded-lg text-[#414651] hover:bg-[#f3f4f6] transition-colors ml-auto"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </button>
          )}
        </header>

        <table className="w-full md:w-max" cellPadding="0">
          <thead>
            <tr>
              {daysOfWeek.map(day => (
                <th key={day} className="border-b-4 border-transparent p-0">
                  <div className="flex size-8 md:size-10 items-center justify-center text-sm font-medium text-[#6f7480]">{day}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks}
          </tbody>
        </table>
      </div>
    );
  };

  // Format date for display
  const displayDate = () => {
    if (!selectedDate) return language === 'it' ? 'Seleziona Data' : 'Select Date';
    const d = new Date(selectedDate);
    return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#f8f9fa] border border-[#dfe1e8] rounded-xl px-4 py-3.5 text-[#070c26] flex items-center justify-between cursor-pointer hover:border-[#009649] transition-colors"
      >
        <span className="font-medium text-[15px]">{displayDate()}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#070c26] opacity-50">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </div>

      {isOpen && (
        <div className="absolute top-[110%] left-0 z-50 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#dfe1e8] overflow-hidden animate-fade-in origin-top-left">
          <div className="flex items-start justify-center w-full">
            {renderMonth(0)}
            {/* Show second month only on desktop */}
            <div className="hidden md:block">
              {renderMonth(1)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
