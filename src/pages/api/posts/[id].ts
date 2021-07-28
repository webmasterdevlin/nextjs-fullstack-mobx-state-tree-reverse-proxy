import nc from "next-connect";

import reverseProxy from "src/middleware/reverseProxy";

const handler = nc();

export default reverseProxy(handler);
