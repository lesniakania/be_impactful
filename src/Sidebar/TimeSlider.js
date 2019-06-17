import React, { useState } from "react";
import "./TimeSlider.css";

export default function TimeSlider() {
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let [monthIndex, setMonthIndex] = useState(0);

  const onMonthChange = e => {
    setMonthIndex(e.currentTarget.value);
  };

  return (
    <div className="time-slider">
      <h2 className="time-slider__title">Choose time period</h2>
      <select>
        {[2018, 2019].map(year => (
          <option key={`timeline-year-${year}`} value={year}>
            {year}
          </option>
        ))}
      </select>
      <div className="month-slider">
        <input
          id="slider"
          type="range"
          min="0"
          max="11"
          step="1"
          value={monthIndex}
          onChange={onMonthChange}
          className="month-slider__input"
        />
        <span className="month-slider__label">{MONTHS[monthIndex]}</span>
      </div>
    </div>
  );
}
