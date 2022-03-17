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
      .sort({ blockNumber: -1 })
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

export const addIndexedBlockToMongoDb = async (
  blockNumber: number,
  data: any
) => {
  await (await getDatabase())
    .collection("indexed-blocks")
    .insertOne({ blockNumber, data });
};

export const checkExisitngUser = async (
  did: string,
  publicAddress: string,
  email: string
) => {
  const existingUser = await (await getDatabase())
    .collection("magic-users")
    .findOne({ email });
  if (existingUser === null) {
    await (await getDatabase())
      .collection("magic-users")
      .insertOne({ did, publicAddress, email });
  }
};
