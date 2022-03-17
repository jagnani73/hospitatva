import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import { nanoid } from "nanoid";
import { insertDataToDynamoDB } from "../../utilities/database/dynamoDbService";

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  try {
    if (
      !event.queryStringParameters ||
      !event.queryStringParameters.walletAddress
    )
      throw {
        isCustom: true,
        statusCode: 400,
        message: "Empty or invalid request query string",
      };
    const nonce = nanoid(36);
    await insertDataToDynamoDB(process.env.NONCE_TABLE_NAME as string, {
      userWallet: event.queryStringParameters.walletAddress,
      nonce,
    });
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        walletAddress: event.queryStringParameters.walletAddress,
        nonce,
      }),
    };
  } catch (error) {
    console.error(error);
    const { isCustom, statusCode, message } = error as any;
    if (isCustom)
      return {
        statusCode,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      };
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: "Internal server error",
    };
  }
};
