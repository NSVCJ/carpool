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
      <form className="rider-request-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="startLocation"
          value={this.state.startLocation}
          onChange={this.handleStartLocationChange}
        />
        <input type="submit" value="Request Driver" />
      </form>
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
