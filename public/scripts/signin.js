import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

export const SignInForm = React.createClass({
  getInitialState: function() {
    return {email: "", password: ""};
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    if (!email || !password ) {
      return;
    }
    this.props.onCommentSubmit(JSON.stringify({"email": email, "password": password}));
    this.setState({email: '', password: ''});
  },
  render: function() {
    return (
      <form className="sign-in-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="col-sm-12">
            <input
              className="form-control"
              type="text"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleEmailChange} />
          </div>
        </div>
        <br /><br />
        <div className="form-group">
          <div className="col-sm-12">
            <input
              className="form-control"
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handlePasswordChange} />
          </div>
        </div>
        <br /><br />
        <div className="form-group">
          <div className="col-sm-12">
            <input className="btn-lg btn-primary" type="submit" value="Sign In" />
          </div>
        </div>

      </form>
    );
  }
});

export const SignInBox = React.createClass({
  noResults: function() {
    console.log('no results');
  },
  handleQuerySubmit: function(query) {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "/signin",
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "12a26ba3-d72a-0da8-0962-d7de77f897f3"
      },
      "processData": false,
      "data": query,
      success: function(data) {
        localStorage.id = data.id;
        localStorage.name = data.name;
        localStorage.email = data.email;
        localStorage.phone = data.phone;
        localStorage.token = data.token;
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
    return (
      <div className="sign-in-container">
        <SignInForm onCommentSubmit={this.handleQuerySubmit} />
      </div>
    )
  }
});
