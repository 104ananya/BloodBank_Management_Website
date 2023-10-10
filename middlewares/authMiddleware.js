const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth Failed",
        });
      } 
      else {
        // if no error
        req.body.userId = decode.id; // inside decode we have user

        // if we don't get Token and if it doesn't get successfully verified Next will not be called
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Authentication Failed",
      error,
    });
  }
};
