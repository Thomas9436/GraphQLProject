import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { UserModel } from "../models";
import * as bcrypt from "bcrypt";

export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET || "secret"
  );
  return token;
};

export const getUser = async (token: string, db: PrismaClient): Promise<UserModel | null> => {  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    const user = await db.user.findUnique({ where: { id: payload.id } });

    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
    };
  } catch {    
    return null;
  }
};


export const comparePasswords = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 5);
};
