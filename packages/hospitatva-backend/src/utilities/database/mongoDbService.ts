import { SSM } from "aws-sdk";
import axios from "axios";
import { MongoClient, Db } from "mongodb";
import { idToChainNameMapper, nameToIdMapper } from "../idMapper";
import { IndexedBlock } from "../types/customTypes";
import { updatePriceList } from "../zilliqa/zilliqaService";

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

export const updateLastIndexedBlock = async (blockNum: number) => {
  const result = await (await getDatabase())
    .collection("indexed-blocks")
    .insertOne({
      blockNumber: +blockNum,
      timeIndexed: new Date().toISOString(),
    });
  if (!result.insertedId)
    throw {
      isCustom: true,
      statusCode: 500,
      message: "Could not insert last indexed block into MongoDB",
    };
  return result.insertedId;
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

export const slidingWindowStorage = async (
  id: number,
  price: number,
  address: string,
  available: number
) => {
  let existingWindow = await (await getDatabase())
    .collection(`sliding-windows`)
    .findOne<{
      id: number;
      window: number[];
      addresses: string[];
      count: number[];
    }>({ id });
  console.log(existingWindow);
  if (!existingWindow)
    existingWindow = { id, window: [], addresses: [], count: [] };
  existingWindow.window.push(price);
  existingWindow.addresses.push(address);
  existingWindow.count.push(available);
  await (await getDatabase())
    .collection("persistent-hospital-record")
    .updateOne(
      { id },
      {
        $set: {
          id: existingWindow.id,
          window: existingWindow.window,
          addresses: existingWindow.addresses,
          count: existingWindow.count,
        },
      },
      { upsert: true }
    );
  if (existingWindow.window.length == 31) {
    const data = await axios.post("http://139.59.53.149/predict", {
      data_points: existingWindow.window,
    });
    console.log(data.data);
    await updatePriceList(
      (await idToChainNameMapper(id as unknown as string)) as string,
      data.data.Pred,
      id as unknown as string
    );
    return await (await getDatabase()).collection("sliding-windows").updateOne(
      { id },
      {
        $set: { id: existingWindow.id, window: [], addresses: [], count: [] },
      },
      { upsert: true }
    );
  }

  await (await getDatabase()).collection("sliding-windows").updateOne(
    { id },
    {
      $set: {
        id: existingWindow.id,
        window: existingWindow.window,
        addresses: existingWindow.addresses,
        count: existingWindow.count,
      },
    },
    { upsert: true }
  );
};

export const getInventoryData = async () => {
  return await (await getDatabase())
    .collection("inventory")
    .find<{ id: string; name: string; chainName: string }>({})
    .toArray();
};

export const getHospitalData = async () => {
  let finalData = {};
  const basicData = await (await getDatabase())
    .collection("persistent-hospital-record")
    .findOne<{ id: number; hospitals: any[] }>({ id: 0 });
  for (let i = 0; i < (basicData?.hospitals as any[]).length; i++) {
    let hospital = basicData?.hospitals[i];
    for (let j = 0; j < hospital.commodities.length; j++) {
      let commodity = hospital.commodities[j];
      let id = await nameToIdMapper(commodity.name);
      const data = await (await getDatabase())
        .collection("persistent-hospital-record")
        .findOne<{
          id: number;
          window: number[];
          addresses: string[];
          count: number[];
        }>({ id });
      let index = data?.addresses
        .reverse()
        .findIndex((element) => element === hospital.contract);

      hospital.commodities[j].available = data?.count[index as number];
      hospital.commodities[j].price = data?.window[index as number];
    }
  }
  finalData = { hospitals: basicData?.hospitals };
  return finalData;
};
