import { PrismaClient } from "@prisma/client"
import { PubSub } from 'graphql-subscriptions';
import { UserModel } from "./models.js";


export type DataSourceContext = {
  dataSources: {
    db: PrismaClient
    pubsub: PubSub
  };
  user: UserModel | null
};