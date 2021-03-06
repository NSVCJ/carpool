var EventfulAPIKey = 'bMhbgh3kzp8mTZtC';
var EventfulAPI = 'http://api.eventful.com/json/events/search?app_key=' + EventfulAPIKey + '&location=Los+Angeles&keywords=Lakers';

var Event = React.createClass({
  render: function() {
    return (
      <div className="event">
        <h3>{this.props.name}</h3>
        <h4>{this.props.startTime}, {this.props.venue}, {this.props.city}</h4>
        <h4>Driver | Rider</h4>
      </div>
    );
  }
});

var EventList = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  render: function() {
    var eventNodes = this.props.data.map(function(event) {
      return (
        <Event key={event.id} name={event.title} startTime={event.start_time} venue={event.venue_name} city={event.city_name} />
      );
    });
    return (
      <div className="eventList">
        <h3>Events In Your Neighborhood</h3>
        {eventNodes}
      </div>
    );
  }
});

var EventBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    this.loadEventsFromServer();
  },

  loadEventsFromServer: function() {
    $.ajax({
      url: EventfulAPI,
      // dataType: 'application/json',
      method: "GET",
      dataType: 'jsonp',
      cache: false,
      error: function(data) {
        console.log(data)
      },
      success: function(data) {
        this.setState({data: data.events.event});
      }.bind(this)
    })
  },

  render: function() {
    return (
      <div className="eventBox">
        <EventList data={this.state.data} />
      </div>
    )
  }
});


ReactDOM.render(
  <EventBox />,
  document.getElementById('content')
);
