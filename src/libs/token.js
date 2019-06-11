import config from '../config/config';

const jwt = require('jsonwebtoken');

async function generateToken(userData) {
  const { id, email } = userData;
  const token = await jwt.sign(
    {
      id,
      email,
    },
    config().jwtSecret,
    {
      expiresIn: '1hr',
    },
  );

  return token;
}

async function validateToken(token) {
  let result;

  await jwt.verify(token, config().jwtSecret, (error, decoded) => {
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
