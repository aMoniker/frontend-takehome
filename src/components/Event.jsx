import React, {Component} from 'react';

class Event extends Component {
  render() {
    const { start } = this.props;
    let hour = `${start.getHours()}`.padStart(2, '0');
    let minute = `${start.getMinutes()}`.padStart(2, '0');
    let startTime = `${hour}:${minute}`;

    return (
      <div className="event">
        <span className="event-start-time">{startTime}</span>
        <span className="event-name">{this.props.name}</span>
      </div>
    );
  }
}

export default Event;
