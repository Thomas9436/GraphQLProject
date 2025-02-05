import { Resolvers } from "./types.js";
import { signIn } from "./resolvers/mutations/User/signIn.js";
import { createUser } from "./resolvers/mutations/User/createUser.js";
import { loggedUser } from "./resolvers/query/User/loggedUser.js";
import { createArticle } from "./resolvers/mutations/Article/createArticle.js";
import { updateArticle } from "./resolvers/mutations/Article/updateArticle.js";
import { deleteArticle } from "./resolvers/mutations/Article/deleteArticle.js";
import { getArticles } from "./resolvers/query/Article/getArticles.js";
import { getArticleById } from "./resolvers/query/Article/getArticleById.js";


export const resolvers: Resolvers = {
  Query: {
    loggedUser: loggedUser,
    getArticles: getArticles,
    getArticleById: getArticleById
  },
  Mutation: {
    createUser: createUser,
    signIn: signIn,
    createArticle: createArticle,
    updateArticle: updateArticle,
    deleteArticle: deleteArticle
  },
}