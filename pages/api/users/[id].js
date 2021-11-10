// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';

const db = require('../../../models/index');

const handler = nextConnect()
  .get(async (req, res) => {
    const { id } = req.query;
    const rows = await db.users.findByPk(id);
    res.json({ success: true, user: rows });
  })
  .patch(async (req, res) => {
    const { body, query } = req;
    const { id } = query;
    await db.users.update(body, { where: { id }});
    res.json({ success: true, user: body });
  })
  .delete(async (req, res) => {
    const { id } = req.query;
    await db.users.destroy({ where: { id } });
    res.json({ success: true, user: id });
  });
  
export default handler;