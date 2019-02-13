import React from "react";
import { format } from "date-fns";
import { WEEKDAYS } from "../../constants";

const Controllers = ({ handleClick, displayedDate }) => (
  <div className={"Calendar__controllers"}>
    <button className={"Calendar__controller"} onClick={() => handleClick(-1)}>
      Prev
    </button>
    <button className={"Calendar__controller"} onClick={() => handleClick(1)}>
      Next
    </button>
    <h3 className={"Calendar__month"}>{format(displayedDate, "MMMM")}</h3>
    <div className={"Calendar__weekdays"}>
      {WEEKDAYS.map((weekday, index) => (
        <span key={index} className={"Calendar__weekday"}>
          {weekday}
        </span>
      ))}
    </div>
  </div>
);

export default Controllers;
