import { request } from 'graphql-request';

export default authorizationServiceUrl => async (resolve, root, args, context, info) => {
  const { operation: gqlOperation } = info;

  if (context.request.headers.authorization) {
    const idToken = context.request.headers.authorization.includes('Bearer ')
      ? context.request.headers.authorization.replace('Bearer ', '')
      : context.request.headers.authorization;

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
