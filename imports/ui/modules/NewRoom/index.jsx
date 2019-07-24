import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import CustomInput from '../../components/CustomInput';
import { withTracker } from 'meteor/react-meteor-data'
import Body from '../../components/Body';
import Button from '../../components/Button';
import { Redirect, Link } from 'react-router-dom';
import StyledLink from '../../components/StyledLink';
import Center from '../../components/Center';
import Flex from '../../components/Flex';

class NewRoom extends Component {
  state={
    title: "",
  }

  static getDerivedStateFromProps(props) {
    if (!props.userId)
      props.history.push('/signin');
    return {};
  };

  update = (e, { name, value }) => this.setState({ [name]: value });

  send = () => {
    const { title } = this.state;
    const { history } = this.props;
    
    Meteor.call("rooms.create", { title }, (err) => {
      if (err)
        console.log(err);
      else
        history.push('/rooms');
    });
  }

  render() {
    const { title } = this.state;
    return (
      <Body>
        <Center>
          <CustomInput
            placeholder="Title"
            name="title"
            value={title}
            update={this.update}
          />
          <Flex>
            <Button onClick={this.send} >Créer room</Button>
            <StyledLink to={`/rooms`} >Back</StyledLink>            
          </Flex>
        </Center>
      </Body>
    )
  }
}

export default withTracker(() => ({
  userId: Meteor.userId(),
}))(NewRoom);

