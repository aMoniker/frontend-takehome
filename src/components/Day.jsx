import React, {Component} from 'react';
import Event from 'app/components/Event';

class Day extends Component {
  render() {
    var { date, isTrailing } = this.props;
    let events = [];
    if (this.props.events) { // sort by start date
      events = this.props.events.slice(); // so we don't modify props
      events.sort((x, y) => x.start < y.start ? -1 : 1);
    }

    var dayStart = new Date(date);
    dayStart.setHours(0);
    dayStart.setMinutes(0);
    dayStart.setSeconds(0);
    var dayEnd = new Date(date);
    dayEnd.setHours(23);
    dayEnd.setMinutes(59);
    dayEnd.setSeconds(59);

    return (
      <div className={`day ${ isTrailing ? 'trailing' : 'normal'}`} data-date={date.toDateString()}>
        <div className="day-number">{date.getDate()}</div>
        {events.map((event, i) => {
          return (
            <Event key={i} name={event.name} start={event.start} end={event.end} showStart={event.start > dayStart} />
          );
        })}
      </div>
    );
  }
}

export default Day;
