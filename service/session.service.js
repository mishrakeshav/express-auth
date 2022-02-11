const { get } =  require("lodash");
const config =  require("../config/default");
const { FilterQuery, UpdateQuery } =  require("mongoose");
const SessionModel  =  require("../models/session.model");
const { verifyJwt, signJwt } =  require("../utils/jwt.utils");
const { findUser } =  require("./user.service");

const createSession = async (userId, userAgent)=>{
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

const findSessions = async (query)=>{
  return SessionModel.find(query).lean();
}

const updateSession = async ( query, update)=>{
  return SessionModel.updateOne(query, update);
}

const reIssueAccessToken = async ({ refreshToken })=>{
  const { decoded } = verifyJwt(refreshToken, "refreshTokenPublicKey");

  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    "accessTokenPrivateKey",
    { expiresIn: config.accessTokenTtl } // 15 minutes
  );
  return accessToken;
}

module.exports = {
    createSession,
    findSessions,
    updateSession,
    reIssueAccessToken
}