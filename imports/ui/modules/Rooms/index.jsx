import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Body from '../../components/Body';
import Button from '../../components/Button';
import Flex from '../../components/Flex';
import Form from '../../components/Form';
import StyledLink from '../../components/StyledLink';

import Rooms from '/imports/api/rooms';

const REMOVE = ({ target: { id } }) => {
  Meteor.call('rooms.remove', { id }, (err) => {
    if (err) console.log(err);
  });
}

const Home = ({ user, userId, loading, rooms }) => {
  if (!userId) {
    return (
      <Redirect to="/accounts/signin" />
    );
  }

  return (
    <Body>
      <Form>
        <h1>Hello {user.username} !</h1>
        
        {loading ? (
          <h2>Chargement...</h2>
        ) : (
          <div>
            {rooms.map(room => (
              <article key={room._id} style={{ border: '1px solid aqua', padding: '10px', maxWidth: '325px'}} >
                <h3>{room.title}</h3>
                <Flex>
                  <StyledLink 
                    to={`/room/${room._id}`}
                    title={room.title}
                    >Message
                  </StyledLink>
                  {(room.userId === userId) && (
                    <div>
                        <StyledLink 
                          to={`/new-room/edit/${room._id}`} 
                          >Modifier
                        </StyledLink>
                      <Button
                          id={room._id}
                          onClick={REMOVE}
                        >Supprimer
                      </Button>
                    </div>
                  )}
                </Flex>
              </article>
            ))}
          </div>
        )}
        <Flex>
          <Button
            onClick={Meteor.logout}
          >Logout
          </Button>
          <StyledLink to="/new-room/add">Create room</StyledLink>
        </Flex>
      </Form>
    </Body>
  );
}

export default withTracker(() => {
  const roomsPublication = Meteor.subscribe('rooms.lasts');
  const loading = !roomsPublication.ready();
  const rooms = Rooms.find({}, { sort: { createdAt: -1 } }).fetch();
  return {
    userId: Meteor.userId(),
    user: Meteor.user() || {},
    loading,
    rooms,
  }
})(Home);