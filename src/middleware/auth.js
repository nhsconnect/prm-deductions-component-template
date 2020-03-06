const NO_AUTH_KEYS = `Authorization keys have not been set, cannot authenticate`;
const REQUIRES_HEADERS = url =>
  `The request (${url}) requires a valid Authorization header to be set`;
const NOT_AUTHORIZED = `Authorization is provided but not valid`;

export const authenticateRequest = (req, res, next) => {
  if (!process.env.AUTHORIZATION_KEYS) {
    res.status(412).json({
      error: NO_AUTH_KEYS
    });
  }
  const validAuthorizationKeys = process.env.AUTHORIZATION_KEYS
    ? process.env.AUTHORIZATION_KEYS.split(',')
    : [];

  const authorizationKey = req.get('Authorization');

  if (!authorizationKey) {
    res.status(401).json({
      error: REQUIRES_HEADERS(req.baseUrl)
    });
    return;
  }

  if (!validAuthorizationKeys.includes(authorizationKey)) {
    res.status(403).json({
      error: NOT_AUTHORIZED
    });
    return;
  }

  next();
};
