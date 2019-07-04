import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data'

import Fields from './Fields';

class Connection extends Component {
  state = {
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

  signin = () => {
    const { password, username } = this.state;
    Meteor.loginWithPassword(username, password, (err) => {
      if (err)
        console.log(err);
    });
  }

  render() {
    return (
      <div>
        <h1>Connection</h1>
        <Fields 
        update={this.update}
        state={this.state}
        />
        <button
          onClick={this.signin}
        >Signup
        </button>
        <Link to="/signup">Inscription</Link>
      </div>
    );
  }
}

export default withTracker(() => ({
  userId: Meteor.userId(),
}))(Connection);

/*

export default withTracker(() => {
  return {
    userId: Meteor.userId(),
  };
})(Connection)

*/
