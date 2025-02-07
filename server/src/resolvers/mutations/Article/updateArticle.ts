import { MutationResolvers } from "../../../types";

export const updateArticle: MutationResolvers["updateArticle"] = async (_, { id, title, content }, { dataSources, user }) => {
  try {
    if (!user) {
      return {
        code: 401,
        message: "Authentification requise",
        success: false,
        article: null,
      };
    }

    // Vérifier si l'article existe et si l'utilisateur est l'auteur
    const existingArticle = await dataSources.db.article.findUniqueOrThrow({
      where: { id },
      select: { authorId: true, title: true, content: true, createdAt: true },
    });

    if (existingArticle.authorId !== user.id) {
      return {
        code: 403,
        message: "Non autorisé : vous ne pouvez modifier que vos propres articles",
        success: false,
        article: null,
      };
    }

    // Mettre à jour l'article
    const updatedArticle = await dataSources.db.article.update({
      where: { id },
      data: {
        title: title ?? existingArticle.title,
        content: content ?? existingArticle.content,
      },
    });

    return {
      code: 200,
      message: "Article modifié avec succès",
      success: true,
      article: {
        ...updatedArticle,
        createdAt: updatedArticle.createdAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("Erreur dans updateArticle:", error);
    return {
      code: 500,
      message: "Erreur interne lors de la modification de l'article",
      success: false,
      article: null,
    };
  }
};
