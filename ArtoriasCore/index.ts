require('dotenv').config();
import * as http from "http";
import App from "./src/app";
import { APILogger } from "./src/Logger/apiLogger";

const port = process.env.PORT || 8888;
App.set("port", port);
const server = http.createServer(App);
server.listen(port);

const logger = new APILogger();

server.on("listening", function(): void {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${port}`;
    console.log(bind);
    logger.info(`Listening on ${bind}`, null);
 });

module.exports = App;