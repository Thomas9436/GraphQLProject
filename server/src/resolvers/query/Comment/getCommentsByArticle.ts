import { QueryResolvers } from "../../../types";

export const getCommentsByArticle: QueryResolvers["getCommentsByArticle"] = async (_, { articleId }, { dataSources }) => {
  try {
    // Récupérer les commentaires associés à un article spécifique
    const comments = await dataSources.db.comment.findMany({
      where: {
        articleId: articleId,  // Filtrer les commentaires par articleId
      },
      include: {
        author: true,  // Inclure l'auteur du commentaire
      },
    });

    return {
      code: 200,
      success: true,
      message: "Commentaires récupérés avec succès",
      comments: comments.map(comment => ({
        ...comment,
        createdAt: comment.createdAt.toISOString(),  // Convertir la date au format ISO
        author: {
          id: comment.author.id,
          username: comment.author.username,
        },
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
