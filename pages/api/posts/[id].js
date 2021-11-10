// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';

const db = require('../../../models/index');

const handler = nextConnect()
  .get(async (req, res) => {
    const { id } = req.query;
    const rows = await db.posts.findByPk(id, {
      attributes: {
        exclude: ['author']
      },
      include: [
        { model: db.users, as: 'user', attributes: ['id', 'name', 'email'] }
      ]
    });
    res.json({ success: true, post: rows });
  })
  .patch(async (req, res) => {
    const { body, query } = req;
    const { id } = query;
    await db.posts.update(body, { where: { id }});
    res.json({ success: true, post: body });
  })
  .delete(async (req, res) => {
    const { id } = req.query;
    await db.posts.destroy({ where: { id } });
    res.json({ success: true, post: id });
  });
  
export default handler;