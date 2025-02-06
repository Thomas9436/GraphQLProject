import { AuthenticatedUser } from "./modules/auth.js";
import { PrismaClient } from "@prisma/client"
import { PubSub } from 'graphql-subscriptions';


export type DataSourceContext = {
  dataSources: {
    db: PrismaClient
    pubsub: PubSub
  };
  user: AuthenticatedUser | null
};