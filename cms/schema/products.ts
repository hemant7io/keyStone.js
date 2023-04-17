import { list } from "@keystone-6/core";
import { text, image, integer, relationship } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";

import { hasSession, isAdmin } from "../acces";
const Product = list({
  access: {
    operation: {
      create: isAdmin,
      query: allowAll,
      update: hasSession,
      delete: isAdmin,
    },
  },
  fields: {
    title: text(),
    price: integer(),
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
    image: image({
      storage: "my_local_images",
    }),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    author: relationship({ ref: "User.posts", many: false }),
  },
});

export default Product;
