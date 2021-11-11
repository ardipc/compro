import connectDB from '../../../middleware/mongodb';
import User from '../../../models/users';
import nextConnect from 'next-connect';

const handler = nextConnect()
  .get(async (req, res) => {
    const { query: { page } } = req;
    var perPage = 5, numPage = Math.max(0, page ? page : 0);
    let result = await User.find()
      .limit(perPage)
      .skip(perPage * numPage)
      .sort({ since: 'desc' });
    let count = await User.count();
    res.json({ success: true, count, result });
  })
  .post(async (req, res) => {
    const { body } = req;
    var user = new User(body);
    var result = await user.save();
    res.json({ success: true, result });
  });
  
export default connectDB(handler);