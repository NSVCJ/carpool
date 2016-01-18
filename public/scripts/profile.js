import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

var user = {
  "id": 1,
  "name": "Barack Obama",
  "email": "bo@gmail.com",
  "phone": "1-800-555-5555",
  "profilePicture": null,
  "rating": null,
  "ratingsCount": null,
  "createdAt": "2016-01-13T21:15:07.000Z",
  "updatedAt": "2016-01-13T21:15:07.000Z",
  "startLocation": "123 Main St. 12244"
}

var test = {
  "trips": [
    { "eventfulId": "E0-001-086400548-2",
      "startLocation": "1542 Harper Ave, Redondo Beach, CA",
      "startTime": "2016-01-13T21:15:07.000Z",
      "users": [
        {
          "id": 1,
          "name": "Barack Obama",
          "email": "bo@gmail.com",
          "phone": "1-800-555-5555",
          "profilePicture": null,
          "rating": 1,
          "ratingsCount": null,
          "createdAt": "2016-01-13T21:15:07.000Z",
          "updatedAt": "2016-01-13T21:15:07.000Z",
          "startLocation": "123 Main St. 12244",
          "role": "Driver"
        },
        {
          "id": 2,
          "name": "Bill Gates",
          "email": "bg@gmail.com",
          "phone": "1-800-555-5555",
          "profilePicture": null,
          "rating": 1,
          "ratingsCount": null,
          "createdAt": "2016-01-13T21:15:07.000Z",
          "updatedAt": "2016-01-13T21:15:07.000Z",
          "startLocation": "123 Main St. 12244",
          "role": "Passenger"
        },
        {
          "id": 3,
          "name": "Oprah Winfrey",
          "email": "bg@gmail.com",
          "phone": "1-800-555-5555",
          "profilePicture": null,
          "rating": 0,
          "ratingsCount": null,
          "createdAt": "2016-01-13T21:15:07.000Z",
          "updatedAt": "2016-01-13T21:15:07.000Z",
          "startLocation": "123 Main St. 12244",
          "role": "Unconfirmed"
        },
        {
          "id": 4,
          "name": "Tom Cruise",
          "email": "bg@gmail.com",
          "phone": "1-800-555-5555",
          "profilePicture": null,
          "rating": 0,
          "ratingsCount": null,
          "createdAt": "2016-01-13T21:15:07.000Z",
          "updatedAt": "2016-01-13T21:15:07.000Z",
          "startLocation": "123 Main St. 12244",
          "role": "Passenger"
        }
      ]
    },
    { "eventfulId": "E0-001-086400371-2",
      "startLocation": "1542 Harper Ave, Redondo Beach, CA",
      "startTime": "2016-01-13T21:15:07.000Z",
      "users": [
        {
          "id": 1,
          "name": "Barack Obama",
          "email": "bo@gmail.com",
          "phone": "1-800-555-5555",
          "profilePicture": null,
          "rating": null,
          "ratingsCount": null,
          "createdAt": "2016-01-13T21:15:07.000Z",
          "updatedAt": "2016-01-13T21:15:07.000Z",
          "startLocation": "123 Main St. 12244",
          "role": "Driver"
        },
        {
          "id": 2,
          "name": "Gates Bill",
          "email": "bg@gmail.com",
          "phone": "1-800-555-5555",
          "profilePicture": null,
          "rating": null,
          "ratingsCount": null,
          "createdAt": "2016-01-13T21:15:07.000Z",
          "updatedAt": "2016-01-13T21:15:07.000Z",
          "startLocation": "123 Main St. 12244",
          "role": "Passenger"
        }
      ]
    },
    { "eventfulId": "E0-001-086400371-2",
      "startLocation": "1542 Harper Ave, Redondo Beach, CA",
      "startTime": "2016-01-13T21:15:07.000Z",
      "users": [
        {
          "id": 1,
          "name": "Barack Obama",
          "email": "bo@gmail.com",
          "phone": "1-800-555-5555",
          "profilePicture": null,
          "rating": null,
          "ratingsCount": null,
          "createdAt": "2016-01-13T21:15:07.000Z",
          "updatedAt": "2016-01-13T21:15:07.000Z",
          "startLocation": "123 Main St. 12244",
          "role": "Passenger"
        },
        {
          "id": 2,
          "name": "Gates Bill",
          "email": "bg@gmail.com",
          "phone": "1-800-555-5555",
          "profilePicture": null,
          "rating": null,
          "ratingsCount": null,
          "createdAt": "2016-01-13T21:15:07.000Z",
          "updatedAt": "2016-01-13T21:15:07.000Z",
          "startLocation": "123 Main St. 12244",
          "role": "Driver"
        }
      ]
    }
  ]
}

export const Profile = React.createClass({
  componentWillMount: function () {
    this.setState({data: test})
  },
  render: function () {
    return (
      <div className="profile-container">
        <div className="row">
          <div className="col-md-3">
            <UserInfo data={user} />
          </div>
          <div className="col-md-9">
            <DriverBox data={test} />
            <RiderBox data={test} />
          </div>
        </div>
      </div>
    )
  }
})

