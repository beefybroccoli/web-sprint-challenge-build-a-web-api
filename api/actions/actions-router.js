const express = require("express");
const router = express();
const modelActions = require("./actions-model");
const middlewareActions = require("./actions-middlware");
const { errorHandling } = require("../middleware-errorhandler");

router.get("/", async (req, res) => {
  const actions = await modelActions.get();
  res.status(200).json(actions);
});

router.get("/:id", middlewareActions.verifyActionId, async (req, res) => {
  res.status(200).json(req.action);
});

router.post("", middlewareActions.verifyNewAction, async (req, res) => {
  const newAction = await modelActions.insert(req.newAction);
  res.status(201).json(newAction);
});

router.delete("/:id", middlewareActions.verifyActionId, async (req, res) => {
  const result = await modelActions.remove(req.params.id);
  res
    .status(201)
    .json({ message: `successfully deleted action id ${req.params.id}` });
});

router.put(
  "/:id",
  middlewareActions.verifyActionId,
  middlewareActions.verifyModifiedAction,
  async (req, res) => {
    const modifiedAction = await modelActions.update(
      req.params.id,
      req.modifiedAction
    );
    res.status(201).json(modifiedAction);
  }
);

router.use(errorHandling);

module.exports = router;
