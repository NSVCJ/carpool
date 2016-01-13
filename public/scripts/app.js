import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

// commented out because passing props between component files is difficult with react router
// import { DriverForm, DriverBox } from './driver';
// import { DriverInfo, DriversList, GetDriversData } from './rider';

var EventfulAPIKey = 'bMhbgh3kzp8mTZtC';
var EventfulAPI = 'http://api.eventful.com/json/events/search?app_key=' + EventfulAPIKey;

// declare global variable to store event API data between components (this is the wrong way to do it)
var EventData;

const Event = React.createClass({
  setEventData: function() {
    EventData = this.props;
    console.log('app.js', EventData);
  },
  render: function() {
    return (
      <div className="event">
        <h3>{this.props.name}</h3>
        <h4>{this.props.startTime}, {this.props.venue}, {this.props.city}, {this.props.region}</h4>
        <h4>
          <Link to="/driver" onClick={this.setEventData}>Driver</Link>
          <Link to="/rider" onClick={this.setEventData}>Rider</Link>
        </h4>
      </div>
    );
  }
});

const SearchBox = React.createClass({
  getInitialState: function() {
    return {location: 'Los Angeles', keywords: 'Lakers'};
  },
  handleLocationChange: function(e) {
    this.setState({location: e.target.value});
  },
  handleKeywordsChange: function(e) {
    this.setState({keywords: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var location = this.state.location.trim();
    var keywords = this.state.keywords.trim();
    if (!keywords || !location) {
      return;
    }
    this.props.onCommentSubmit({location: location, keywords: keywords});
    this.setState({location: '', keywords: ''});
  },
  render: function() {
    return (
      <form className="searchBox" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="location"
          value={this.state.location}
          onChange={this.handleLocationChange}
        />
        <input
          type="text"
          placeholder="query"
          value={this.state.keywords}
          onChange={this.handleKeywordsChange}
        />
        <input type="submit" value="Search" />
      </form>
    );
  }
});

const EventList = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  render: function() {
    var eventNodes = this.props.data.map(function(event) {
      return (
        <Event key={event.id} name={event.title} startTime={event.start_time} venue={event.venue_name} city={event.city_name} region={event.region_abbr} />
      );
    });
    return (
      <div className="eventList">
        {eventNodes}
      </div>
    );
  }
});

// root component
const EventBox = React.createClass({
  noResults: function() {
    console.log('no results');
  },

  handleQuerySubmit: function(query) {
    $.ajax({
      url: EventfulAPI +
        '&location=' + query.location +
        '&keywords=' + query.keywords,
      method: 'GET',
      dataType: 'jsonp',
      success: function(data) {
        if (!data.events) {
          this.noResults()
        } else {
          this.setState({data: data.events.event});
        }
      }.bind(this),
      error: function(err) {
        console.error(err);
      }.bind(this)
    })
  },

  getInitialState: function() {
    return {data: []};
  },

  render: function() {
    return (
      <div className="eventBox">
        <SearchBox onCommentSubmit={this.handleQuerySubmit} />
        <EventList data={this.state.data} />
      </div>
    )
  }
});

const App = React.createClass({
  render: function() {
    return (
      <div className="driverView">
        {this.props.children}
      </div>
    );
  }
});

const DriverView = React.createClass({
  render: function() {
    return (
      <div className="driverView">
        <h4>DriverView</h4>
      </div>
    );
  }
});

const RiderView = React.createClass({
  render: function() {
    return (
      <div className="riderView">
        <h4>RiderView</h4>
      </div>
    );
  }
});

// driver.js
// driver.js
// driver.js
// driver.js
// driver.js
// driver.js
// driver.js
// driver.js
// driver.js
// driver.js
const DriverBox = React.createClass({
  handleInfoSubmit: function(info) {
    $.ajax({
      url: '/api/trips',
      dataType: 'json',
      type: 'POST',
      data: info,
      success: function(data) {
        console.log('success');
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: info});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div className="driverForm">
        <DriverForm onInfoSubmit={this.handleInfoSubmit} />
      </div>
    )
  }
});

