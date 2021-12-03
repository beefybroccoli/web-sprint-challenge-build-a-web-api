const express = require("express");
const server = express();
const routerActions = require("../api/actions/actions-router");
const routerProjects = require("../api/projects/projects-router");

server.use(express.json());
server.use(express.Router());

server.use("/api/projects", routerProjects);
server.use("/api/actions", routerActions);

server.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});

server.get("*", (req, res) => {
  res.send("invalid path");
});

module.exports = server;
