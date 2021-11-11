import connectDB from '../../../middleware/mongodb';
import Post from '../../../models/posts';
import nextConnect from 'next-connect';
import User from '../../../models/users';

const handler = nextConnect()
  .get(async (req, res) => {
    const { slug } = req.query;
    Post.find({ slug })
      .populate({ path: 'author', select: 'name email', model: User })
      .exec((err, result) => {
        res.json({ success: true, result: err ? err : result[0] });
      });
  });
  
export default connectDB(handler);