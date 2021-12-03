// Write your "projects" router here!
// Write your "actions" router here!
const express = require("express");
const router = express();
const modelProject = require("./projects-model");

router.get("/", async (req, res) => {
  const projects = await modelProject.get();
  res.status(200).json(projects);
});

router.get("/:id", async (req, res) => {
  const projects = await modelProject.get();
  res
    .status(200)
    .json(
      projects.filter((element) => String(element.id) === String(req.params.id))
    );
});

router.post("", async (req, res)=>{
    
    const newProject = await modelProject.insert();
})

module.exports = router;