//Get this from localStorage
export const UserInfo = React.createClass({
  render: function () {
    return (
      <div className="profile-content">
        <h3>{this.props.data.name}</h3>
        <img src="../images/iu1f7brY.png" className="img-circle" />
      </div>
    )
  }
})

// Plug in own props instead of test.trips
export const DriverBox = React.createClass({
  getInitialState: function() {
    return {
      trips: []
    };
  },

  componentWillMount: function() {
    $.ajax({
      url: '/api/driverProfile?UserId=' + localStorage.id,
      method: 'GET',
      dataType: 'jsonp',
      success: function(data) {
        console.log("OMG it works", data)
        data = JSON.parse(data)
        this.setState({
          trips: data.trips
        })
      }.bind(this),
      error: function(err) {
        // console.log("Now there's a problem");
        var data =JSON.parse(err.responseText)
        // console.log("What is the state", data.trips)
        this.setState({
          trips: data.trips
        });
        console.error(err);
      }.bind(this)
    })
  },

  render: function () {
    return (
      <div className="drives-content">
        <h3>Drives</h3>
        <DriverTrips trips={this.state.trips} />
      </div>
    )
  }
})

//Do ajax call before component mounts
export const DriverTrips = React.createClass({

  render: function () {
    // console.log("Now I'm rendering");
    // console.log("Do we have a state?", this.props.trips);
    if (this.props.trips) {
      var trips = this.props.trips.map(function (trip) {
        for (var i = 0; i < trip.users.length; i++) {
          return (
            <TripAsDriver key={trip.eventfulId} data={trip} eventfulId={trip.eventfulId} />
          )
        }
      })
      return (
        <div className="trips-content">
        {trips}
        </div>
      )
    } else {
      return (
        <div className="trips-content">
        It broked.
        </div>
      )
    }
  }
})

export const TripAsDriver = React.createClass({
  getInitialState: function() {
    return {
      eventful: null
    };
  },
  componentWillMount: function () {
    $.ajax({
      url: 'http://api.eventful.com/json/events/get?app_key=bMhbgh3kzp8mTZtC&id=' + this.props.eventfulId,
      method: 'GET',
      dataType: 'jsonp',
      success: function(data) {
        this.setState({
          eventful: data
        })
      }.bind(this),
      error: function(err) {
        console.error(err);
      }.bind(this)
    })
  },
  render: function () {
    if (!this.state.eventful) { var title = null } else { var title = this.state.eventful.title }
    if (!this.state.eventful) { var start_time = null } else { var start_time = this.state.eventful.start_time }
    if (!this.state.eventful) { var venue_name = null } else { var venue_name = this.state.eventful.venue_name }
    if (!this.state.eventful) { var city = null } else { var city = this.state.eventful.city }
    if (!this.state.eventful) { var region_abbr = null } else { var region_abbr = this.state.eventful.region_abbr }
    return (
      <div className="trip">
        <h4>{title}</h4>
        <p>{start_time}, {venue_name}, {city}, {region_abbr}<br/>
          Departure Time: {this.props.data.startTime}</p>
        <TripAsDriverList users={this.props.data.users} />
      </div>
    )
  }
})

export const TripAsDriverList = React.createClass({
  render: function () {
    var users = this.props.users.map(function (user) {
      return (
        <User key={user.id} data={user} />
      )
    })
    return (
      <ul className="passenger-content">
        {users}
      </ul>
    )
  }
})

export const User = React.createClass({
  getInitialState: function () {
    return {
      status: this.props.data.role
    };
  },
  toggleStatus: function () {
    if (this.state.status === 'Unconfirmed') {
      // $.ajax({
      //   url: EventfulAPI +
      //     '&location=' + query.location +
      //     '&keywords=' + query.keywords,
      //   method: 'GET',
      //   dataType: 'jsonp',
      //   success: function(data) {
      //     if (!data.events) {
      //       this.noResults()
      //     } else {
      //       this.setState({data: data.events.event});
      //     }
      //   }.bind(this),
      //   error: function(err) {
      //     console.error(err);
      //   }.bind(this)
      // })
      this.setState({status: 'Passenger'})
    }
    if (this.state.status === 'Passenger') {
      // $.ajax({
      //   url: EventfulAPI +
      //     '&location=' + query.location +
      //     '&keywords=' + query.keywords,
      //   method: 'GET',
      //   dataType: 'jsonp',
      //   success: function(data) {
      //     if (!data.events) {
      //       this.noResults()
      //     } else {
      //       this.setState({data: data.events.event});
      //     }
      //   }.bind(this),
      //   error: function(err) {
      //     console.error(err);
      //   }.bind(this)
      // })
      this.setState({status: 'Unconfirmed'})
    }
  },
  render: function () {
    if (this.props.data.role === 'Unconfirmed') {
      return (
        <li>
          <div className="row">
            <div className="col-md-6">
              {this.props.data.name}
            </div>
            <div className="col-md-6">
              <span onClick={this.toggleStatus}>
                <input className="btn" type="submit" value={this.state.status} />
              </span>
            </div>
          </div>
        </li>
      )
    }
    if (this.props.data.role === 'Passenger') {
      return (
        <li>
          <span>
            {this.props.data.name}
            <span onClick={this.toggleStatus}>
              <input className="btn" type="submit" value={this.state.status} />
            </span>
          </span>
        </li>
      )
    }
    return (
      <div>
      </div>
    )
  }
})

