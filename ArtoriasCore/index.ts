import dotenv = require('dotenv');
import * as http from "http";
import App from "./src/app";
import { APILogger } from "./src/Logger/apiLogger";

dotenv.config();
const port = process.env.PORT || 8888;
App.set("port", port);
const server = http.createServer(App);
server.listen(port);

const logger = new APILogger();

server.on("listening", function(): void {
    logger.info(`Listening on http://localhost:${port}`, null);
 });

module.exports = App;