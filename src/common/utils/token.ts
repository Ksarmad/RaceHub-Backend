import jwt from "jsonwebtoken";

export const generateAccessToken = (
  adminId: string
) => {
  return jwt.sign(
    {
      adminId,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};