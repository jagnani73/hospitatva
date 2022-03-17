import { DynamoDB } from "aws-sdk";
const dynamodb = new DynamoDB.DocumentClient();

export const insertDataToDynamoDB = async (tableName: string, data: any) => {
  await dynamodb
    .put({
      TableName: tableName,
      Item: data,
    })
    .promise();
};
