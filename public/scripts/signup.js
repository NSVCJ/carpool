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
      <form className="sign-up-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
       <input
          type="text"
          placeholder="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
       <input
          type="text"
          placeholder="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <input
          type="text"
          placeholder="phone"
          value={this.state.phone}
          onChange={this.handlePhoneChange}
        />
        <input type="submit" value="Sign Up" />
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
