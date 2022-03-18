import { DynamoDBStreamHandler } from "aws-lambda";
import { slidingWindowStorage } from "../../utilities/database/mongoDbService";

import { parseRecord } from "../../utilities/parser/dynamoDbStreamParser";

export const handler: DynamoDBStreamHandler = async (event) => {
  try {
    console.log("Triggered Inference DynamoDB Stream Handler");
    for (const record of event.Records) {
      if (record.eventName === "INSERT") {
        const parsedData = parseRecord(record.dynamodb?.NewImage);
        slidingWindowStorage(
          parseInt(parsedData.id),
          parseInt(parsedData.price),
          parsedData.address,
          parseInt(parsedData.available)
        );
      }
    }
    return;
  } catch (err) {
    console.error(`ERROR: Internal Server Error\n${JSON.stringify(err)}`);
    return;
  }
};
