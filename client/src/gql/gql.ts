/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation UpdateArticle($updateArticleId: ID!, $content: String, $title: String) {\n    updateArticle(id: $updateArticleId, content: $content, title: $title) {\n      success\n      message\n      article {\n        id\n        title\n        content\n        createdAt\n      }\n    }\n  }\n": typeof types.UpdateArticleDocument,
    "\n    mutation UpdateComment($updateCommentId: ID!, $content: String!) {\n        updateComment(id: $updateCommentId, content: $content) {\n            code\n            comment {\n            id\n            }\n            success\n            message\n        }\n    }\n": typeof types.UpdateCommentDocument,
    "\n  mutation CreateArticle($title: String!, $content: String!) {\n    createArticle(title: $title, content: $content) {\n      article {\n        id\n        title\n        content\n        createdAt\n      }\n      code\n      message\n      success\n    }\n  }\n": typeof types.CreateArticleDocument,
    "\n  query GetArticles {\n    getArticles {\n      code\n      message\n      success\n      articles {\n        id\n        title\n        content\n        likes {\n          user {\n            id\n          }\n          id\n          articleId\n        }\n        comments {\n          content\n          author {\n            id\n            username\n          }\n          createdAt\n          articleId\n          id\n        }\n        createdAt\n        author {\n          id\n          username\n        }\n      }\n    }\n  }\n": typeof types.GetArticlesDocument,
    "\n    mutation CreateComment($articleId: ID!, $content: String!) {\n      createComment(articleId: $articleId, content: $content) {\n        code\n        comment {\n          content\n          author {\n            id\n            username\n          }\n          createdAt\n          id\n        }\n        success\n        message\n      }\n    }\n  ": typeof types.CreateCommentDocument,
    "\n    mutation DeleteComment($deleteCommentId: ID!) {\n      deleteComment(id: $deleteCommentId) {\n        code\n        message\n        success\n      }\n    }\n  ": typeof types.DeleteCommentDocument,
    "\n    mutation DeleteArticle($deleteArticleId: ID!) {\n      deleteArticle(id: $deleteArticleId) {\n        code\n        message\n        success\n      }\n    }\n  ": typeof types.DeleteArticleDocument,
    "\n    mutation CreateLike($articleId: ID!) {\n      createLike(articleId: $articleId) {\n        code\n        like {\n          articleId\n          id\n          user {\n            id\n            username\n          }\n        }\n        message\n        success\n      }\n    }\n  ": typeof types.CreateLikeDocument,
    "\n    mutation DeleteLike($articleId: ID!) {\n      deleteLike(articleId: $articleId) {\n        code\n        message\n        success\n      }\n    }\n  ": typeof types.DeleteLikeDocument,
    "\n  query LoggedUser {\n    loggedUser {\n      id\n      username\n    }\n  }\n": typeof types.LoggedUserDocument,
    "\n  mutation SignIn($username: String!, $password: String!) {\n    signIn(username: $username, password: $password) {\n      code\n      message\n      success\n      token\n    }\n  }\n": typeof types.SignInDocument,
    "\n  mutation Register($username: String!, $password: String!) {\n    createUser(username: $username, password: $password) {\n      code\n      message\n      success\n      user {\n        id\n        username\n      }\n    }\n  }\n": typeof types.RegisterDocument,
};
const documents: Documents = {
    "\n  mutation UpdateArticle($updateArticleId: ID!, $content: String, $title: String) {\n    updateArticle(id: $updateArticleId, content: $content, title: $title) {\n      success\n      message\n      article {\n        id\n        title\n        content\n        createdAt\n      }\n    }\n  }\n": types.UpdateArticleDocument,
    "\n    mutation UpdateComment($updateCommentId: ID!, $content: String!) {\n        updateComment(id: $updateCommentId, content: $content) {\n            code\n            comment {\n            id\n            }\n            success\n            message\n        }\n    }\n": types.UpdateCommentDocument,
    "\n  mutation CreateArticle($title: String!, $content: String!) {\n    createArticle(title: $title, content: $content) {\n      article {\n        id\n        title\n        content\n        createdAt\n      }\n      code\n      message\n      success\n    }\n  }\n": types.CreateArticleDocument,
    "\n  query GetArticles {\n    getArticles {\n      code\n      message\n      success\n      articles {\n        id\n        title\n        content\n        likes {\n          user {\n            id\n          }\n          id\n          articleId\n        }\n        comments {\n          content\n          author {\n            id\n            username\n          }\n          createdAt\n          articleId\n          id\n        }\n        createdAt\n        author {\n          id\n          username\n        }\n      }\n    }\n  }\n": types.GetArticlesDocument,
    "\n    mutation CreateComment($articleId: ID!, $content: String!) {\n      createComment(articleId: $articleId, content: $content) {\n        code\n        comment {\n          content\n          author {\n            id\n            username\n          }\n          createdAt\n          id\n        }\n        success\n        message\n      }\n    }\n  ": types.CreateCommentDocument,
    "\n    mutation DeleteComment($deleteCommentId: ID!) {\n      deleteComment(id: $deleteCommentId) {\n        code\n        message\n        success\n      }\n    }\n  ": types.DeleteCommentDocument,
    "\n    mutation DeleteArticle($deleteArticleId: ID!) {\n      deleteArticle(id: $deleteArticleId) {\n        code\n        message\n        success\n      }\n    }\n  ": types.DeleteArticleDocument,
    "\n    mutation CreateLike($articleId: ID!) {\n      createLike(articleId: $articleId) {\n        code\n        like {\n          articleId\n          id\n          user {\n            id\n            username\n          }\n        }\n        message\n        success\n      }\n    }\n  ": types.CreateLikeDocument,
    "\n    mutation DeleteLike($articleId: ID!) {\n      deleteLike(articleId: $articleId) {\n        code\n        message\n        success\n      }\n    }\n  ": types.DeleteLikeDocument,
    "\n  query LoggedUser {\n    loggedUser {\n      id\n      username\n    }\n  }\n": types.LoggedUserDocument,
    "\n  mutation SignIn($username: String!, $password: String!) {\n    signIn(username: $username, password: $password) {\n      code\n      message\n      success\n      token\n    }\n  }\n": types.SignInDocument,
    "\n  mutation Register($username: String!, $password: String!) {\n    createUser(username: $username, password: $password) {\n      code\n      message\n      success\n      user {\n        id\n        username\n      }\n    }\n  }\n": types.RegisterDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateArticle($updateArticleId: ID!, $content: String, $title: String) {\n    updateArticle(id: $updateArticleId, content: $content, title: $title) {\n      success\n      message\n      article {\n        id\n        title\n        content\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateArticle($updateArticleId: ID!, $content: String, $title: String) {\n    updateArticle(id: $updateArticleId, content: $content, title: $title) {\n      success\n      message\n      article {\n        id\n        title\n        content\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateComment($updateCommentId: ID!, $content: String!) {\n        updateComment(id: $updateCommentId, content: $content) {\n            code\n            comment {\n            id\n            }\n            success\n            message\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateComment($updateCommentId: ID!, $content: String!) {\n        updateComment(id: $updateCommentId, content: $content) {\n            code\n            comment {\n            id\n            }\n            success\n            message\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateArticle($title: String!, $content: String!) {\n    createArticle(title: $title, content: $content) {\n      article {\n        id\n        title\n        content\n        createdAt\n      }\n      code\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation CreateArticle($title: String!, $content: String!) {\n    createArticle(title: $title, content: $content) {\n      article {\n        id\n        title\n        content\n        createdAt\n      }\n      code\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetArticles {\n    getArticles {\n      code\n      message\n      success\n      articles {\n        id\n        title\n        content\n        likes {\n          user {\n            id\n          }\n          id\n          articleId\n        }\n        comments {\n          content\n          author {\n            id\n            username\n          }\n          createdAt\n          articleId\n          id\n        }\n        createdAt\n        author {\n          id\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetArticles {\n    getArticles {\n      code\n      message\n      success\n      articles {\n        id\n        title\n        content\n        likes {\n          user {\n            id\n          }\n          id\n          articleId\n        }\n        comments {\n          content\n          author {\n            id\n            username\n          }\n          createdAt\n          articleId\n          id\n        }\n        createdAt\n        author {\n          id\n          username\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateComment($articleId: ID!, $content: String!) {\n      createComment(articleId: $articleId, content: $content) {\n        code\n        comment {\n          content\n          author {\n            id\n            username\n          }\n          createdAt\n          id\n        }\n        success\n        message\n      }\n    }\n  "): (typeof documents)["\n    mutation CreateComment($articleId: ID!, $content: String!) {\n      createComment(articleId: $articleId, content: $content) {\n        code\n        comment {\n          content\n          author {\n            id\n            username\n          }\n          createdAt\n          id\n        }\n        success\n        message\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteComment($deleteCommentId: ID!) {\n      deleteComment(id: $deleteCommentId) {\n        code\n        message\n        success\n      }\n    }\n  "): (typeof documents)["\n    mutation DeleteComment($deleteCommentId: ID!) {\n      deleteComment(id: $deleteCommentId) {\n        code\n        message\n        success\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteArticle($deleteArticleId: ID!) {\n      deleteArticle(id: $deleteArticleId) {\n        code\n        message\n        success\n      }\n    }\n  "): (typeof documents)["\n    mutation DeleteArticle($deleteArticleId: ID!) {\n      deleteArticle(id: $deleteArticleId) {\n        code\n        message\n        success\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateLike($articleId: ID!) {\n      createLike(articleId: $articleId) {\n        code\n        like {\n          articleId\n          id\n          user {\n            id\n            username\n          }\n        }\n        message\n        success\n      }\n    }\n  "): (typeof documents)["\n    mutation CreateLike($articleId: ID!) {\n      createLike(articleId: $articleId) {\n        code\n        like {\n          articleId\n          id\n          user {\n            id\n            username\n          }\n        }\n        message\n        success\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteLike($articleId: ID!) {\n      deleteLike(articleId: $articleId) {\n        code\n        message\n        success\n      }\n    }\n  "): (typeof documents)["\n    mutation DeleteLike($articleId: ID!) {\n      deleteLike(articleId: $articleId) {\n        code\n        message\n        success\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query LoggedUser {\n    loggedUser {\n      id\n      username\n    }\n  }\n"): (typeof documents)["\n  query LoggedUser {\n    loggedUser {\n      id\n      username\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignIn($username: String!, $password: String!) {\n    signIn(username: $username, password: $password) {\n      code\n      message\n      success\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($username: String!, $password: String!) {\n    signIn(username: $username, password: $password) {\n      code\n      message\n      success\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Register($username: String!, $password: String!) {\n    createUser(username: $username, password: $password) {\n      code\n      message\n      success\n      user {\n        id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($username: String!, $password: String!) {\n    createUser(username: $username, password: $password) {\n      code\n      message\n      success\n      user {\n        id\n        username\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;