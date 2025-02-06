import { QueryResolvers } from "../../../types.js";

export const loggedUser: QueryResolvers["loggedUser"] = async (_,__, {user}) => {
  if (!user) {
    return null; 
  }
  return user;
};