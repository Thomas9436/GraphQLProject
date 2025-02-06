import { pubsub } from "../../../pubsub";
import { MutationResolvers } from "../../../types";

export const createLike: MutationResolvers["createLike"] = async (_, { articleId }, { dataSources, user }) => {
  if (!user) {
    return {
      code: 401,
      message: "You need to be logged in to like an article",
      success: false,
      like: null,
    };
  }

  try {
    // Ajouter le like
    const newLike = await dataSources.db.like.create({
      data: {
        userId: user.id,
        articleId: articleId,
      },
      include: {
        user: true,  // Inclure l'utilisateur dans la réponse
      },
    });

    // Publier l'événement pour notifier tous les abonnés
    pubsub.publish(`${articleId}_likeUpdated`, { likeUpdated: newLike });  // Publier l'événement

    return {
      code: 200,
      message: "Like ajouté avec succès",
      success: true,
      like: {
        id: newLike.id,
        articleId: newLike.articleId,
        userId: newLike.userId,
        user: {
          id: newLike.user.id,
          username: newLike.user.username,
        },
      },
    };
  } catch (error) {
    console.error("Erreur lors de l'ajout du like", error);
    return {
      code: 500,
      message: "An error occurred while adding the like",
      success: false,
      like: null,
    };
  }
};
