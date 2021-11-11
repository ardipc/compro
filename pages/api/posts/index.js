import connectDB from '../../../middleware/mongodb';
import Post from '../../../models/posts';
import nextConnect from 'next-connect';
import User from '../../../models/users';

const handler = nextConnect()
  .get(async (req, res) => {
    const { query: { page } } = req;
    var perPage = 5, numPage = Math.max(0, page ? page : 0);
    let result = await Post.find()
      .populate({ path: 'author', select: 'name email', model: User })
      .limit(perPage)
      .skip(perPage * numPage)
      .sort({ createdAt: 'desc' });
    let count = await Post.count();
    res.json({ success: true, count, result });
  })
  .post(async (req, res) => {
    const { body } = req;
    const { title } = body;
    var addSlug = { ...body, slug: title.toLowerCase().replace(/[^A-Za-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-') };
    var post = new Post(addSlug);
    var result = await post.save();
    res.json({ success: true, result });
  });
  
export default connectDB(handler);