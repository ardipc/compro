// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';

const db = require('../../../models/index');

const handler = nextConnect()
  .get(async (req, res) => {
    let rows = await db.posts.findAndCountAll({
      attributes: {
        exclude: ['author']
      },
      include: [
        { model: db.users, as: 'user', attributes: ['id', 'name', 'email'] }
      ]
    });
    res.json({ success: true, posts: rows });
  })
  .post(async (req, res) => {
    const { body } = req;
    const user = await db.posts.create({ ...body, createdAt: new Date(), updatedAt: new Date() });
    res.json({ success: true, user });
  });
  
export default handler;