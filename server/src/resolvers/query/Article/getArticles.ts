import { QueryResolvers } from "../../../types";

export const getArticles: QueryResolvers["getArticles"] = async (_, __, { dataSources }) => {
  try {
    const articles = await dataSources.db.article.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: true },
    });

    const formattedArticles = articles.map(article => ({
      ...article,
      createdAt: article.createdAt.toISOString(),
    }));

    return {
      code: 200,
      success: true,
      message: "Articles récupérés avec succès",
      articles: formattedArticles,
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: "Erreur lors de la récupération des articles",
      articles: [],
    };
  }
};
