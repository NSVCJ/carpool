import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import { DriverForm, DriverBox } from './driver'
import { DriverInfo, DriversList, GetDriversData } from './rider'

var EventfulAPIKey = 'bMhbgh3kzp8mTZtC'
var EventfulAPI = 'http://api.eventful.com/json/events/search?app_key=' + EventfulAPIKey

const Event = React.createClass({
  render: function() {
    return (
      <div className="event">
        <h3>{this.props.name}</h3>
        <h4>{this.props.startTime}, {this.props.venue}, {this.props.city}, {this.props.region}</h4>
        <h4><Link to="/driver">Driver</Link> <Link to="/rider">Rider</Link></h4>
      </div>
    );
  }
});

const SearchBox = React.createClass({
  getInitialState: function() {
    return {location: '', keywords: ''};
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

ReactDOM.render(
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='/driver' component={EventBox}/>
      <Route path='/rider' component={Statements}/>
    </Route>
  </Router>,
  document.getElementById('content')
);
