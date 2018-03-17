import React, {Component} from 'react';

class Event extends Component {
  render() {
    return (
      <div className="event">{this.props.name}</div>
    );
  }
}

export default Event;
