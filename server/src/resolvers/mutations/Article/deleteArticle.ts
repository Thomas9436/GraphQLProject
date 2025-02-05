import { MutationResolvers } from "../../../types";

export const deleteArticle: MutationResolvers["deleteArticle"] = async (_, { id }, { dataSources, user }) => {
  try {
    if (!user) {
      return {
        code: 401,
        message: "Authentication required",
        success: false,
      };
    }

    const existingArticle = await dataSources.db.article.findUniqueOrThrow({
      where: { id },
      select: { authorId: true },
    });

    if (existingArticle.authorId !== user.id) {
      return {
        code: 403,
        message: "Unauthorized: You can only delete your own articles",
        success: false,
      };
    }

    await dataSources.db.article.delete({
      where: { id },
    });

    return {
      code: 200,
      message: "Article supprimé avec succès",
      success: true,
    };
  } catch (error) {
    return {
      code: 500,
      message: "Erreur interne lors de la suppression de l'article",
      success: false,
    };
  }
};
