import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import reverseProxy from "src/middleware/reverseProxy";

const handler = nc()
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const id = req.query.id as string;
      res.statusCode = 204;
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  })
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const id = req.query.id as string;
      res.statusCode = 200;
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  });

export default reverseProxy(handler);
