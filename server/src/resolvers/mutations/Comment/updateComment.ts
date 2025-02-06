import { MutationResolvers } from "../../../types";

export const updateComment: MutationResolvers["updateComment"] = async (_, { id, content }, { dataSources, user }) => {
  try {
    // Vérification si l'utilisateur est authentifié
    if (!user) {
      return {
        code: 401,
        message: "Authentication required",
        success: false,
        comment: null,
      };
    }

    // Vérifier si le commentaire existe et obtenir l'ID de l'auteur
    const existingComment = await dataSources.db.comment.findUniqueOrThrow({
      where: { id },
      select: { authorId: true },
    });

    // Vérifier si l'utilisateur est l'auteur du commentaire
    if (existingComment.authorId !== user.id) {
      return {
        code: 403,
        message: "Unauthorized: You can only update your own comments",
        success: false,
        comment: null,
      };
    }

    // Mise à jour du contenu du commentaire
    const updatedComment = await dataSources.db.comment.update({
      where: { id },
      data: { content },
      include: { author: true, article: true },  // Inclure l'auteur et l'article
    });

    // Retourner une réponse avec le commentaire mis à jour
    return {
      code: 200,
      message: "Commentaire mis à jour avec succès",
      success: true,
      comment: {
        ...updatedComment,
        createdAt: updatedComment.createdAt.toISOString(),  // Formatage de la date
      },
    };
  } catch (error) {
    return {
      code: 500,
      message: "Erreur interne lors de la mise à jour du commentaire",
      success: false,
      comment: null,
    };
  }
};
