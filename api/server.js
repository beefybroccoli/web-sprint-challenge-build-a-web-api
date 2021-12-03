const express = require('express');
const server = express();
server.use(express.json());
server.use(express.Router());

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.get("/", (req, res)=>{
    res.status(200).json({message:"hello world"});
})

module.exports = server;
