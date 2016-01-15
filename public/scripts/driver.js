
//**Display of chosen event

export const DriverForm = React.createClass({
  getInitialState: function() {
    return {name: "", email: "", phone: "", startTime: "", startLocation: "", rate: ""};
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
    this.props.onCommentSubmit({name: name, email: email, phone: phone, startTime: startTime, startLocation: startLocation, rate: rate});
    this.setState({name: '', email: '', phone: '', startTime: '', startLocation: '', rate: '' });
  },
  render: function() {
    return (
      <form className="driverForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
       <br />
       <input
          type="text"
          placeholder="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <input
          type="text"
          placeholder="phone"
          value={this.state.phone}
          onChange={this.handlePhoneChange}
        />
        <input
          type="text"
          placeholder="startTime"
          value={this.state.startTime}
          onChange={this.handleStartTimeChange}
        />
        <input
          type="text"
          placeholder="startLocation"
          value={this.state.startLocation}
          onChange={this.handleStartLocationChange}
        />

        <input
          type="text"
          placeholder="rate"
          value={this.state.rate}
          onChange={this.handleRateChange}
        />
        <input type="submit" value="Confirm Driver" />
      </form>
    );
  }
});
//**Event List
export const EventList = React.createClass({
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
export const DriverBox = React.createClass({
  noResults: function() {
    console.log('no results');
  },
  handleQuerySubmit: function(query) {
    $.ajax({
      url: EventfulAPI +
        '&name=' + query.name +
        '&name=' + query.email +
        '&name=' + query.phone +
        '&name=' + query.startTime +
        '&name=' + query.startLocation +
        '&rate=' + query.rate,
      method: 'POST',
      dataType: 'jsonp',
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
      <div className="driverForm">
        <DriverForm onCommentSubmit={this.handleQuerySubmit} />
        <EventList data={this.state.data} />
      </div>
    )
  }
});
//form data
// <DriverForm onCommentSubmit={this.handleQuerySubmit} />
//**event data passed in
// <EventList data={this.state.data} />
ReactDOM.render(
  <DriverBox />,
  //<EventBox />,
  document.getElementById('content')
);
