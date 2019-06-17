import React, { useState } from "react";

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
      <select>
        {[2018, 2019].map(year => (
          <option key={`timeline-year-${year}`} value={year}>
            {year}
          </option>
        ))}
      </select>
      <input
        id="slider"
        type="range"
        min="0"
        max="11"
        step="1"
        value={monthIndex}
        onChange={onMonthChange}
      />
      {MONTHS[monthIndex]}
    </div>
  );
}
