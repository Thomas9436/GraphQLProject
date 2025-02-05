import { MutationResolvers } from "../../../types"

export const createArticle: MutationResolvers["createArticle"] = async (_, { title, content }, { dataSources, user }) => {
  
    if (!user) {
      return {
        code: 401,
        message: "Non authentifié !",
        success: false,
        article: null,
      };
    }
  
    try {
      const article = await dataSources.db.article.create({
        data: {
          title,
          content,
          authorId: user.id,
        },
        include: { author: true },
      });
        
      return {
        code: 200,
        message: "Article créé avec succès",
        success: true,
        article: {
          ...article,
          createdAt: article.createdAt.toISOString()
        },
      };
    } catch (error) {
      return {
        code: 500,
        message: "Erreur interne lors de la création de l'article",
        success: false,
        article: null,
      };
    }
  };
  