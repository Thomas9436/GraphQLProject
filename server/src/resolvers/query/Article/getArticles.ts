import { QueryResolvers } from "../../../types";

export const getArticles: QueryResolvers["getArticles"] = async (_, __, { dataSources }) => {
  try {
    const articles = await dataSources.db.article.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        comments: {
          include: {
            author: true
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
      message: "Articles récupérés avec succès",
      articles: articles.map(article => ({
        ...article,
        createdAt: article.createdAt.toISOString(),
        comments: article.comments.map(comment => ({
          ...comment,
          createdAt: comment.createdAt.toISOString(),
        })),
        likes: article.likes.map(like => ({
          ...like,
          createdAt: like.createdAt.toISOString(),
        })),
      })),
    };
  } catch (error) {
    console.error("Erreur dans getArticles:", error);
    return {
      code: 500,
      success: false,
      message: "Erreur lors de la récupération des articles",
      articles: [],
    };
  }
};