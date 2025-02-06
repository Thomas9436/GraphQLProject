import { MutationResolvers } from "../../../types"

export const createComment: MutationResolvers["createComment"] = async (_, { articleId, content }, { dataSources, user }) => {
  
    if (!user) {
      return {
        code: 401,
        message: "Non authentifié !",
        success: false,
        comment: null,
      };
    }
  
    try {
      const comment = await dataSources.db.comment.create({
        data: {
          content,
          authorId: user.id,
          articleId, 
        },
        include: { author: true}, 
      }
    );

      return {
        code: 200,
        message: "Commentaire créé avec succès",
        success: true,
        comment: {
          id: comment.id,
          content: comment.content,
          createdAt: comment.createdAt.toISOString(),
          articleId: comment.articleId,
          authorId: comment.authorId,
          author: {
            id: comment.author.id,
            username: comment.author.username,
          },
        },
      };
    } catch (error) {
      return {
        code: 500,
        message: "Erreur interne lors de la création du commentaire",
        success: false,
        comment: null,
        error
      };
    }
  };
