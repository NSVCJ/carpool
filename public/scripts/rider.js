import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

export const DriversList = React.createClass({
  componentDidMount: function() {
    this.getTripData();
  },

  getInitialState: function() {
    return {data: []};
  },

  getTripData: function() {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:8000/api/eventRider?eventfulId=" + EventDataCache.id,
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "12a26ba3-d72a-0da8-0962-d7de77f897f3"
      },
      success: function(data) {
        if (!data.trips) {
          this.setState({message: "There are no trips to this event yet. Drive to this event!"})
        } else {
          this.setState({data: data.trips})
        }

      }.bind(this),
      error: function(err) {
        console.log("error")
        console.error(err);
      }.bind(this)
    });
  },

  render: function() {
    if (this.state.data.length === 0) {
      return (
        <div>
          <p>There are no trips to this event yet.</p>
          <Link to="/driver">Drive to this event!</Link>
        </div>
      )
    }
    var driverNodes = this.state.data.map(function(driver) {
      return (
          <DriverInfo
                      key={driver.TripId}
                      email={driver.email}
                      phone={driver.phone}
                      price={driver.price}
                      name={driver.driver}
                      startLocation={driver.startLocation} />
      );
    });
    return (
      <div className="row driver-list">
        {driverNodes}
      </div>
    );
  }
});

export const DriverInfo = React.createClass({
  requestRide: function() {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:8000/api/eventDriver",
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "12a26ba3-d72a-0da8-0962-d7de77f897f3"
      },
      "processData": false,
      "data": info,
      success: function(data) {

      }.bind(this),
      error: function(err) {
        console.log("error")
        console.error(err);
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="driver col-md-4">
        <h2 className="name">Name: {this.props.name}</h2>
        <div className="profilePicture"><img src="public/images/iu1f7brY.png" /></div>
        <div className="price">Price: {this.props.price}</div>
        <div className="startLocation">Lat: {this.props.startLocation}</div>
        <div className="rating">Long: {this.props.rating}</div>
        <input className="btn btn-success" type="submit" value="Request to Join Ride" onClick={this.requestRide} />
      </div>
    );
  }
});
