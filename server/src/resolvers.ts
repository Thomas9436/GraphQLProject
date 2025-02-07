import { Resolvers } from "./types.js";
import { signIn } from "./resolvers/mutations/User/signIn.js";
import { createUser } from "./resolvers/mutations/User/createUser.js";
import { loggedUser } from "./resolvers/query/User/loggedUser.js";
import { createArticle } from "./resolvers/mutations/Article/createArticle.js";
import { updateArticle } from "./resolvers/mutations/Article/updateArticle.js";
import { deleteArticle } from "./resolvers/mutations/Article/deleteArticle.js";
import { getArticles } from "./resolvers/query/Article/getArticles.js";
import { getArticleById } from "./resolvers/query/Article/getArticleById.js";
import { createLike } from "./resolvers/mutations/Like/createLike.js";
import { deleteLike } from "./resolvers/mutations/Like/deleteLike.js";
import { getCommentsByArticle } from "./resolvers/query/Comment/getCommentsByArticle.js";
import { createComment } from "./resolvers/mutations/Comment/createComment.js";
import { deleteComment } from "./resolvers/mutations/Comment/deleteComment.js";
import { updateComment } from "./resolvers/mutations/Comment/updateComment.js";

export const resolvers: Resolvers = {
  Query: {
    loggedUser,
    getArticles,
    getArticleById,
    getCommentsByArticle,
  },
  Mutation: {
    createUser,
    signIn,
    createArticle,
    updateArticle,
    deleteArticle,
    createLike,
    deleteLike,
    createComment,
    deleteComment,
    updateComment,
  },
};
