import React, {Component} from 'react';
import Day from 'app/components/Day';

class Calendar extends Component {

  /**
   * Get the first Date (a Monday) that should appear in the calendar
   * @return Date
   */
  getFirstDay() {
    let firstDay = new Date(
      this.date.getFullYear(), this.date.getMonth()
    );
    firstDay.setDate(
      firstDay.getDate() - (this.getOffsetDayNum(firstDay) - 1)
    );
    return firstDay;
  }

  /**
   * Get the last Date (a Sunday) that should appear in the calendar
   * @return Date
   */
  getLastDay() {
    let lastDay = new Date(
      this.date.getFullYear(), this.date.getMonth() + 1, -1
    );
    lastDay.setDate(
      lastDay.getDate() + (7 - this.getOffsetDayNum(lastDay))
    );
    return lastDay;
  }

  /**
   * Utility method for getFirstDay/getLastDay
   * Returns an integer representing the day (1 = Monday, 7 = Sunday)
   *
   * @param  Date date
   * @return int
   */
  getOffsetDayNum(date) {
    let dayNum = date.getDay();
    if (dayNum === 0) { dayNum = 7; }
    return dayNum;
  }

  /**
   * Parse the events prop into the format which will be used
   * to generate <Day/> components during render()
   */
  parseEvents(events) {
    this.events = {};

    for (var event of events) {
      for (let occur of event.occurrences) {
        let start = new Date(occur.start);
        let end = new Date(occur.finish);
        if (end <= start) {
          console.error('event ends before it begins!', event);
          continue;
        }

        // iterate each day between the start and end days
        // of the occurrence, since we'll need to pass the event
        // to each Day component that falls between the start/end.
        let loopStart = new Date(start);
        loopStart.setHours(0);
        loopStart.setMinutes(0);
        loopStart.setSeconds(0);
        let loopEnd = new Date(end);
        loopEnd.setHours(23);
        loopEnd.setMinutes(59);
        loopEnd.setSeconds(59);

        for (
          let loop = new Date(loopStart);
          loop <= loopEnd;
          loop.setDate(loop.getDate() + 1)
        ) {
          // index this.events by toDateString()
          // so we can easily do a lookup while iterating
          // over each calendar day during render
          let index = loop.toDateString();
          this.events[index] = this.events[index] || [];
          this.events[index].push({
            name: event.name,
            start: start,
            end: end,
          });
        }
      }
    }
  }

  /**
   * Returns an array of arrays, each filled with a row of <Day>s,
   *
   * @return array
   */
  getDayRows() {
    let firstDay = this.getFirstDay();
    let lastDay = this.getLastDay();

    let row = [];
    let rows = [];
    let count = 0;

    for (
      let loop = new Date(firstDay);
      loop <= lastDay;
      loop.setDate(loop.getDate() + 1)
    ) {
      if (count % 7 === 0 && count !== 0) {
        rows.push(row);
        row = [];
      }
      count++;
      let index = loop.toDateString();
      row.push(
        <Day date={new Date(loop)} events={this.events[index]} />
      );
    }
    rows.push(row); // last row left-over from loop

    return rows;
  }

  render() {
    this.date = new Date;
    this.parseEvents(this.props.events);
    let rows = this.getDayRows();

    return (
      <table cellSpacing="0">
        <thead><tr>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
          <th>Sunday</th>
        </tr></thead>
        <tbody>
        {rows.map((r, i) =>
          <tr key={i}>{r.map((d, j) =>
            <td key={j}>{d}</td>
          )}</tr>
        )}
        </tbody>
      </table>
    );
  }
}

export default Calendar;
