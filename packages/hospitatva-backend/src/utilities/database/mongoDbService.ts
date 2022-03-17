import { SSM } from "aws-sdk";
import { MongoClient, Db } from "mongodb";
import { IndexedBlock } from "../types/customTypes";

let db: Db;
let ssmResponse;

const ssm = new SSM();

const mongoInit = async () => {
  ssmResponse = await ssm
    .getParameter({
      Name: "/sih-22-backend/MONGODB_URI",
      WithDecryption: true,
    })
    .promise();
  const mongoUri = ssmResponse.Parameter?.Value;
  if (!mongoUri)
    throw { isCustom: true, statusCode: 404, message: "Missing MongoDB URI" };
  const client = new MongoClient(mongoUri as string);
  db = (await client.connect()).db();
};

const getDatabase = async () => {
  if (!db) {
    await mongoInit();
  }
  return db;
};

export const getLastIndexedBlock = async () => {
  const lastIndexedBlock = (
    await (await getDatabase())
      .collection("indexed-blocks")
      .find<IndexedBlock>({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray()
  )[0];
  if (!lastIndexedBlock)
    throw {
      isCustom: true,
      statusCode: 404,
      message: "Could not fetch last indexed block from MongoDB",
    };
  return lastIndexedBlock;
};
