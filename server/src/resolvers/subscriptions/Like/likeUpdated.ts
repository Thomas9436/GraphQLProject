import { SubscriptionResolvers } from "../../../types";
import { pubsub } from "../../../pubsub";  // PubSub instance

export const likeUpdated: SubscriptionResolvers["likeUpdated"] = {
  subscribe: (_, { articleId }, { dataSources }) => {
    // Using asyncIterableIterator instead of asyncIterator
    return pubsub.asyncIterableIterator(`${articleId}_likeUpdated`);
  },
};
