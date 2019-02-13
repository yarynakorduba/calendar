import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./components/Calendar";

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
