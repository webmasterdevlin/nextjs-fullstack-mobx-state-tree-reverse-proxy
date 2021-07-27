import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import reverseProxy from "src/middleware/reverseProxy";

const handler = nc()
  .use(reverseProxy)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      res.statusCode = 200;
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      res.statusCode = 201;
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  });

export default handler;
