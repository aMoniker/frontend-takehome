import React, {Component} from 'react';

class Event extends Component {
  render() {
    const { start, name, showStart } = this.props;

    let startDisplay;
    if (showStart) {
      let hour = `${start.getHours()}`.padStart(2, '0');
      let minute = `${start.getMinutes()}`.padStart(2, '0');
      let startTime = `${hour}:${minute}`;
      startDisplay = <span className="event-start-time">{startTime}</span>;
    }

    return (
      <div className="event">
        {startDisplay}
        <span className="event-name">{name}</span>
      </div>
    );
  }
}

export default Event;
