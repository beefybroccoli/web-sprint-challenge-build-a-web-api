// Write your "projects" router here!
// Write your "actions" router here!
const express = require("express");
const router = express();
const modelProject = require("./projects-model");
const middlewareProject = require("./projects-middleware");

router.get("/", async (req, res) => {
  const projects = await modelProject.get();
  res.status(200).json(projects);
});

router.get("/:id", middlewareProject.verifyProjectId, async (req, res) => {
  const projects = await modelProject.get();
  const project = projects.filter(
    (element) => String(element.id) === String(req.params.id)
  );
  res.status(200).json(project[0]);
});

router.post("", middlewareProject.verifyNewProject, async (req, res) => {
  const newProject = await modelProject.insert(req.newProject);
  res.status(201).json(newProject);
});

router.delete("/:id", middlewareProject.verifyProjectId, async (req, res) => {
  const result = await modelProject.remove(req.params.id);
  if (result) {
    res
      .status(200)
      .json({ message: `successfully deleted project ${req.params.id}` });
  } else {
    res
      .status(400)
      .json({ message: `fail to delete project ${req.params.id}` });
  }
});

module.exports = router;
