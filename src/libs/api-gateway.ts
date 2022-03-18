import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export const unauthorizedJsonResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 401,
    body: JSON.stringify(response)
  }
}

export const errorOnLoginJsonResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 400,
    body: JSON.stringify(response)
  }
}
