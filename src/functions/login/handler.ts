import { errorOnLoginJsonResponse, formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { sign } from 'jsonwebtoken';
import schema from './schema';


const login: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  if(event.body.username === 'vinicyus' && event.body.password === 'admin123') {
    const token = sign({}, 'fdebb3f8b539c29100e039fb55cee1e1', {
      subject: event.body.username,
      expiresIn: '1d'
    });

    return formatJSONResponse({
      username: event.body.username,
      token
    });
  } else {
    return errorOnLoginJsonResponse({
      message: `Username or password incorrect`,
    });
  }  
};

export const main = middyfy(login);
