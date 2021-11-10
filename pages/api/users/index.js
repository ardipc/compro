// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';

const db = require('../../../models/index');

const handler = nextConnect()
  .get(async (req, res) => {
    let rows = await db.users.findAndCountAll();
    res.json({ success: true, users: rows });
  })
  .post(async (req, res) => {
    const { body } = req;
    const user = await db.users.create({ ...body, createdAt: new Date(), updatedAt: new Date() });
    res.json({ success: true, user });
  });
  
export default handler;