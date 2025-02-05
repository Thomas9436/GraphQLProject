import { MutationResolvers } from "../../../types";

export const updateArticle: MutationResolvers["updateArticle"] = async (_, { id, title, content }, { dataSources, user }) => {
  try {
    if (!user) {
      throw new Error("Authentication required");
    }

    const existingArticle = await dataSources.db.article.findUniqueOrThrow({
      where: { id },
      select: { authorId: true, title: true, content: true },
    });

    if (existingArticle.authorId !== user.id) {
      throw new Error("Unauthorized: You can only update your own articles");
    }

    const updatedArticle = await dataSources.db.article.update({
      where: { id },
      data: {
        title: title ?? existingArticle.title,
        content: content ?? existingArticle.content,
      },
      include: { author: true },
    });

    return {
      code: 200,
      message: "Article modifié avec succès",
      success: true,
      article: {
        ...updatedArticle,
        createdAt: updatedArticle.createdAt.toISOString()
      },
    };
  } catch (error) {
    return {
      code: 500,
      message: "Erreur interne lors de la modification de l'article",
      success: false,
      article: null,
    };
  }
};
