import { SSM } from "aws-sdk";
import fetch from "node-fetch";

let ssmResponse;

const ssm = new SSM();

export const rpcCall = async (id: string, method: string, params: any[]) => {
  try {
    ssmResponse = await ssm
      .getParameter({
        Name: "/sih-22-backend/INDEXER_NETWORK_URL",
        WithDecryption: true,
      })
      .promise();
    const networkUrl = ssmResponse.Parameter?.Value;
    if (!networkUrl)
      throw {
        isCustom: true,
        statusCode: 400,
        message: "Missing network URL parameter",
      };

    const body = JSON.stringify({
      id: id,
      jsonrpc: "2.0",
      method: method,
      params: params,
    });

    const response = await fetch(networkUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    const parsedRes: any = await response.json();

    return parsedRes.result;
  } catch (error) {
    console.log(JSON.stringify(error));
    throw {
      isCustom: true,
      statusCode: 500,
      message: JSON.stringify((error as any).message),
    };
  }
};
