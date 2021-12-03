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
  res.status(200).json(req.project);
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

router.put(
  "/:id",
  middlewareProject.verifyProjectId,
  middlewareProject.verifyModifiedProject,
  async (req, res) => {
    const result = await modelProject.update(
      req.params.id,
      req.modifiedProject
    );
    res.status(201).json(result);
  }
);

router.get(
  "/:id/actions",
  middlewareProject.verifyProjectId,
  async (req, res) => {
    const result = await modelProject.getProjectActions(req.params.id);
    res.status(200).json(result);
  }
);

module.exports = router;
