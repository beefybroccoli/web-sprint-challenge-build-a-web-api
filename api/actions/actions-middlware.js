const modelActions = require("./actions-model");
const modelProject = require("../projects/projects-model");

async function verifyActionId(req, res, next) {
  const action = await modelActions.get(req.params.id);
  if (!action) {
    res.status(404).json({ message: `action id ${req.params.id} not found` });
  } else {
    req.action = action;
    next();
  }
}

async function verifyNewAction(req, res, next) {
  const { project_id, description, notes } = req.body;

  if (
    !project_id ||
    !description ||
    !notes ||
    description.trim().length === 0 ||
    notes.trim().length === 0
  ) {
    res
      .status(400)
      .json({ message: "invalid project_id, description, or notes" });
  } else if (!verifyProjectId(project_id)) {
    console.log("enter line 29");
    res.status(404).json({ message: `project ${project_id} not foound` });
  } else {
    req.newAction = { project_id, description, notes, completed: false };
    next();
  }
}

async function verifyModifiedAction(req, res, next) {
  const { project_id, description, notes, completed } = req.body;

  if (
    !project_id ||
    !description ||
    !notes ||
    !completed ||
    description.trim().length === 0 ||
    notes.trim().length === 0
  ) {
    res
      .status(400)
      .json({ message: "invalid project_id, description, or notes" });
  } else if (!verifyProjectId(project_id)) {
    res.status(404).json({ message: `project ${project_id} not foound` });
  } else {
    req.modifiedAction = { project_id, description, notes, completed };
    next();
  }
}

async function verifyProjectId(project_id) {
  const project = await modelProject.get(project_id);
  console.log("project = ", project);
  if (
    project === null ||
    project === undefined ||
    project === {} ||
    project === [] ||
    !project
  ) {
    return false;
  } else {
    return true;
  }
}

module.exports = { verifyActionId, verifyNewAction, verifyModifiedAction };
