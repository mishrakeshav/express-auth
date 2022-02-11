const express = require("express");

const controllers = require("../controllers/user.controller");
const requireUser = require("../middleware/requireUser");
const createUserSchema = require("../schema/user.schema");
const validateResource = require("../middleware/validateResource");


const router = express.Router();

router.post("/create", validateResource(createUserSchema), controllers.createUserHandler);

module.exports = router;
