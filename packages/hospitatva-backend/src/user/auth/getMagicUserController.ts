import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import { nanoid } from "nanoid";
import { insertDataToDynamoDB } from "../../utilities/database/dynamoDbService";
import { verifyMagicToken } from "../../utilities/magic/magicService";

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  try {
    if (!event.body || !JSON.parse(event.body)["token"])
      throw {
        isCustom: true,
        statusCode: 400,
        message: "Empty or invalid request body",
      };
    await verifyMagicToken(
      JSON.parse(event.body)["token"],
      JSON.parse(event.body)["email"]
    );
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "User was verified successfully",
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
