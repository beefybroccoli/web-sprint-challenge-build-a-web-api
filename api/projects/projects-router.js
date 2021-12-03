// Write your "projects" router here!
// Write your "actions" router here!
const express = require("express");
const router = express();

router.get("/", (req,res)=>{
    res.status(200).json({message:"hello from project-router"});
})

module.exports = router;