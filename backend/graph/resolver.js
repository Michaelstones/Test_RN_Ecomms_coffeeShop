const { v4: uuidv4 } = require("uuid");
const UTILS = require("../lib/utils");

const resolvers = {
  getAllUsers: async () => {
    try {
      const data = await UTILS.loadAndSetData();
      return data?.users || [];
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw new Error("Failed to fetch all users");
    }
  },
  getUser: async ({ id }) => {
    const data = await UTILS.loadAndSetData();
    return data?.users?.find((user) => user?.id === id);
  },

  getProduct: async ({ id }) => {
    const data = await UTILS.loadAndSetData();

    const coffeeProducts = data?.products?.coffee || [];
    const beanProducts = data?.products?.bean || [];

    const product = [...coffeeProducts, ...beanProducts].find(
      (item) => item.id === id
    );

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  },

  getAllProducts: async ({ first = 10, skip = 0 }) => {
    try {
      const data = await UTILS.loadAndSetData();

      const coffeeProducts = data?.products?.coffee || [];
      const beanProducts = data?.products?.bean || [];

      const paginatedCoffee = coffeeProducts.slice(skip, skip + first);
      const paginatedBean = beanProducts.slice(skip, skip + first);

      const paginatedProducts = [...paginatedCoffee, ...paginatedBean];

      return paginatedProducts;
    } catch (error) {
      console.error("Error fetching paginated products:", error);
      throw new Error("Failed to fetch paginated products");
    }
  },

  getOrder: async ({ id }) => {
    const data = await UTILS.loadAndSetData();
    return data?.orders?.find((order) => order?.id === id);
  },

  getAllOrders: async () => {
    const data = await UTILS.loadAndSetData();
    return data?.orders;
  },

  userOrders: async ({ userId }) => {
    const data = await UTILS.loadAndSetData();
    return data?.orders?.filter((order) => order?.userId === userId);
  },

  searchProducts: async ({ term }) => {
    const allProducts = await UTILS.loadAndSetData().products;
    return allProducts?.filter((product) =>
      product?.name?.toLowerCase()?.includes(term?.toLowerCase())
    );
  },

  createUser: async ({ email, password }) => {
    // Check if the email is already in use
    // console.log(email, password);
    const data = await UTILS.loadAndSetData();
    const existingUser = data?.users?.find((user) => user?.email === email);
    if (existingUser) {
      throw new Error("Email address is already in use");
    }
    const newUser = {
      id: uuidv4(),
      password,
      email,
    };
    data?.users?.push(newUser);
    return newUser;
  },

  addToCart: async ({ userId, productId, quantity }) => {
    const data = await UTILS.loadAndSetData();
    const user = data?.users?.find((user) => user?.id === userId);
    const accData = [...data?.products?.coffee, ...data?.products?.bean];
    const product = accData?.find((product) => product?.id === productId);
    // i could check for user but it could be undefined since the
    //server can reload on any write making volitility possible
    // for data that is not directly wriiten on disk.

    if (!product) {
      throw new Error("User or product not found");
    }

    const cartItem = {
      product,
      quantity,
    };

    // this might fail if the user is not found
    //but server wont crash as all error is handled in the backend
    // although not tough error monitoring tho
    user.cart = user.cart || [];
    user?.cart?.push(cartItem);
    return user;
  },

  createOrder: async ({ userId, productIds }) => {
    const data = await UTILS.loadAndSetData();
    const user = data?.users?.find((user) => user.id === userId);

    if (!user) {
      throw new Error("User not found");
    }

    const selectedProducts = data?.products?.filter((product) =>
      productIds?.includes(product.id)
    );

    if (selectedProducts.length !== productIds.length) {
      throw new Error("Invalid product IDs");
    }

    const order = {
      id: uuidv4(),
      userId,
      products: selectedProducts,
      status: "Pending",
    };

    data?.orders?.push(order);
    return order;
  },

  updateOrderStatus: async ({ orderId, status }) => {
    const data = await UTILS.loadAndSetData();
    const order = data?.orders?.find((order) => order.id === orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.status = status;
    return order;
  },
};

module.exports = resolvers;