const DriverForm = React.createClass({
  getInitialState: function() {
    return {name: "", email: "", phone: "", startTime: "", startLocation: "", rate: ""};
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handlePhoneChange: function(e) {
    this.setState({phone: e.target.value});
  },
  handleStartTimeChange: function(e) {
    this.setState({startTime: e.target.value});
  },
  handleStartLocationChange: function(e) {
    this.setState({startLocation: e.target.value});
  },
  handleRateChange: function(e) {
    this.setState({rate: e.target.value});
  },
  handleSubmit: function(e) {
    console.log(EventData);
    e.preventDefault();
    var name = this.state.name.trim();
    var email = this.state.email.trim();
    var phone = this.state.phone.trim();
    var startTime = this.state.startTime.trim();
    var startLocation = this.state.startLocation.trim();
    var rate = this.state.rate.trim();
    if (!name || !email || !phone || !startTime || !startLocation || !rate ) {
      return;
    }
    this.props.onInfoSubmit({
      'event': EventData,
      "user": {
        "name": name,
        "email": email,
        "phone": phone,
      },
      "trip": {
        "price": 0.00,
        "lat": 90.00,
        "long": 90.00
      }
    });
    this.setState({name: '', email: '', phone: '', startTime: '', startLocation: '', rate: '' });
  },
  render: function() {
    return (
      <form className="driverForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
       <input
          type="text"
          placeholder="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <input
          type="text"
          placeholder="phone"
          value={this.state.phone}
          onChange={this.handlePhoneChange}
        />
        <input
          type="text"
          placeholder="startTime"
          value={this.state.startTime}
          onChange={this.handleStartTimeChange}
        />
        <input
          type="text"
          placeholder="startLocation"
          value={this.state.startLocation}
          onChange={this.handleStartLocationChange}
        />
        <input
          type="text"
          placeholder="rate"
          value={this.state.rate}
          onChange={this.handleRateChange}
        />
        <input type="submit" value="Confirm Driver" />
      </form>
    );
  }
});

// rider.js
// rider.js
// rider.js
// rider.js
// rider.js
// rider.js
// rider.js
// rider.js
// rider.js
// rider.js
const DriverInfo = React.createClass({
  render: function() {
    return (
      <div className="driver col-md-4">
        <h2 className="name">Name: {this.props.name}</h2>
        <div className="email">Email: {this.props.email}</div>
        <div className="phone">Phone: {this.props.phone}</div>
        <div className="price">Price: {this.props.price}</div>
        <div className="lat">Lat: {this.props.lat}</div>
        <div className="long">Long: {this.props.long}</div>
      </div>
    );
  }
});

const DriversList = React.createClass({
  componentDidMount: function() {
    // console.log('DriversList, componentDidMount');
  },

  getInitialState: function() {
    // console.log('DriversList getInitialState:');
    return {data: []};
  },

  render: function() {
    var driverNodes = this.props.data.map(function(driver) {
      // console.log(driver);
      return (
          <DriverInfo name={driver.name}
                      email={driver.email}
                      phone={driver.phone}
                      price={driver.price}
                      lat={driver.lat}
                      long={driver.long} />
      );
    });
    return (
      <div className="row driver-list">
        {driverNodes}
      </div>
    );
  }
});

const GetDriversData = React.createClass({
  componentDidMount: function() {
    // console.log('GetDriversData, componentDidMount');
    this.getDrivers();
  },

  getDrivers: function() {
    $.ajax({
      url: '/api/trips',
      method: 'GET',
      dataType: 'json',
      data: {
        eventfulId: 'SpecialEventId'
      },
      success: function(data) {
        if (!data.trips) {
          this.noResults();
        } else {
          // this.setState({data: data.trips});
          // console.log('data trips:', this.state);
        }
      }.bind(this),
      error: function(err) {
        console.error('error:', err);
      }.bind(this)
    })
  },

  getInitialState: function() {
    return {data: []};
  },

  render: function() {
    return (
      <DriversList data={this.state.data} />
    );
  }
});

ReactDOM.render(
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={EventBox}/>
      <Route path='/driver' component={DriverBox}/>
      <Route path='/rider' component={DriverInfo}/>
    </Route>
  </Router>,
  document.getElementById('content')
);
