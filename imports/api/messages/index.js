import { Mongo } from 'meteor/mongo';

const Messages = new Mongo.Collection('message');

export default Messages;
