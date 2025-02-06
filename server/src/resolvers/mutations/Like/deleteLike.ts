import { pubsub } from "../../../pubsub.js";
import { MutationResolvers } from "../../../types";

export const deleteLike: MutationResolvers["deleteLike"] = async (_, { articleId }, { dataSources, user }) => {
  if (!user) {
    return {
      code: 401,
      message: "You need to be logged in to unlike an article",
      success: false,
    };
  }

  try {
    // Vérifier si le like existe
    const existingLike = await dataSources.db.like.findUnique({
      where: {
        userId_articleId: {
          userId: user.id,
          articleId: articleId,
        },
      },
    });

    if (!existingLike) {
      return {
        code: 404,
        message: "Like not found",
        success: false,
      };
    }

    // Supprimer le like
    await dataSources.db.like.delete({
      where: {
        userId_articleId: {
          userId: user.id,
          articleId: articleId,
        },
      },
    });

    // Publier l'événement de suppression du like (pour notifier les abonnés)
    pubsub.publish('LIKE_UPDATED', { likeUpdated: articleId });

    return {
      code: 200,
      message: "Like removed successfully",
      success: true,
    };
  } catch (error) {
    console.error("Erreur lors de la suppression du like", error);
    return {
      code: 500,
      message: "An error occurred while removing the like",
      success: false,
    };
  }
};
