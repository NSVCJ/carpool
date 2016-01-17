import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

export const RiderForm = React.createClass({
  getInitialState: function() {
    return {startLocation: ""};
  },
  handleStartLocationChange: function(e) {
    this.setState({startLocation: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var startLocation = this.state.startLocation.trim();
    if (!startLocation) {
      return;
    }
    this.props.onCommentSubmit({startLocation: startLocation});
    this.setState({startLocation: ''});
  },
  render: function() {
    return (
      <div className="row">
        <div className="container">
          <form className="rider-request-form form-signin" onSubmit={this.handleSubmit}>
            <h2>Request a Driver</h2>
            <label className="sr-only">Start Location</label>
            <input
              type="text"
              placeholder="Start Location"
              value={this.state.startLocation}
              onChange={this.handleStartLocationChange}
              className="form-control"
              autofocus />
            <input className="btn-lg btn-primary btn-block" type="submit" value="Request Driver" />
          </form>
        </div>
      </div>
    );
  }
});

export const RiderBox = React.createClass({
  noResults: function() {
    console.log('no results');
  },
  handleQuerySubmit: function(query) {
    $.ajax({
      url: EventfulAPI +
        '&name=' + query.startLocation,
      method: 'POST',
      dataType: 'jsonp',
      data: {
        location: query.startLocation
      },
      success: function(data) {
        this.setState({data: data.events.event});
        console.log("posted successfully")
      }.bind(this),
      error: function(err) {
        console.log("error")
        console.error(err);
      }.bind(this)
    })
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div className="rider-request-container">
        <RiderForm onCommentSubmit={this.handleQuerySubmit} />
      </div>
    )
  }
});
