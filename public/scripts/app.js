import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import { DriverBox, DriverForm, EventInfo } from './driver';
import { DriverInfo, DriversList, GetDriversData } from './rider';
import { Profile } from './profile';
import { RiderForm, RiderBox } from './request';
import { SignInForm, SignInBox } from './signin';
import { SignUpForm, SignUpBox } from './signup';
import { EventfulAPIKey } from './config';

var EventfulAPI = 'http://api.eventful.com/json/events/search?app_key=' + EventfulAPIKey;

const App = React.createClass({
  logout: function() {
    delete localStorage.id;
    delete localStorage.name;
    delete localStorage.email;
    delete localStorage.phone;
    delete localStorage.token;
  },
  render: function() {
    // LOGGED OUT VIEW
    if (!localStorage.token) {
      return (
        <div>
          <nav className="navbar navbar-inverse">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <div className="logo">
                  <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=logo&w=50&h=50" />
                </div>
                <a className="navbar-brand" href="#">EventPool</a>
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li><Link to="/signin">Sign In</Link></li>
                  <li><Link to="/signup">Sign Up</Link></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="event-view">
            {this.props.children}
          </div>
        </div>
      );
    }
    // LOGGED IN VIEW
    if (localStorage.token) {
      return (
        <div>
          <nav className="navbar navbar-inverse">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <div className="logo">
                  <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=logo&w=50&h=50" />
                </div>
                <a className="navbar-brand" href="#">EventPool</a>
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li><Link to="/profile">My Trips</Link></li>
                  <li><Link to="/" onClick={this.logout}>Sign Out</Link></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="event-view">
            {this.props.children}
          </div>
        </div>
      )
    }
  }
});

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
      <div>
        <div className="jumbotron">
          <div className="container"></div>
        </div>
        <div className="event-box">
          <div className="row">
            <div className="col-md-5">
              <h2>Make friends going to the same event.</h2>
            </div>
            <div className="col-md-6 col-md-offset-1">
              <SearchBox onCommentSubmit={this.handleQuerySubmit} />
            </div>
          </div>
          <EventList data={this.state.data} />
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
          <div className="col-sm-12">
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
          <div className="col-sm-12">
            <input
              className="form-control"
              type="text"
              placeholder="Event"
              value={this.state.keywords}
              onChange={this.handleKeywordsChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <input className="btn-lg btn-primary" type="submit" value="Search" />
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

const Event = React.createClass({
  cacheEventData: function() {
    EventDataCache = this.props.data;
  },
  render: function() {
    return (
      <div className="event">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h3>{this.props.name}</h3>
              <h4>{moment(this.props.startTime, 'YYYY-MM-DD, HH:mm:ss a').format('MMMM Do YYYY, h:mm a')}, {this.props.venue}, {this.props.city}, {this.props.region}</h4>
            </div>
            <div className="event-btns col-md-3">
                <Link to="/driver" className="driver-btn btn-lg btn-success" onClick={this.cacheEventData}>Driver</Link>
                <Link to="/rider"  className="rider-btn btn-lg btn-info" onClick={this.cacheEventData}>Rider</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

ReactDOM.render(
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={EventBox}/>
      <Route path='/driver' component={DriverBox}/>
      <Route path='/rider' component={DriversList}/>
      <Route path='/profile' component={Profile}/>
      <Route path='/request' component={RiderBox}/>
      <Route path='/signin' component={SignInBox}/>
      <Route path='/signup' component={SignUpBox}/>
    </Route>
  </Router>,
  document.getElementById('content')
);
