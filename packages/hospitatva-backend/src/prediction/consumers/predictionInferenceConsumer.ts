import { DynamoDBStreamHandler } from "aws-lambda";

import { parseRecord } from "../../utilities/parser/dynamoDbStreamParser";

export const handler: DynamoDBStreamHandler = async (event) => {
  try {
    console.log("Triggered Sumsub DynamoDB Stream Handler");
    for (const record of event?.Records) {
      if (record.eventName === "INSERT") {
        const parsedData = parseRecord(record.dynamodb?.NewImage);
        console.log(`Incoming data: ${JSON.stringify(parsedData)}`);
      }
    }
    return;
  } catch (err) {
    console.error(`ERROR: Internal Server Error\n${JSON.stringify(err)}`);
    return;
  }
};
