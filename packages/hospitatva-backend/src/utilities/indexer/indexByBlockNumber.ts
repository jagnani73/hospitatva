import { DynamoDB } from "aws-sdk";
import { updateLastIndexedBlock } from "../database/mongoDbService";
import { getAllEventsByBlock } from "./getAllEventsByBlock";

const dynamodb = new DynamoDB.DocumentClient();

const CONTRACT_ADDRESS = "0xe7dcf9184d66746dd5e01509c65f7255fb19db9c";

export const indexAndStoreByBlockNum = async (blockNum: number) => {
  const preQualifiedEvents = await getAllEventsByBlock(blockNum);
  await updateLastIndexedBlock(blockNum);
  await filterForQualifiedEvents(preQualifiedEvents);
};

const filterForQualifiedEvents = async (preQualifiedEvents: {
  events: any[];
}) => {
  for (let i = 0; i < preQualifiedEvents.events.length; i++) {
    let event = preQualifiedEvents.events[i];

    if (event["_eventname"] === "UpdateCommodity") {
      const value = event["params"][0]["value"];
      console.log(JSON.stringify(event));

      await dynamodb
        .put({
          TableName: process.env[`TABLE_NAME_${value}`] as string,
          Item: {
            updatedAt: Date.now().toString(),
            price: event["params"][2]["value"],
            id: value,
            address: event["address"],
            available: event["params"][1]["value"],
          },
        })
        .promise();
    }
  }
};
