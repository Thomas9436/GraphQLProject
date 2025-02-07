import { QueryResolvers } from "../../../types";

export const getArticleById: QueryResolvers["getArticleById"] = async (_, { id }, { dataSources }) => {
  try {
    const article = await dataSources.db.article.findUniqueOrThrow({
      where: { id },
    });

    const likes = await dataSources.db.like.findMany({ where: { articleId: id } }) || [];
    const comments = await dataSources.db.comment.findMany({ where: { articleId: id } }) || [];

    return {
      code: 200,
      success: true,
      message: "Article récupéré avec succès",
      article: {
        ...article,
        createdAt: article.createdAt.toISOString(),
        likesCount: likes.length,
        likes,  
        comments: comments.map(comment => ({
          ...comment,
          createdAt: comment.createdAt.toISOString(),
        })),  
      },
    };
  } catch (error) {
    console.error("Erreur dans getArticleById:", error);
    return {
      code: 404,
      success: false,
      message: "Article introuvable",
      article: null,
    };
  }
};
