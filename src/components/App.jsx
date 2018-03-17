import React, {Component} from 'react';
import Calendar from 'app/components/Calendar';

class App extends Component {

  getEvents() {
    return window.apiResponse.items;
  }

  render() {
    return (
      <Calendar events={this.getEvents()} />
    );
  }
}

export default App;
