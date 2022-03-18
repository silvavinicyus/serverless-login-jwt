import { unauthorizedJsonResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { verify } from 'jsonwebtoken';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const authorization = event.headers.Authorization;    

  const [, token] = authorization.split(' ');

  try {
    const { sub: username } = verify(token, 'fdebb3f8b539c29100e039fb55cee1e1');

    return formatJSONResponse({
      message: `Bem-vindo ao serverless ${ username }`
    });
  } catch {
    return unauthorizedJsonResponse({
      message: 'Invalid Token'
    });
  }  
};

export const main = middyfy(hello);
