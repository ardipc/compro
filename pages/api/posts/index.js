// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';

const db = require('../../../models/index');

const handler = nextConnect()
  .get(async (req, res) => {
    const { query: { page } } = req;
    let rows = await db.posts.findAndCountAll({
      where: {
        status: 1 // only status 1 will show
      },
      attributes: {
        exclude: ['author', 'status']
      },
      include: [
        { model: db.users, as: 'user', attributes: ['id', 'name', 'email'] }
      ],
      order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ['id', 'DESC'],
      ],
      offset: page ? +page : 0,
      limit: 5,
    });
    res.json({ success: true, posts: rows });
  })
  .post(async (req, res) => {
    const { body } = req;
    const user = await db.posts.create({ ...body, createdAt: new Date(), updatedAt: new Date() });
    res.json({ success: true, user });
  });
  
export default handler;