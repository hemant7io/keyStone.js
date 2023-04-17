var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core3 = require("@keystone-6/core");

// auth.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = "asdfdsf98495465123adfjbljkdabfl785184j!@#$%^&*()@345%^&*#";
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
    itemData: {
      isAdmin: true
    }
  },
  sessionData: "isAdmin"
});

// schema/user.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");

// acces.ts
function hasSession({ session: session2 }) {
  console.log(session2);
  return Boolean(session2);
}
function isAdmin({ session: session2 }) {
  console.log(session2);
  if (!session2)
    return false;
  if (session2.data.isAdmin)
    return true;
  return false;
}

// schema/user.ts
var User = (0, import_core.list)({
  access: {
    operation: {
      create: import_access.allowAll,
      query: import_access.allowAll,
      update: hasSession,
      delete: isAdmin
    },
    filter: {
      update: isAdmin
    },
    item: { update: isAdmin }
  },
  fields: {
    // the user's name, publicly visible
    name: (0, import_fields.text)({ validation: { isRequired: true } }),
    //   we use isIndexed to enforce this email is unique
    email: (0, import_fields.text)({
      access: {
        create: import_access.allowAll,
        // only admins can update this field
        read: isAdmin,
        update: isAdmin
      },
      isFilterable: false,
      isOrderable: false,
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    password: (0, import_fields.password)({
      access: {
        create: import_access.allowAll,
        read: isAdmin,
        update: isAdmin
      },
      // ui:{
      //   itemView:{
      //     fieldMode:args =>(isAdmin)
      //   }
      // listView:{}
      // },
      validation: { isRequired: true }
    }),
    posts: (0, import_fields.relationship)({ ref: "Product.author", many: true }),
    isAdmin: (0, import_fields.checkbox)({
      access: {
        read: isAdmin,
        create: isAdmin,
        update: isAdmin
      },
      defaultValue: false
    })
  }
});
var user_default = User;

// schema/products.ts
var import_core2 = require("@keystone-6/core");
var import_fields2 = require("@keystone-6/core/fields");
var import_access2 = require("@keystone-6/core/access");
var Product = (0, import_core2.list)({
  access: {
    operation: {
      create: isAdmin,
      query: import_access2.allowAll,
      update: hasSession,
      delete: isAdmin
    }
  },
  fields: {
    title: (0, import_fields2.text)(),
    price: (0, import_fields2.integer)(),
    // smallImage: text({
    //   ui: {
    //     createView: {
    //       fieldMode: "hidden",
    //     },
    //   },
    // }),
    // mediumImage: text({
    //   ui: {
    //     createView: {
    //       fieldMode: "hidden",
    //     },
    //   },
    // }),
    // largeImage: text({
    //   ui: {
    //     createView: {
    //       fieldMode: "hidden",
    //     },
    //   },
    // }),
    image: (0, import_fields2.image)({
      storage: "my_local_images"
    }),
    description: (0, import_fields2.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    author: (0, import_fields2.relationship)({ ref: "User.posts", many: false })
  }
});
var products_default = Product;

// keystone.ts
var keystone_default = (0, import_core3.config)(
  withAuth({
    db: {
      provider: "postgresql",
      url: "postgres://postgres:password@localhost:5432/project"
    },
    lists: {
      User: user_default,
      Product: products_default
    },
    /* storing image locally */
    storage: {
      my_local_images: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `http://localhost:3000/images${path}`,
        serverRoute: {
          path: "/images"
        },
        storagePath: "public/images"
      }
    },
    session
  })
);
