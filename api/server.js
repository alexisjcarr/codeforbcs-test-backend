const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const usersRouter = require("../routers/usersRouter");

const server = express();

server.use(express.static("doc")); // for apiDocs

server.use(helmet());
server.use(bodyParser.json());
server.use(cors());

// server.get("/", (req, res) => {
//   res.send();
// });

server.use("/api", usersRouter);

module.exports = server;
