import { nanoid } from "nanoid";
import { rpcCall } from "./executeRpcCall";

/**
 *
 * @param blockNum The Block number to index.
 * @returns The list of events of the block.
 */
export const getAllEventsByBlock = async (
  blockNum: number
): Promise<{ events: any[] }> => {
  const id = nanoid();
  const blockNumberString = blockNum.toString();
  const events = [];
  try {
    const getTxnBodiesForTxBlockResponse: any = await rpcCall(
      id,
      "GetTxnBodiesForTxBlock",
      [blockNumberString]
    );
    // console.log("TxnBodies:");
    // console.log(JSON.stringify(getTxnBodiesForTxBlockResponse));
    for (const txnBlock of getTxnBodiesForTxBlockResponse) {
      const eventLogs = txnBlock?.receipt?.["event_logs"] ?? [];
      events.push(...eventLogs);
    }
  } catch (e) {
    console.log(JSON.stringify(e));
  }
  return { events: events };
};
