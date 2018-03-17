import React, {Component} from 'react';
import Event from 'app/components/Event';

class Day extends Component {
  render() {
    let events = [];
    if (this.props.events) { // sort by start date
      events = this.props.events.slice(); // so we don't modify props
      events.sort((x, y) => x.start < y.start ? -1 : 1);
    }

    return (
      <div className={`day${ this.props.isTrailing ? ' trailing' : ''}`}>
      <div className="day-number">{this.props.date.getDate()}</div>
      {events.map((event, i) =>
        <Event key={i} name={event.name} start={event.start} end={event.end} />
      )}
      </div>
    );
  }
}

export default Day;
