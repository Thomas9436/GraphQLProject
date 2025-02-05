import gql from "graphql-tag";

export const typeDefs = gql `

    type Query {
        loggedUser: User
        getArticles: GetArticlesResponse
        getArticleById(id: ID!): GetArticleByIdResponse
    }

    type Mutation {
        createUser(username: String!, password: String!): CreateUserResponse
        signIn(username: String!, password: String!): SignInUserResponse
        createArticle(title: String!, content: String!): CreateArticleResponse
        updateArticle(id: ID!, title: String, content: String): UpdateArticleResponse
        deleteArticle(id: ID!): DeleteArticleResponse
    }

    type GetArticleByIdResponse {
        code: Int!
        success: Boolean!
        message: String!
        article: Article
    }

    type GetArticlesResponse {
        code: Int!
        success: Boolean!
        message: String!
        articles: [Article!]!
    }

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
    }
`;
