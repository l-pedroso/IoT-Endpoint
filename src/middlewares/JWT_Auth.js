const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');


// Create middleware for checking the JWT
exports.checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://dev-75o6icsz.us.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer
    audience: 'https//iot-authentication-api.com', //replace with your API's audience, available at Dashboard > APIs
    issuer: 'https://dev-75o6icsz.us.auth0.com/',
    algorithms: [ 'RS256' ]
  });


exports.checkScopes = jwtAuthz([ 'read:messages' ]);
 