import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getHospitalData } from "../utilities/database/mongoDbService";

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  try {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(await getHospitalData()),
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
