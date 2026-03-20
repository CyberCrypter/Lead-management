import jwt from "jsonwebtoken";

export const signToken = (adminId) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign({ adminId }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};
