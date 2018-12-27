import { request } from 'graphql-request';

export default authorizationServiceUrl => async (resolve, root, args, context, info) => {
  const { operation: gqlOperation } = info;
  const authorizationToken = (
    context &&
    context.headers &&
    context.headers.authorization
  ) || (
    context &&
    context.request &&
    context.request.headers &&
    context.request.headers.authorization
  );

  if (authorizationToken) {
    const idToken =
    authorizationToken.includes('Bearer ')
      ? authorizationToken.replace('Bearer ', '')
      : authorizationToken;

    const { hasUserPermission } = await request(
      authorizationServiceUrl,
      `
      query($idToken: String!, $gqlOperation: Json!) {
        hasUserPermission(idToken: $idToken gqlOperation: $gqlOperation)
      }
      `,
      {
        idToken,
        gqlOperation,
      },
    );

    if (hasUserPermission) {
      return resolve(root, args, context, info);
    }
  }

  throw Error('User hasn\'t permissions.');
};
