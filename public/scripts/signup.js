import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

export const SignUpForm = React.createClass({
  getInitialState: function() {
    return {name: "", email: "", password: "", phone: ""};
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  handlePhoneChange: function(e) {
    this.setState({phone: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.state.name.trim();
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    var phone = this.state.phone.trim();
    if (!name || !email || !password || !phone ) {
      return;
    }
    this.props.onCommentSubmit({name: name, email: email, password: password, phone: phone});
    this.setState({name: '', email: '', password: '', phone: ''});
  },
  render: function() {
    return (
      <form className="sign-up-form form-signin" onSubmit={this.handleSubmit}>
        <h3 className="form-signin-heading">Sign Up</h3>
        <div className="form-group">
          <label className="sr-only">Name</label>
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleNameChange}
            autoFocus />
        </div>
        <div className="form-group">
          <label className="sr-only">Email</label>
          <input
            className="form-control"
            type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleEmailChange} />
        </div>
        <div className="form-group">
          <label className="sr-only">Password</label>
         <input
            className="form-control"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange} />
        </div>
        <div className="form-group">
          <label className="sr-only">Phone</label>
          <input
            className="form-control"
            type="text"
            placeholder="Phone"
            value={this.state.phone}
            onChange={this.handlePhoneChange} />
        </div>
        <div className="form-group">
          <input className="btn-lg btn-primary" type="submit" value="Sign Up" />
        </div>
      </form>
    );
  }
});

export const SignUpBox = React.createClass({
  noResults: function() {
    console.log('no results');
  },
  handleQuerySubmit: function(query) {
    $.ajax({
      url: '/signup',
      method: 'POST',
      dataType: 'jsonp',
      data: {
        name: query.name,
        email: query.email,
        password: query.password,
        phone: query.phone
      },
      success: function(data) {
          this.setState({data: data.event});
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
      <div className="sign-up-container">
        <SignUpForm onCommentSubmit={this.handleQuerySubmit} />
      </div>
    )
  }
});
