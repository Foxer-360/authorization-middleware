# authorization-middleware

## Instalation

```bash 
npm install foxer360-authorization --save

```

## Getting started

```javascript
import { GraphQLServer } from 'graphql-yoga';
import authorizationMiddleware from 'foxer360-authorization';

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  middlewares: [
    authorizationMiddleware('http://localhost:4001') // authorization api address
  ],
});
```