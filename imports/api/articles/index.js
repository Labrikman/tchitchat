import { Mongo } from 'meteor/mongo';

const Articles = new Mongo.Collection('articles');

export default Articles;
