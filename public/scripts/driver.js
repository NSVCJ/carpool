import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

export const DriverBox = React.createClass({
  handleInfoSubmit: function(info) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "/api/trips",
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "a05c261a-a74a-2847-e688-4984ee243fb1"
      },
      "processData": false,
      "data": info
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    // console.log('driver.js', EventDataCache);
    return (
      <div>
        <EventInfo data={EventDataCache} />
        <DriverForm onInfoSubmit={this.handleInfoSubmit} />
      </div>
    )
  }
});

export const EventInfo = React.createClass({
  // componentDidMount: function() {
  //   this.props = EventDataCache;
  // },
  render: function() {
    return (
      <div className="event-info container">
        <div className="event-image-display">
          <img src={this.props.data.image.medium.url} alt="" />
        </div>
        <div className="event-info-description">
          <h3>{this.props.data.title}</h3>
          <p>
            {moment(this.props.data.start_time, 'YYYY-MM-DD, HH:mm:ss a').format('MMMM Do YYYY, h:mm a')}<br />
            {this.props.data.venue_name}<br />
            {this.props.data.venue_address}, {this.props.data.region_abbr}
          </p>
        </div>
      </div>
    );
  }
});

export const DriverForm = React.createClass({
  getInitialState: function() {
    return {name: "", email: "", phone: "", startTime: "", startLocation: "", rate: ""};
  },
  componentDidMount: function() {
    var thiz = this;
    var input = document.getElementById('location');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      thiz.setState({startLocation: place.formatted_address});
      console.log(place);
    });
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
    this.props.onInfoSubmit(JSON.stringify({
      "event": {
        "id": EventDataCache.id
      },
      "user": {
        "name": name,
        "email": email,
        "phone": phone
      },
      "trip": {
        "price": rate,
        "startLocation": startLocation,
      }
    }));
    this.setState({name: '', email: '', phone: '', startTime: '', startLocation: '', rate: '' });
  },
  render: function() {
    return (
      <form className="driver-form form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="control-label col-sm-2">Name</label>
          <div className="col-sm-7">
            <input
              className="form-control"
              type="text"
              placeholder="name"
              value={this.state.name}
              onChange={this.handleNameChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Email</label>
          <div className="col-sm-7">
            <input
              className="form-control"
              type="text"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleEmailChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Phone</label>
          <div className="col-sm-7">
            <input
              className="form-control"
              type="text"
              placeholder="phone"
              value={this.state.phone}
              onChange={this.handlePhoneChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Departure Time</label>
          <div className="col-sm-7">
            <input
              className="form-control"
              type="text"
              placeholder="startTime"
              value={this.state.startTime}
              onChange={this.handleStartTimeChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Start Location</label>
          <div className="col-sm-7">
            <input
              className="form-control"
              size="100"
              id="location"
              type="text"
              placeholder="startLocation"
              value={this.state.startLocation}
              onChange={this.handleStartLocationChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Rate</label>
          <div className="col-sm-7">
            <input
              className="form-control"
              type="text"
              placeholder="rate"
              value={this.state.rate}
              onChange={this.handleRateChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-7">
            <input className="btn btn-success" type="submit" value="Confirm Driver" />
          </div>
        </div>
      </form>
    );
  }
});
