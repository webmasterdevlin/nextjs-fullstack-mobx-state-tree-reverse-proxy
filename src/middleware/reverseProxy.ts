import httpProxyMiddleware from "next-http-proxy-middleware";

const reverseProxy = (handler) => async (req, res) => {
  process && process.env.NODE_ENV === "development"
    ? await httpProxyMiddleware(req, res, {
        // You can use the `http-proxy` option
        target: "https://jsonplaceholder.typicode.com",
        // In addition, you can use the `pathRewrite` option provided by `next-http-proxy`
        pathRewrite: {
          "^/api": "",
        },
      })
    : res.status(404).send(null);

  return handler(req, res);
};

export default reverseProxy;
