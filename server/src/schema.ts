import gql from "graphql-tag";

export const typeDefs = gql `

    type Query {
        loggedUser: User
        getArticles: [Article!]!
        getArticle(id: ID!): Article
    }

    type Mutation {
        createUser(username: String!, password: String!): CreateUserResponse
        signIn(username: String!, password: String!): SignInUserResponse
        createArticle(title: String!, content: String!): CreateArticleResponse
        updateArticle(id: ID!, title: String, content: String): Article!
        deleteArticle(id: ID!): Boolean!
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
