import connectDB from '../../../middleware/mongodb';
import User from '../../../models/users';
import nextConnect from 'next-connect';

const handler = nextConnect()
  .get(async (req, res) => {
    const { id } = req.query;
    User.findById(id, (err, result) => {
      res.json({ success: true, result: err ? err : result });
    });
  })
  .patch(async (req, res) => {
    const { body, query } = req;
    const { id } = query;
    User.findByIdAndUpdate(id, body, (err, result) => {
      res.json({ success: true, result: err ? err : body });
    });
  })
  .delete(async (req, res) => {
    const { id } = req.query;
    await User.findByIdAndRemove(id);
    res.json({ success: true, result: id });
  });
  
export default connectDB(handler);