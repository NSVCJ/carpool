import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

export const DriversList = React.createClass({
  componentWillMount: function() {
    this.getTripData();
  },

  getInitialState: function() {
    return {
      data: [],
      EventDataCache: EventDataCache
    };
  },

  getTripData: function() {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "/api/eventRider?eventfulId=" + this.state.EventDataCache.id,
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
          <p>It looks like there are no trips to this event yet.</p>
          <Link to="/driver">Drive to this event!</Link>
        </div>
      )
    }
    var driverNodes = this.state.data.map(function(driver) {
      return (
          <DriverInfo
                      key={driver.TripId}
                      id={driver.TripId}
                      email={driver.email}
                      phone={driver.phone}
                      price={driver.price}
                      name={driver.driver}
                      startLocation={driver.startLocation} />
      );
    });
    return (
      <div className="row driver-list">
        <div className="event-info container">
          <p>Event Details</p>
          <div className="event-image-display">
            <img src={this.state.EventDataCache.image.medium.url} alt="" />
          </div>
          <div className="event-info-description">
            <h3>{this.state.EventDataCache.title}</h3>
            <p>
              {moment(this.state.EventDataCache.start_time, 'YYYY-MM-DD, HH:mm:ss a').format('MMMM Do YYYY, h:mm a')}<br />
              {this.state.EventDataCache.venue_name}<br />
              {this.state.EventDataCache.venue_address} {this.state.EventDataCache.city_name}, {this.state.EventDataCache.region_abbr}
            </p>
          </div>
        </div>
        <h4>Rides to this event</h4>
        {driverNodes}
      </div>
    );
  }
});

export const DriverInfo = React.createClass({
  getInitialState: function() {
    return {pickupLocation: ''};
  },
  componentDidMount: function () {
    var thiz = this;
    var input = document.getElementById('pickupLocation');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      thiz.setState({pickupLocation: place.formatted_address});
    });
  },
  requestRide: function() {
    console.log(JSON.stringify({
      "user": {
        "id": localStorage.id
      },
      "trip": {
        "TripId": this.props.id
      },
      "startLocation": this.state.pickupLocation
    }));
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "/api/eventRider",
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "12a26ba3-d72a-0da8-0962-d7de77f897f3"
      },
      "processData": false,
      "data": JSON.stringify({
        "user": {
          "id": localStorage.id
        },
        "trip": {
          "TripId": this.props.id
        },
        "startLocation": this.state.pickupLocation
      }),
      success: function(data) {
        console.log('request ride successful');
      }.bind(this),
      error: function(err) {
        console.log("error")
        console.error(err);
      }.bind(this)
    });
  },

  handlePickupLocationChange: function (e) {
    this.setState({pickupLocation: e.target.value});
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var pickupLocation = this.state.pickupLocation;
    if (!pickupLocation) {
      return;
    } else {
      this.requestRide();
    }
  },

  render: function() {
    return (
      <div className="driver col-md-4">
        <p>Driver Details</p>
        <h4 className="name">{this.props.name}</h4>
        <div className="rating">Rating {this.props.rating}</div>
        <div className="profilePicture"><img src="../images/iu1f7brY.png" /></div>
        <div className="price">Flat Fare ${this.props.price}</div>
        <div className="startLocation">Departing From {this.props.startLocation}</div>

        <form className="search-box form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                className="form-control"
                id="pickupLocation"
                type="text"
                placeholder="Pickup Location"
                onChange={this.handlePickupLocationChange}
                value={this.state.pickupLocation} />
            </div>
          </div>
          <input className="btn btn-success" type="submit" value="Request to Join Ride" />
        </form>

      </div>
    );
  }
});
