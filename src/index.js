import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import { getDaysInMonth, addMonths, format } from "date-fns";

const WEEKDAYS_NUMBER = 7;
const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export const getMonthDays = date => getDaysInMonth(date);

export const correctDaysOffset = (date, offset = 1) =>
  (WEEKDAYS_NUMBER - (offset - date)) % WEEKDAYS_NUMBER;

export const fillMonthArray = date => {
  date = new Date(date.setDate(1));
  const daysInMonth = getDaysInMonth(date);
  const startWeekOfMonth = correctDaysOffset(date.getDay());
  return [
    ...new Array(startWeekOfMonth).fill(),
    ...new Array(daysInMonth)
      .fill()
      .map((day, index) => new Date(date.setDate(index + 1)))
  ];
};

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedDate: new Date()
    };
  }

  renderCalendar = () =>
    fillMonthArray(this.state.displayedDate, WEEKDAYS_NUMBER);

  render() {
    const { children } = this.props;
    const { displayedDate } = this.state;
    const currentMonth = this.renderCalendar();
    return (
      <div className={"Calendar"}>
        <div className={"Calendar__controllers"}>
          <button
            className={"Calendar__controller"}
            onClick={() =>
              this.setState({
                displayedDate: addMonths(displayedDate, -1)
              })
            }
          >
            Prev
          </button>
          <button
            className={"Calendar__controller"}
            onClick={() =>
              this.setState({
                displayedDate: addMonths(displayedDate, 1)
              })
            }
          >
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
        {currentMonth.map((date, index) => (
          <Fragment key={index}>
            {children(date, index)}
            {(index + 1) % 7 === 0 && <br />}
          </Fragment>
        ))}
      </div>
    );
  }
}

const App = () => (
  <>
    <Calendar>
      {(day, index) =>
        day ? (
          <span key={index} className={"Calendar__day"}>
            {day.getDate()}
          </span>
        ) : (
          <span key={index} className={"Calendar__day_empty"}>
            &#10084;
          </span>
        )
      }
    </Calendar>
  </>
);

ReactDOM.render(<App />, document.getElementById("root"));
