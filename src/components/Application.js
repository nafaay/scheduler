import React from "react";

import "components/Application.scss";
import DayListItem from "./DayListItem";
export default function Application(props) {
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />      
      </section>
      <section className="schedule">
        <DayListItem name="Monday" spots={5} setDay={"setDay"}/>
        <DayListItem name="Tuesday" spots={0} setDay={"setDay"} />
      </section>
    </main>
  );
}
