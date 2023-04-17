import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";
// import * as dotenv from "dotenv";
// dotenv.config();
let sessionSecret = "asdfdsf98495465123adfjbljkdabfl785184j!@#$%^&*()@345%^&*#";
let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days
const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",

  initFirstItem: {
    fields: ["name", "email", "password"],
    itemData: {
      isAdmin: true,
    },
  },
  sessionData: "isAdmin",
});

export { withAuth, session };
