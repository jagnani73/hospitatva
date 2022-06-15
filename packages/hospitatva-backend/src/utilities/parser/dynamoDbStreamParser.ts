import { StreamRecord } from "aws-lambda";

export const parseRecord = (
  rawData: StreamRecord["NewImage"]
): Record<string, any> => {
  const toReturn: any = {};
  if (rawData) {
    for (const prop in rawData) {
      if (prop !== "data") {
        toReturn[`${prop}`] = rawData[prop]["S"];
      } else {
        toReturn["data"] = JSON.parse(rawData["data"]["S"] ?? "{}");
      }
    }
  }
  return toReturn;
};
