import { Article, User, Comment, Like } from "@prisma/client";

export type ArticleModel = Omit<Article, "createdAt"> & {
  createdAt: string;
  likesCount?: number;
};

export type UserModel = Omit<User, "password">;

export type CommentModel = Omit<Comment, "createdAt"> & {
  createdAt: string;
};

export type LikeModel = Omit<Like, "id">;
