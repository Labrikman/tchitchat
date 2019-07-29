import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import CustomInput from '/imports/ui/components/CustomInput';
import { withTracker } from 'meteor/react-meteor-data'
import Button from '/imports/ui/components/Button';
import Flex from '/imports/ui/components/Flex';
import Center from '/imports/ui/components/Center';
import StyledLink from '/imports/ui/components/StyledLink';

class AddMessage extends Component {
  state={
    content: "",
  }

  update = (e, { name, value }) => { this.setState({ [name]: value });}
 
  resetInput = () => { this.setState({ content: "" });}

  send = () => {
    const { content } = this.state;
    const { history, roomId } = this.props;

    Meteor.call("message.create", { content, roomId }, (err) => {
      if (err)
        console.log(err);
      else
        this.resetInput();
    });
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.send();
    }
  }

  render() {
    const { content } = this.state;
    return (
        <Center>
          <CustomInput
            placeholder="Message"
            name="content"
            value={content}
            update={this.update}
            onKeyPress={this.handleKeyPress}
          />
          <Flex>
            <Button onClick={this.send} >Send</Button>
            <StyledLink to={`/rooms`} >Back</StyledLink>
          </Flex>
        </Center>
    )
  }
}
 
export default withTracker(({}) => ({
 userId: Meteor.userId(),
}))(AddMessage);
