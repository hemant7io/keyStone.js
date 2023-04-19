import { config } from "@keystone-6/core";
import type { ServerConfig } from "@keystone-6/core/types";
import { withAuth, session } from "./auth";
import User from "./schema/user";
import Product from "./schema/products";
export default config(
  withAuth({
    server: {
      cors: { origin: ["http://localhost:3001"], credentials: true },
    },
    db: {
      provider: "postgresql",
      url: "postgres://postgres:password@localhost:5432/project",
    },
    lists: {
      User,
      Product,
    },
    /* storing image locally */
    storage: {
      my_local_images: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `http://localhost:3000/images${path}`,
        serverRoute: {
          path: "/images",
        },
        storagePath: "public/images",
      },
    },
    session,
  })
);
