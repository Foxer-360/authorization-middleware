import { request } from 'graphql-request';

export default authorizationServiceUrl => async (resolve, root, args, context, info) => {
  const { operation: gqlOperation } = info;
  const authorizationToken = (
    context
    && context.headers
    && context.headers.authorization
  ) || (
    context
    && context.request
    && context.request.headers
    && context.request.headers.authorization
  );

  const token = authorizationToken && authorizationToken.includes('Bearer ')
    ? authorizationToken.replace('Bearer ', '')
    : authorizationToken;

  const { hasUserPermission } = await request(
    authorizationServiceUrl,
    `
    query($token: String, $isUserAnonymous: Boolean, $gqlOperation: Json!) {
      hasUserPermission(token: $token  isUserAnonymous: $isUserAnonymous gqlOperation: $gqlOperation)
    }
    `,
    {
      ...(token ? { token } : { isUserAnonymous: true }),
      gqlOperation,
    },
  );

  if (hasUserPermission) {
    return resolve(root, args, context, info);
  }

  throw Error('User hasn\'t permissions.');
};