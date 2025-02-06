import { QueryResolvers } from "../../../types";

export const getArticleById: QueryResolvers["getArticleById"] = async (_, { id }, { dataSources }) => {
  try {
    const article = await dataSources.db.article.findUniqueOrThrow({
      where: { id },
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
      },
    });

    return {
      code: 200,
      success: true,
      message: "Article récupéré avec succès",
      article: {
        ...article,
        createdAt: article.createdAt.toISOString(),
        likesCount: article.likes.length,  // Calcul du nombre de likes
        comments: (article.comments ?? []).map(comment => ({
          ...comment,
          createdAt: comment.createdAt.toISOString(),
        })),
        likes: (article.likes ?? []).map(like => ({
          ...like,
          createdAt: like.createdAt.toISOString(),
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
