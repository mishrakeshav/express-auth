const jwt =  require("jsonwebtoken");
const config =  require("../config/default.js");

const signJwt = (
  object,
  keyName,
  options
)=> {
  // const signingKey = Buffer.from(
  //   config[keyName],
  //   "base64"
  // ).toString("ascii");
  
  return jwt.sign(object,  config[keyName], {
    ...(options && options),
    algorithm: "RS256",
  });
}

const verifyJwt = (
  token,
  keyName
)=> {
  // const publicKey = Buffer.from(config[keyName], "base64").toString(
  //   "ascii"
  // );

  try {
    const decoded = jwt.verify(token, config[keyName]);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}

module.exports = {
  signJwt,
  verifyJwt
}