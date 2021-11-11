import connectDB from '../../../middleware/mongodb';
import Post from '../../../models/posts';
import User from '../../../models/users';
import nextConnect from 'next-connect';

const handler = nextConnect()
  .get(async (req, res) => {
    const { id } = req.query;
    Post.findById(id)
      .populate({ path: 'author', select: 'name email', model: User })
      .exec((err, result) => {
        res.json({ success: true, result: err ? err : result });
      });
  })
  .patch(async (req, res) => {
    const { body, query } = req;
    const { id } = query;
    Post.findByIdAndUpdate(id, body, (err, result) => {
      res.json({ success: true, result: err ? err : body });
    });
  })
  .delete(async (req, res) => {
    const { id } = req.query;
    await Post.findByIdAndRemove(id);
    res.json({ success: true, result: id });
  });
  
export default connectDB(handler);