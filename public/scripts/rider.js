export const DriverInfo = React.createClass({
  render: function() {
    return (
      <div className="driver col-md-4">
        <h2 className="name">Name: {this.props.name}</h2>
        <div className="email">Email: {this.props.email}</div>
        <div className="phone">Phone: {this.props.phone}</div>
        <div className="price">Price: {this.props.price}</div>
        <div className="lat">Lat: {this.props.lat}</div>
        <div className="long">Long: {this.props.long}</div>
      </div>
    );
  }
});

export const DriversList = React.createClass({
  componentDidMount: function() {
    console.log('DriversList, componentDidMount');
  },

  getInitialState: function() {
    console.log('DriversList getInitialState:');
    return {data: []};
  },

  render: function() {
    var driverNodes = this.props.data.map(function(driver) {
      console.log(driver);
      return (
          <DriverInfo name={driver.name}
                      email={driver.email}
                      phone={driver.phone}
                      price={driver.price}
                      lat={driver.lat}
                      long={driver.long} />
      );
    });
    return (
      <div className="row driver-list">
        {driverNodes}
      </div>
    );
  }
});

export const GetDriversData = React.createClass({
  componentDidMount: function() {
    console.log('GetDriversData, componentDidMount');
    this.getDrivers();
  },

  getDrivers: function() {
    $.ajax({
      url: '/api/trips',
      method: 'GET',
      dataType: 'json',
      params: {
        eventfulId: 'SpecialEventId'
      },
      success: function(data) {
        console.log("Gotten data:", data);
        if (!data.trips) {
          this.noResults();
        } else {
          this.setState({data: data.trips});
          console.log('data trips:', this.state);
        }
      }.bind(this),
      error: function(err) {
        console.error('error:', err);
      }.bind(this)
    })
  },

  getInitialState: function() {
    return {data: []};
  },

  render: function() {
    return (
      <DriversList data={this.state.data} />
    );
  }
});

ReactDOM.render(
  <GetDriversData />,
  document.getElementById('content')
);
