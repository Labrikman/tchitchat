import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import CustomInput from '/imports/ui/components/CustomInput';
import { withTracker } from 'meteor/react-meteor-data'
import Body from '/imports/ui/components/Body';
import Button from '/imports/ui/components/Button';
import { Redirect, Link } from 'react-router-dom';
import StyledLink from '/imports/ui/components/StyledLink';
import Center from '/imports/ui/components/Center';
import Flex from '/imports/ui/components/Flex';

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
    const { id, title } = this.state;
    const { history } = this.props;
    
    Meteor.call("rooms.create", { title }, (err) => {
      if (err)
        console.log(err);
      else
        history.push('/rooms');
    });
  }

  edit = () => {
    const { title } = this.state;
    const { history } = this.props;
    const id = this.props.match.params.id;

    Meteor.call("rooms.update", { id, title }, (err) => {
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
            { window.location.pathname!== "/new-room/add" ?
              <Button onClick={this.edit} >Modifier room</Button> :
              <Button onClick={this.send} >Créer room</Button>
            }
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

