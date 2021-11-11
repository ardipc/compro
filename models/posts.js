import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var user = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
  },
  cover: {
    type: String,
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  status: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.models = {};

var Post = mongoose.model('posts', user);

export default Post;