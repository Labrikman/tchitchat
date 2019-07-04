import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data'

import Fields from './Fields';

class Inscription extends Component {
  state = {
    email: "",
    password: "",
    username: "",
  }

  static getDerivedStateFromProps(props) {
    if (props.userId)
      props.history.push('/home');
    return {};
  };

  update = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  signup = () => {
    const { email, password, username } = this.state;
    Accounts.createUser({ email, password, username }, (err) => {
      if (err)
        console.log(err);
      else
        this.setState({ email: "", password: "", username: "" });
    });
  }

  render() {
    return (
      <div>
        <h1>Inscription</h1>
        <Fields 
          update={this.update}
          state={this.state}
        />
        <button
          onClick={this.signup}
        >Signup
        </button>
        <Link to="signin">Connection</Link>
      </div>
    );
  }
}

export default withTracker(() => ({
  userId: Meteor.userId(),
}))(Inscription);

/*

export default withTracker(() => {
  return {
    userId: Meteor.userId(),
  };
})(Inscription)

*/
