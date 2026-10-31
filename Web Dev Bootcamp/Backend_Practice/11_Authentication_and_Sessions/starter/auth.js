// ==============================================================================
// Topic 11 Starter: Safe Password Hashing & Verification
// ==============================================================================

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;
export const usersDb = []; // In-memory simulated user table

export async function registerUser(email, plainPassword) {
  // TODO 1: Check if email already registered. If yes, throw Error('Email exists')
  // TODO 2: Hash password with bcrypt.hash(plainPassword, SALT_ROUNDS)
  // TODO 3: Save user { id: 'u-' + Date.now(), email, passwordHash }
  // TODO 4: Return safe user object (id, email) - NEVER return passwordHash!
  throw new Error("TODO: Implement registerUser");
}

export async function loginUser(email, plainPassword) {
  // TODO 1: Find user by email. If not found, throw Error('Invalid credentials')
  // TODO 2: Compare password with bcrypt.compare(plainPassword, user.passwordHash)
  // TODO 3: If false, throw Error('Invalid credentials')
  // TODO 4: Return safe user object { id: user.id, email: user.email }
  throw new Error("TODO: Implement loginUser");
}
