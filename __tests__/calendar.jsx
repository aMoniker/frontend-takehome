import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Calendar from 'app/components/Calendar';

global.window = {};
import 'app/api-response.js';
var events = window.apiResponse.items;

Enzyme.configure({ adapter: new Adapter() });

describe('a sun-mon calendar with events on each day', function() {

  test('should render 5 weeks for the month march/2016', function() {
    const cal = Enzyme.mount(
      <Calendar date={new Date('March 2016')} events={events} />,
    );
    expect(cal.find('tbody tr')).toHaveLength(5);
  });

  test('should render 31 days for the month march/2016', function() {
    const cal = Enzyme.mount(
      <Calendar date={new Date('March 2016')} events={events} />,
    );
    expect(cal.find('td .day.normal')).toHaveLength(31);
  });

  // using data-date is hacky, but I'm not going to spend forever on this
  test('should render 1 event on 1/march/2018', function() {
    const cal = Enzyme.mount(
      <Calendar date={new Date('March 2018')} events={events} />,
    );
    let marchFirst = new Date('March 1 2018').toDateString();
    expect(cal.find(`.day[data-date="${marchFirst}"] .event`)).toHaveLength(1);
  });

  test('should render 3 events on 13/march/2018 in start order', function() {
    const cal = Enzyme.mount(
      <Calendar date={new Date('March 2018')} events={events} />,
    );
    let marchThirteen = new Date('March 13 2018').toDateString();
    let dayEvents = cal.find(`.day[data-date="${marchThirteen}"] .event`);
    expect(dayEvents).toHaveLength(3);

    let times = dayEvents.find('.event-start-time').map((time) => {
      return new Date(`March 13 2018 ${time.props().children}`);
    });
    for (let i = 1; i < times.length; i++) {
      expect(times[i] >= times[i - 1]).toBeTruthy();
    }
  });

  // No, it shouldn't.
  // test('should render 4 weeks for the month feb/2015', function() {});
  // test('should render 6 weeks for the month dec/2017', function() {});

});
