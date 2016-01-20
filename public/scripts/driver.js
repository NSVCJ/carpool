import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import { GoogleAPIKey } from './config';

export const DriverBox = React.createClass({
  handleInfoSubmit: function(info) {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "/api/eventDriver",
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "12a26ba3-d72a-0da8-0962-d7de77f897f3"
      },
      "processData": false,
      "data": info,
      success: function(data) {
        $("#driver-form").html('<h3>Your trip has been submitted!<h3>');
        console.log('trip submitted.');
        console.log(data);
      }.bind(this),
      error: function(err) {
        console.log("error")
        console.error(err);
      }.bind(this)
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
  render: function() {
    return (
      <div className="event-info">
        <h3>Event Details</h3>
        <div className="event-image-display col-md-2">
          <img src={this.props.data.image.medium.url} alt="" />
        </div>
        <div className="event-info-description col-md-10">
          <div className="event-title">{this.props.data.title}</div>
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
      var directionsService = new google.maps.DirectionsService();
      var directionsRequest = {
        origin: place.formatted_address,
        destination: EventDataCache.venue_address,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      };
      directionsService.route(
        directionsRequest,
        function(response, status)
        {
          if (status == google.maps.DirectionsStatus.OK) {
            $('#travel-time').html('<p>Estimated travel time is ' + response.routes[0].legs[0].duration.text + '</p>');
          }
          else {
            console.log('error');
          }
        }
      );
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
    // removed check for unused fields - startTime not being handled on db-side
    if ( !startLocation || !rate ) {
      return;
    }
    this.props.onInfoSubmit(JSON.stringify({
      "event": {
        "id": EventDataCache.id
      },
      "user": {
        "id": localStorage.id
      },
      "trip": {
        "price": rate,
        "startLocation": startLocation
      }
    }));
    this.setState({name: '', email: '', phone: '', startTime: '', startLocation: '', rate: '' });
  },
  render: function() {
    return (
      <div className="row">
        <div id="travel-time"></div>
        <div id="driver-form "className="container">
          <form className="driver-form form-signin" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="">
                <label className="sr-only">Start Time</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Start Time"
                  value={this.state.startTime}
                  onChange={this.handleStartTimeChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="">
                <label className="sr-only">Start Location</label>
                <input
                  className="form-control"
                  size="100"
                  id="location"
                  type="text"
                  placeholder="Start Location"
                  value={this.state.startLocation}
                  onChange={this.handleStartLocationChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="">
                <label className="sr-only">Rate</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Rate"
                  value={this.state.rate}
                  onChange={this.handleRateChange} />
              </div>
            </div>
            <div className="form-group col-sm-12">
              <div className="col-sm-12">
                <Link to="/profile"><input className="btn btn-success btn-block" type="submit" value="Confirm Trip" /></Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
});
