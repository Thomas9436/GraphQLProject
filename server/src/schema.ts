import gql from "graphql-tag";

export const typeDefs = gql`

    type Query {
        loggedUser: User
        getArticles: GetArticlesResponse
        getArticleById(id: ID!): GetArticleByIdResponse
        getCommentsByArticle(articleId: ID!): GetCommentsResponse
        getLikesByArticle(articleId: ID!): GetLikesResponse
    }

    type Mutation {
        createUser(username: String!, password: String!): CreateUserResponse
        signIn(username: String!, password: String!): SignInUserResponse
        createArticle(title: String!, content: String!): CreateArticleResponse
        updateArticle(id: ID!, title: String, content: String): UpdateArticleResponse
        deleteArticle(id: ID!): DeleteArticleResponse
        createComment(articleId: ID!, content: String!): CreateCommentResponse
        updateComment(id: ID!, content: String!): UpdateCommentResponse
        deleteComment(id: ID!): DeleteCommentResponse
        createLike(articleId: ID!): CreateLikeResponse
        deleteLike(articleId: ID!): DeleteLikeResponse
    }

    type Subscription {
        likeUpdated(articleId: ID!): Article
    }

    # Requêtes pour récupérer les articles, commentaires et likes
    type GetArticleByIdResponse {
        code: Int!
        success: Boolean!
        message: String!
        article: Article
        comments: [Comment]
        likes: [Like]
    }

    type GetArticlesResponse {
        code: Int!
        success: Boolean!
        message: String!
        articles: [Article!]!
        comments: [Comment]
        likes: [Like]
    }

    type GetCommentsResponse {
        code: Int!
        success: Boolean!
        message: String!
        comments: [Comment!]!
    }

    type GetLikesResponse {
        code: Int!
        success: Boolean!
        message: String!
        likesCount: Int!
    }

    # Réponses pour les mutations
    type DeleteArticleResponse {
        code: Int!
        success: Boolean!
        message: String!
    }

    type UpdateArticleResponse {
        code: Int!
        success: Boolean!
        message: String!
        article: Article
    }

    type CreateArticleResponse {
        code: Int!
        success: Boolean!
        message: String!
        article: Article
    }

    type CreateUserResponse {
        code: Int!
        success: Boolean!
        message: String!
        user: User
    }

    type SignInUserResponse {
        code: Int!
        success: Boolean!
        message: String!
        token: String
    }

    # Réponses pour les commentaires
    type CreateCommentResponse {
        code: Int!
        success: Boolean!
        message: String!
        comment: Comment
    }

    type UpdateCommentResponse {
        code: Int!
        success: Boolean!
        message: String!
        comment: Comment
    }

    type DeleteCommentResponse {
        code: Int!
        success: Boolean!
        message: String!
    }

    # Réponses pour les likes
    type CreateLikeResponse {
        code: Int!
        success: Boolean!
        message: String!
        like: Like
    }

    type DeleteLikeResponse {
        code: Int!
        success: Boolean!
        message: String!
    }

    type User {
        id: ID!
        username: String!
    }

    type Article {
        id: ID!
        title: String!
        content: String!
        createdAt: String!
        author: User!
        comments: [Comment!]!
        likes: [Like!]!
    }

    type Comment {
        id: ID!
        content: String!
        createdAt: String!
        author: User!
        articleId: ID!
    }

    type Like {
        id: ID!
        user: User!
        articleId: ID!
    }
`;
