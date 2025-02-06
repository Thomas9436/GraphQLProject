import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import session from "express-session";
import cors from "cors";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import db from "./datasources/db.js";
import { getUser } from "./modules/auth.js";
import { User } from "./types.js";
import { pubsub } from "./pubsub.js";

const app = express();

declare module "express-session" {
  interface SessionData {
    user?: User;
  }
}

app.use(
  session({
    secret: process.env.SESSION_SECRET || "monSuperSecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // Expiration en 24h
    }
  })
);

app.use(
  cors({
    // origin: "http://localhost:5173",
    // credentials: true,
  })
);

// Création du serveur Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

// Middleware Apollo avec gestion des sessions
app.use(
  "/graphql",
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const { session } = req;
      
      const authorization = req.headers.authorization?.split("Bearer ")?.[1].trim();

      const user = authorization ? getUser(authorization) : null;      

      if (user) {
        session.user = user;
      }

      return {
        dataSources: {db, pubsub},
        user: session.user || null,
      };
    },
  })
);

// Démarrer le serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
