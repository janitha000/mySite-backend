const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const { auth0 } = require('../configs/env')

exports.checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${auth0.domain}.well-known/jwks.json`
  }),

  audience: process.env.AUTH0_AUDIENCE,
  issuer: `${auth0.domain}`,
  algorithms: ['RS256']
});


