const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/config');

async function generateToken(userData) {
  const { id, email } = userData;
  const token = await jwt.sign(
    {
      id,
      email,
    },
    jwtSecret,
    {
      expiresIn: '1hr',
    },
  );

  return token;
}

async function validateToken(token) {
  let result;

  await jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) {
      result = {
        success: false,
        ...decoded,
      };
    } else {
      result = {
        success: true,
        ...decoded,
      };
    }
  });

  return result;
}

module.exports = {
  generateToken,
  validateToken,
};
