const { buildSchema } = require("graphql");

module.exports = buildSchema(
  `
type User {
  id: ID!
  password: String!
  email: String!
  cart: [CartItem]
  orders: [Order]
}
  
  type Price {
    size: String
    price: String
    currency: String
  }
  type CartItem {
  product: Product
  quantity: Int
}

  type Product {
    id: String
    name: String
    description: String
    roasted: String
    imagelink_square: String
    imagelink_portrait: String
    ingredients: String
    special_ingredient: String
    prices: [Price]
    average_rating: Float
    ratings_count: String
    favourite: Boolean
    type: String
    index: Int
  }

  type Order {
  id: ID!
  user: User!
  products: [Product]
  status: String
}
type Error {
  message: String!
}
type OrderResult {
  order: Order
  error: Error
}

  type Query {
  getUser(id: ID!): User
  getAllUsers: [User] 
  getAllProducts(first: Int, skip: Int): [Product]
  getProduct(id: String!): Product
  getOrder(id: ID!): Order
  getAllOrders: [Order]
  userOrders(userId: ID!): [Order]
  searchProducts(term: String!): [Product]
  }

  type Mutation {
  createUser(password: String!, email: String!): User
  addToCart(userId: ID!, productId: String!, quantity: Int!): User
  createOrder(userId: ID!): Order
  updateOrderStatus(orderId: ID!, status: String!): Order
  createOrderWithGuard(userId: ID!): OrderResult
}
`
);
