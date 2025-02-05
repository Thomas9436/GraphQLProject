import { QueryResolvers } from "../../../types";

export const getArticleById: QueryResolvers["getArticleById"] = async (_, { id }, { dataSources }) => {
  try {
    const article = await dataSources.db.article.findUniqueOrThrow({
      where: { id },
      include: { author: true },
    });

    return {
      code: 200,
      success: true,
      message: "Article récupéré avec succès",
      article: {
        ...article,
        createdAt: article.createdAt.toISOString()
      },
    };
  } catch (error) {
    return {
      code: 404,
      success: false,
      message: "Article introuvable",
      article: null,
    };
  }
};
