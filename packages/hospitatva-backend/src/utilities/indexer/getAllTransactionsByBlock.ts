import { TransactionObj } from "@zilliqa-js/core";
import { nanoid } from "nanoid";
import type { AllTransactionsByBlockType } from "../types/customTypes";
import { rpcCall } from "./executeRpcCall";

/**
 *
 * @param blockNum The Block number to index.
 * @returns The list of transactions and the timestamp of the block.
 */
export const getAllTransactionsByBlock = async (
  blockNum: number
): Promise<AllTransactionsByBlockType> => {
  const id = nanoid();
  const blockNumberString = blockNum.toString();
  const response: any = await rpcCall(id, "GetTxBlock", [blockNumberString]);
  const pagesCount = response?.header?.NumPages ?? 0;
  const transactionsCount = response?.header?.NumTxns ?? 0;
  const timestamp = response?.header?.Timestamp;

  const transactions: TransactionObj[] = [];

  let page = 0;
  while (page < pagesCount) {
    const id = nanoid();
    try {
      const getTxnBodiesForTxBlockExResponse: any = await rpcCall(
        id,
        "GetTxnBodiesForTxBlockEx",
        [blockNumberString, page.toString()]
      );
      const pageTransactions =
        getTxnBodiesForTxBlockExResponse?.Transactions ?? [];
      transactions.push(...pageTransactions);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
    page += 1;
  }

  if (transactions.length != transactionsCount) {
    throw {
      isCutom: true,
      statusCode: 500,
      message: "Could not match transactions",
    };
  }

  return { transactions: transactions, timestamp: timestamp };
};
