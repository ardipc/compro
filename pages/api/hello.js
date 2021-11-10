// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import nextConnect from "next-connect";

const handler = nextConnect()
  .get((req, res) => {
    res.status(200).json({ name: 'John Doe' })
  });

export default handler;
