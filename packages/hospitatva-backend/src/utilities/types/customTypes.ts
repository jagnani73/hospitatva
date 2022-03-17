import { TransactionObj } from "@zilliqa-js/core";

export type TransactionType = {
  ID: string;
  version: string;
  nonce: number;
  toAddr: string;
  code: string;
  data: string;
  amount: string;
  gasPrice: string;
  gasLimit: string;
  signature: string;
  receipt: TransactionReceiptType;
};

type TransactionReceiptType = {
  success: boolean;
  cumulative_gas: string;
  event_logs: EventLogEntryType[];
};

type EventLogEntryType = {
  address: string;
  _eventname: string;
  params: EventParamType[];
};

type EventParamType = {
  vname: string;
  type: string;
  value: string;
};

export type AllTransactionsByBlockType = {
  transactions: TransactionObj[];
  timestamp: string | undefined;
};

export interface IndexedBlock {
  blockNumber: number;
  data: any;
}
