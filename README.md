# authorization-middleware

## Instalation

```bash 
npm install foxer360-authorization --save

```

## Standalone usage

```ts
import { applyMiddleware } from 'graphql-middleware'
import { makeExecutableSchema } from 'graphql-tools'
import authorizationMiddleware from 'foxer360-authorization'

const typeDefs = `
  type Query {
    hello(name: String): String
  }
`
const resolvers = {
  Query: {
    hello: (parent, { name }, context) => `Hello ${name ? name : 'world'}!`,
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const schemaWithMiddleware = applyMiddleware(
  schema,
  authorizationMiddleware('http://localhost:4001') // authorization api address
)
```

### Usage with `graphql-yoga`

> `graphql-yoga` has built-in support for `graphql-middleware`!

```ts
import { GraphQLServer } from 'graphql-yoga'
import authorizationMiddleware from 'foxer360-authorization';

const typeDefs = `
  type Query {
    hello(name: String): String
  }
`
const resolvers = {
  Query: {
    hello: (parent, { name }, context) => `Hello ${name ? name : 'world'}!`,
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  middlewares: [
    authorizationMiddleware('http://localhost:4001') // authorization api address
  ],
  documentMiddleware: [],
})
server.start(() => console.log('Server is running on localhost:4000'))
```