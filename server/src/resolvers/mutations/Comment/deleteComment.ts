import { MutationResolvers } from "../../../types";

export const deleteComment: MutationResolvers["deleteComment"] = async (_, { id }, { dataSources, user }) => {
  try {
    // Vérification si l'utilisateur est authentifié
    if (!user) {
      return {
        code: 401,
        message: "Authentication required",
        success: false,
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
        message: "Unauthorized: You can only delete your own comments",
        success: false,
      };
    }

    // Suppression du commentaire
    await dataSources.db.comment.delete({
      where: { id },
    });

    // Retourner une réponse de succès
    return {
      code: 200,
      message: "Commentaire supprimé avec succès",
      success: true,
    };
  } catch (error) {
    return {
      code: 500,
      message: "Erreur interne lors de la suppression du commentaire",
      success: false,
    };
  }
};
