import type { Contract } from "../types/contractTypes";
import {
  TransactionObj,
  TransitionEntry,
  EventLogEntry,
} from "@zilliqa-js/core";
// import { getQualifiedContracts } from "./getQualifiedContracts";
// import { getQualifiedEvents } from "./getQualifiedEvents";
import { AssetContractTypes } from "../../constants";

type QualifiedTransitionsAndContractsType = {
  qualifiedEvents: EventLogEntry[];
  qualifiedTransitions: TransitionEntry[];
  qualifiedContracts: Array<{
    type: typeof AssetContractTypes[keyof typeof AssetContractTypes];
    data: Contract;
    source_id?: string;
  }>;
};

/**
 * A contract is qualified if it is identified as an asset contract or a source contract.
 * A transition is qualified if it stems from a qualified contract and is idenfied as a standard transition conforming to supported ZRC standards (for asset contracts) or identified transitions (for source contracts).
 * An event is qualified if it is conforming to supported ZRC standards or identified to be from a source contract.
 * Supported ZRC standards: ZRC-1.
 * @param transactions The list of transactions.
 * @returns A list of qualified transitions, contracts, and events.
 */
export const getQualifiedData = async (
  transactions: TransactionObj[]
): Promise<void> => {
  // The list of events from the transactions. They are not filtered for qualification yet.
  const prequalifiedEvents: EventLogEntry[] = [];
  // The list of transitions from the transactions. They are not filtered for qualification yet.
  // @TODO: Uncomment when/if transitions are qualified.
  // const prequalifiedTransitions: TransitionEntry[] = [];
  // The set of contracts from the transactions. They are not filtered for qualification yet.
  // Note the use of Set instead of an array. We are likely to find multiple transactions regarding the same contract, hence we maintain an optimized set of the contract addresses.
  // Assumption: any event in a transaction stems from some transition in the same transaction.
  // @TODO: Uncomment when/if contracts are qualified.
  const prequalifiedContractsSet: any = new Set();
  // Collect the events and transitions from the transactions
  for (const transaction of transactions) {
    const transactionReciept = transaction?.receipt;

    // If the transaction was not successful, do not index it.
    if (!transactionReciept?.success) continue;

    console.log(JSON.stringify(transaction));
    // The event logs of the transaction
    const transactionEventLogs = transactionReciept?.event_logs ?? [];

    prequalifiedEvents.push(...transactionEventLogs);
    // @TODO: Uncomment when/if transitions are qualified.
    // prequalifiedTransitions.push(...transactionTransitions);
    // @TODO: Uncomment when/if contracts are qualified.
    for (const log of transactionEventLogs) {
      prequalifiedContractsSet.add(log.address);
    }
  }
  const prequalifiedContracts: string[] = Array.from(prequalifiedContractsSet);
  // console.log("prequalifiedContracts", prequalifiedContracts);

  // Qualifying the list of contracts
  // @TODO: Uncomment when/if contracts are qualified.
  //   const qualifiedContracts = await getQualifiedContracts(prequalifiedContracts);

  //   const qualifiedEvents = getQualifiedEvents(prequalifiedEvents);
  //   console.log(`qualifiedEvents :: ${JSON.stringify(qualifiedEvents)}`);
  //   console.log(`qualifiedContracts :: ${JSON.stringify(qualifiedContracts)}`);
  //   const toReturn = {
  //     qualifiedEvents: qualifiedEvents,
  //     // @TODO: Add real data once qualified transitions and contracts are calculated.
  //     qualifiedTransitions: [],
  //     qualifiedContracts: qualifiedContracts,
  //   };
  return;
};
