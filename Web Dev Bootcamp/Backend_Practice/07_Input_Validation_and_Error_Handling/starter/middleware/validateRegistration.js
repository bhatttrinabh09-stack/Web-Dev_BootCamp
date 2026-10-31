import { AppError } from '../errors/AppError.js';

export function validateRegistration(req, res, next) {
  const { email, password, age } = req.body || {};

  // TODO 1: Validate email (must be string, include '@' and '.')
  //         If invalid: return next(new AppError('Invalid email format', 400))

  // TODO 2: Validate password (must be string, min length 8)
  //         If invalid: return next(new AppError('Password must be at least 8 characters', 400))

  // TODO 3: Validate age (must be integer, >= 18 and <= 120)
  //         If invalid: return next(new AppError('Age must be between 18 and 120', 400))

  // If all valid:
  next();
}
