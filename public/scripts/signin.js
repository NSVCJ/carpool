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
    this.props.onCommentSubmit({email: email, password: password});
    this.setState({email: '', password: ''});
  },
  render: function() {
    return (

    <div>
      <form className="sign-in-form" onSubmit={this.handleSubmit}>

      <div className="">
              <h3>Please Sign In</h3>
      </div>

       <div className="form-group">
          <div className="">
            <input
              className="form-control"
              type="text"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              autoFocus />
          </div>
        </div>

       <div className="form-group">
          <div className="">
            <input
              className="form-control"
              type="text"
              placeholder="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              autoFocus />
          </div>
        </div>

          <div className="">
            <input className="btn-lg btn-primary" type="submit" value="Sign In" />
          </div>
      </form>
    </div>
    );
  }
});

export const SignInBox = React.createClass({
  noResults: function() {
    console.log('no results');
  },
  handleQuerySubmit: function(query) {
    $.ajax({
      url: '/signin',
      method: 'POST',
      dataType: 'jsonp',
      data: {
        email: query.email,
        password: query.password
      },
      success: function(data) {
          this.setState({data: data.events});
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
      <div className="sign-in-container">
        <SignInForm onCommentSubmit={this.handleQuerySubmit} />
      </div>
    )
  }
});
