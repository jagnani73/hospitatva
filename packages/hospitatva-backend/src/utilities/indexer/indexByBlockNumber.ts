import { updateLastIndexedBlock } from "../database/mongoDbService";
import { getAllEventsByBlock } from "./getAllEventsByBlock";

export const indexAndStoreByBlockNum = async (blockNum: number) => {
  const preQualifiedEvents = await getAllEventsByBlock(blockNum);
  console.log(`Pre-Qualified Events: ${JSON.stringify(preQualifiedEvents)}`);
  //TODO: Qualified Events Filter
  //TODO: Store in Appropriate DynamoDB
  await updateLastIndexedBlock(blockNum);
};
