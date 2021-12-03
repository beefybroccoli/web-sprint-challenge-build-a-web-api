const modelProject = require("./projects-model");
function verifyNewProject(req, res, next) {
  const { name, description } = req.body;
  if (
    !name ||
    !description ||
    name.trim().length === 0 ||
    description.trim().length === 0
  ) {
    res.status(400).json({ message: "invalid name or description" });
  } else {
    req.newProject = {
      name,
      description,
      completed: req.body.completed ? req.body.completed : false,
    };
    next();
  }
}

function verifyModifiedProject(req, res, next) {
  const { name, description, completed } = req.body;
  if (
    !name ||
    !description ||
    !completed ||
    name.trim().length === 0 ||
    description.trim().length === 0
  ) {
    res.status(400).json({ message: "invalid name, description or completed" });
  } else {
    req.modifiedProject = { name, description, completed: Boolean(completed) };
    next();
  }
}

async function verifyProjectId(req, res, next) {
  try {
    const project = await modelProject.get(req.params.id);
    if (!project) {
      res.status(404).json({ message: `project ${req.params.id} not found` });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    res.status(500).json({ message: "error occured" });
  }
}

module.exports = { verifyNewProject, verifyModifiedProject, verifyProjectId };
