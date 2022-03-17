import { nanoid } from "nanoid";
import { getLastIndexedBlock } from "../utilities/database/mongoDbService";
import { rpcCall } from "../utilities/indexer/executeRpcCall";
import { indexAndStoreByBlockNum } from "../utilities/indexer/indexByBlockNumber";

export const indexBlocksByTime = async (event: any) => {
  try {
    const rpcResponse = await rpcCall(nanoid(), "GetLatestTxBlock", []);
    const latestBlockNum = rpcResponse?.header?.BlockNum;
    if (!latestBlockNum)
      throw {
        isCustom: true,
        statusCode: 500,
        message: "No block was fetched with the RPC call",
      };
    const latestBlockNumInt = parseInt(latestBlockNum);
    console.log("latestBlockNum:", latestBlockNum);

    const lastIndexedBlock = await getLastIndexedBlock();
    if (lastIndexedBlock.blockNumber >= latestBlockNumInt) return;

    let toIndex = lastIndexedBlock.blockNumber + 1;
    while (toIndex <= latestBlockNumInt) {
      console.log("Currently Indexing:", toIndex);
      await indexAndStoreByBlockNum(toIndex);
      toIndex++;
    }
  } catch (error) {
    return console.error(JSON.stringify(error));
  }
};
