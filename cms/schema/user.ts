import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  text,
  password,
  checkbox,
  relationship,
} from "@keystone-6/core/fields";
import { hasSession, isAdmin } from "../acces";
const User = list({
  access: {
    operation: {
      create: allowAll,
      query: allowAll,
      update: hasSession,
      delete: isAdmin,
    },
    filter: {
      update: isAdmin,
    },
    item: { update: isAdmin },
  },

  fields: {
    // the user's name, publicly visible
    name: text({ validation: { isRequired: true } }),
    //   we use isIndexed to enforce this email is unique
    email: text({
      access: {
        create: allowAll,
        // only admins can update this field
        read: isAdmin,
        update: isAdmin,
      },
      isFilterable: false,
      isOrderable: false,
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    password: password({
      access: {
        create: allowAll,
        read: isAdmin,
        update: isAdmin,
      },
      // ui:{
      //   itemView:{
      //     fieldMode:args =>(isAdmin)
      //   }
      // listView:{}
      // },
      validation: { isRequired: true },
    }),
    posts: relationship({ ref: "Product.author", many: true }),
    isAdmin: checkbox({
      access: {
        read: isAdmin,
        create: isAdmin,
        update: isAdmin,
      },
      defaultValue: false,
    }),
  },
  hooks: {
    afterOperation: ({ operation, item }) => {
      if (operation === "create") {
        console.log(
          `New user created. Name: ${item.name}, Email: ${item.email}`
        );
      } else {
        console.log("err");
      }
    },
  },
});

export default User;
