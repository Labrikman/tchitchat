import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import CustomInput from '../../components/CustomInput';
import { withTracker } from 'meteor/react-meteor-data'
import Button from '../../components/Button';
import Flex from '../../components/Flex';
import Center from '../../components/Center';
import StyledLink from '../../components/StyledLink';

class AddMessage extends Component {
  state={
    username: "",
    roomId: "",
    content: "",
  }

  update = (e, { name, value }) => {
    this.setState({ [name]: value });
  }
  
  
  handleClick() {
    this.setState({
      posts: [
        ...this.state.posts,
        this.state.input
      ],
      input: '' // add this line to clear your input field when a new post is submitted
    })
  }
  send = () => {
    const { content, username, roomId  } = this.state;
    const { history } = this.props;
    
    Meteor.call("message.create", { content, username, roomId }, (err) => {
      if (err)
        console.log(err);
      else
        history.push('/room/:id');
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
 
export default withTracker(() => ({
    userId: Meteor.userId(),
}))(AddMessage);
