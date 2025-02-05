import { Resolvers } from "./types.js";
import { signIn } from "./resolvers/mutations/User/signIn.js";
import { createUser } from "./resolvers/mutations/User/createUser.js";
import { loggedUser } from "./resolvers/query/User/loggedUser.js";
import { createArticle } from "./resolvers/mutations/Article/createArticle.js";


export const resolvers: Resolvers = {
  Query: {
    loggedUser: loggedUser
  },
  Mutation: {
    createUser: createUser,
    signIn: signIn,
    createArticle: createArticle
  },
}