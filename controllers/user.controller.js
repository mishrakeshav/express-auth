const { createUser } = require("../service/user.service");
const logger = require("../utils/logger");

const createUserHandler = async ( req, res)=>{
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

module.exports = {
  createUserHandler
}