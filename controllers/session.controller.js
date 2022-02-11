const config = require("../config/default");
const {
  createSession,
  findSessions,
  updateSession,
} = require("../service/session.service");
const { validatePassword } = require("../service/user.service");
const { signJwt } = require("../utils/jwt.utils");

const createUserSessionHandler = async (req,res)=>{
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  // create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    "accessTokenPrivateKey",
    { expiresIn: config.accessTokenTtl} // 15 minutes,
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    "refreshTokenPrivateKey",
    { expiresIn: config.refreshTokenTtl } // 15 minutes
  );

  // return access & refresh tokens

  return res.send({ accessToken, refreshToken });
}

const getUserSessionsHandler = async (req, res)=>{
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

const deleteSessionHandler = async (req, res)=>{
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}

module.exports = {
    createUserSessionHandler,
    getUserSessionsHandler,
    deleteSessionHandler
}