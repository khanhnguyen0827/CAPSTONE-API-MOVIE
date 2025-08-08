import { errorResponse } from '../helpers/response.helper.js';

/**
 * Middleware to validate TokenCybersoft header
 */
const validateCybersoftToken = (req, res, next) => {
  const tokenCybersoft = req.headers['tokencybersoft'] || req.headers['TokenCybersoft'];

  if (!tokenCybersoft) {
    return errorResponse(res, 'TokenCybersoft header is required', 401);
  }

  // For now, we'll accept any non-empty token
  // In a real implementation, you would validate against a specific token or token format
  if (typeof tokenCybersoft !== 'string' || tokenCybersoft.trim() === '') {
    return errorResponse(res, 'Invalid TokenCybersoft token', 401);
  }

  // Add the token to the request object for potential use in controllers
  req.cybersoftToken = tokenCybersoft;
  next();
};

export { validateCybersoftToken };
