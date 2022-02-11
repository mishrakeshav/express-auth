const express = require("express");
const controllers = require("../controllers/session.controller");
const requireUser = require("../middleware/requireUser");
const validateResource = require("../middleware/validateResource");
const createSessionSchema = require("../schema/session.schema");


const router = express.Router();

router.post("/create", validateResource(createSessionSchema), controllers.createUserSessionHandler);
router.get("/sessions", requireUser, controllers.getUserSessionsHandler);
router.delete("/sessions", requireUser, controllers.deleteSessionHandler);


module.exports = router;
