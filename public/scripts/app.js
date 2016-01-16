import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import { DriverBox, DriverForm, EventInfo } from './driver';
import { DriverInfo, DriversList, GetDriversData } from './rider';
import { EventfulAPIKey } from './config';
import { Profile } from './profile';
import { RiderForm, RiderBox } from './request';
import { SignInForm, SignInBox } from './signin';
import { SignUpForm, SignUpBox } from './profile';

var EventfulAPI = 'http://api.eventful.com/json/events/search?app_key=' + EventfulAPIKey;

const Event = React.createClass({
  cacheEventData: function() {
    EventDataCache = this.props.data;
  },
  render: function() {
    return (
      <div>
        <nav class="navbar navbar-inverse">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">Free Loader</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
              <ul class="nav navbar-nav navbar-right">
                <li><a href="#">Sign Up</a></li>
                <li><a href="#">Log In</a></li>
                <li><Link to="/profile">Profile</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="event">
          <h3>{this.props.name}</h3>
          <h4>{this.props.startTime}, {this.props.venue}, {this.props.city}, {this.props.region}</h4>
          <h4>
            <span>
              <Link to="/driver" onClick={this.cacheEventData}>Driver</Link>
              <br />
              <Link to="/rider" onClick={this.cacheEventData}>Rider</Link>
            </span>
          </h4>
        </div>
      </div>
    )
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
      <form className="search-box form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="control-label col-sm-3">Location (city/zip code)</label>
          <div className="col-sm-9">
            <input
              className="form-control"
              type="text"
              placeholder="Location"
              value={this.state.location}
              onChange={this.handleLocationChange}
              autoFocus />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3">Event</label>
          <div className="col-sm-9">
            <input
              className="form-control"
              type="text"
              placeholder="Event"
              value={this.state.keywords}
              onChange={this.handleKeywordsChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <input className="btn btn-primary" type="submit" value="Search" />
          </div>
        </div>
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
        <Event data={event} key={event.id} name={event.title} startTime={event.start_time} venue={event.venue_name} city={event.city_name} region={event.region_abbr} />
      );
    });
    return (
      <div className="event-list">
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
      <div className="event-box">
        <SearchBox onCommentSubmit={this.handleQuerySubmit} />
        <EventList data={this.state.data} />
      </div>
    )
  }
});

const App = React.createClass({
  render: function() {
    return (
      <div className="event-view">
        {this.props.children}
      </div>
    );
  }
});

const DriverView = React.createClass({
  render: function() {
    return (
      <div className="driver-view">
        <h4>DriverView</h4>
      </div>
    );
  }
});

const RiderView = React.createClass({
  render: function() {
    return (
      <div className="rider-view">
        <h4>RiderView</h4>
      </div>
    );
  }
});

ReactDOM.render(
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={EventBox}/>
      <Route path='/driver' component={DriverBox}/>
      <Route path='/rider' component={DriverInfo}/>
      <Route path='/profile' component={Profile}/>
    </Route>
  </Router>,
  document.getElementById('content')
);
