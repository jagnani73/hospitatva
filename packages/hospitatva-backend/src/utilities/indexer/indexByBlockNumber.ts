import { updateLastIndexedBlock } from "../database/mongoDbService";
import { getAllEventsByBlock } from "./getAllEventsByBlock";

export const indexAndStoreByBlockNum = async (blockNum: number) => {
  const qualifiedEvents = await getAllEventsByBlock(blockNum);
  console.log(`Qualified Events: ${JSON.stringify(qualifiedEvents)}`);
  await updateLastIndexedBlock(blockNum);
};