export const RiderBox = React.createClass({
  getInitialState: function() {
    return {
      confirmed: [],
      unconfirmed: []
    };
  },

  componentWillMount: function() {
    $.ajax({
      url: '/api/riderProfile?UserId=' + localStorage.id,
      method: 'GET',
      dataType: 'jsonp',
      success: function(data) {
        console.log("OMG it works", data)
        data = JSON.parse(data)
        this.setState({
          confirmed: data.confirmed,
          unconfirmed: data.unconfirmed
        })
      }.bind(this),
      error: function(err) {
        console.log("Now there's a problem");
        var data =JSON.parse(err.responseText)
        console.log("What is the state", data)
        this.setState({
          confirmed: data.confirmed,
          unconfirmed: data.unconfirmed
        });
        console.error(err);
      }.bind(this)
    })
  },

  render: function () {
    return (
      <div className="rides-content">
        <h3>Rides</h3>
        <RiderTrips trips={this.state.confirmed} />
        <RiderTrips trips={this.state.unconfirmed} />
      </div>
    )
  }
})

export const RiderTrips = React.createClass({
  render: function () {
     var trips = this.props.trips.map(function (trip) {
       return (
         <TripAsRider key={trip.TripId} data={trip} eventfulId={trip.eventfulId} />
       )
     })
    return (
      <div>
        {trips}
      </div>
    )
  }
})

export const TripAsRider = React.createClass({
  getInitialState: function() {
    return {
      eventful: null
    };
  },
  componentWillMount: function () {
    $.ajax({
      url: 'http://api.eventful.com/json/events/get?app_key=bMhbgh3kzp8mTZtC&id=' + this.props.eventfulId,
      method: 'GET',
      dataType: 'jsonp',
      success: function(data) {
        this.setState({
          eventful: data
        })
      }.bind(this),
      error: function(err) {
        console.error(err);
      }.bind(this)
    })
  },
  render: function () {
    if (!this.state.eventful) { var title = null } else { var title = this.state.eventful.title }
    if (!this.state.eventful) { var start_time = null } else { var start_time = this.state.eventful.start_time }
    if (!this.state.eventful) { var venue_name = null } else { var venue_name = this.state.eventful.venue_name }
    if (!this.state.eventful) { var city = null } else { var city = this.state.eventful.city }
    if (!this.state.eventful) { var region_abbr = null } else { var region_abbr = this.state.eventful.region_abbr }
    return (
      <div className="trip">
        <h4>{title}</h4>
        <p>{moment(start_time, 'YYYY-MM-DD, HH:mm:ss a').format('MMMM Do YYYY, h:mm a')}, {venue_name}, {city}, {region_abbr}<br/>
          Departure Time: {moment(this.props.data.startTime, 'YYYY-MM-DD, HH:mm:ss a').format('MMMM Do YYYY, h:mm a')}</p>
        <TripAsRiderList users={this.props.data} />
      </div>
    )
  }
})

export const TripAsRiderList = React.createClass({
  render: function () {
    console.log("Show me the props", this.props);
    var riderBlock;
    if (this.props.users.role === "Unconfirmed") {
      riderBlock = <UnconfirmedRider key={this.props.users.Tripid} data={this.props.users}/>
    } else if (this.props.users.role === "Rider") {
      riderBlock = <ConfirmedRider key={this.props.users.Tripid} data={this.props.users} />
    }
    return (
      <ul className="passenger-content list-unstyled">
        {riderBlock}
      </ul>
    )
  }
})

export const ConfirmedRider = React.createClass({
  render: function() {
    return (
      <ul>
        <li>
          <p>
            You are confirmed to ride!
          </p>
        </li>
        <li>
          <p>
            Pickup Location: {this.props.data.pickupLocation}
          </p>
        </li>
        <li>
          <p>
            Driver: {this.props.data.driverName}
          </p>
        </li>
        <li>
          <p>
            Contact Info
          </p>
          <ul>
            <li> {this.props.data.driverEmail} </li>
            <li> {this.props.data.driverPhone} </li>
          </ul>
        </li>
      </ul>
    )
  }
})

export const UnconfirmedRider = React.createClass({
  render: function() {
    return (
      <ul>
        <li>
          <p>
            You are not confirmed to ride yet.
          </p>
        </li>
        <li>
          <p>
            Driver: {this.props.data.driverName}
          </p>
        </li>
      </ul>
    )
  }
})
