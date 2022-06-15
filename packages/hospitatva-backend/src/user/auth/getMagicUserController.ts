import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import { SSM } from "aws-sdk";
import { verifyMagicToken } from "../../utilities/magic/magicService";

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  try {
    const body = JSON.parse(event.body as string);
    const ssm = new SSM();
    const ssmResponse = await ssm
      .getParameter({
        Name: "/sih-22-backend/MAGIC_API_KEY",
        WithDecryption: true,
      })
      .promise();
    const magicApiKey = ssmResponse.Parameter?.Value;

    if (!body || !body.token || !body.email)
      throw {
        isCustom: true,
        statusCode: 400,
        message: "Empty or invalid request body",
      };
    await verifyMagicToken(body.token, body.email, magicApiKey as string);
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
