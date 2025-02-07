import { QueryResolvers } from "../../../types";

export const getCommentsByArticle: QueryResolvers["getCommentsByArticle"] = async (_, { articleId }, { dataSources }) => {
  try {
    const comments = await dataSources.db.comment.findMany({
      where: { articleId },
    });

    return {
      code: 200,
      success: true,
      message: "Commentaires récupérés avec succès",
      comments: comments.map(comment => ({
        ...comment,
        createdAt: comment.createdAt.toISOString(),
      })),
    };
  } catch (error) {
    console.error("Erreur dans getCommentsByArticle:", error);
    return {
      code: 500,
      success: false,
      message: "Erreur lors de la récupération des commentaires",
      comments: [],
    };
  }
};
