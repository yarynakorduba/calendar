import { addMonths } from "date-fns";
import { Fragment } from "react";
import { compose, withProps, withStateHandlers } from "recompose";
import React from "react";
import { fillMonthArray } from "../../helpers";
import Controllers from "../Controllers/Controllers";

let Calendar = ({ displayedDate, currentMonth, handleClick, children }) => (
  <div className={"Calendar"}>
    <Controllers handleClick={handleClick} displayedDate={displayedDate} />
    {currentMonth.map((date, index) => (
      <Fragment key={index}>
        {children(date, index)}
        {(index + 1) % 7 === 0 && <br />}
      </Fragment>
    ))}
  </div>
);

const enhancer = compose(
  withStateHandlers(
    () => ({
      displayedDate: new Date()
    }),
    {
      handleClick: ({ displayedDate }) => counter => ({
        displayedDate: addMonths(displayedDate, counter)
      })
    }
  ),
  withProps(({ displayedDate }) => ({
    currentMonth: fillMonthArray(displayedDate, WEEKDAYS_NUMBER)
  }))
);

export default enhancer(Calendar);
