import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Body from '/imports/ui/components/Body';
import Button from '/imports/ui/components/Button';
import Flex from '/imports/ui/components/Flex';
import Center from '/imports/ui/components/Center';
import StyledLink from '/imports/ui/components/StyledLink';
import Article from '/imports/ui/components/Article';

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
      <Center>
        <h1>Hello {user.username} !</h1>
        
        {loading ? (
          <h2>Chargement...</h2>
        ) : (
          <div>
            {rooms.map(room => (
              <Article key={room._id}>
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
              </Article>
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
      </Center>
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