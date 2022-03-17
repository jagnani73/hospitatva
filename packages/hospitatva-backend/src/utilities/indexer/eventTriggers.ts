import { EventLogEntry } from "@zilliqa-js/core";
import { toBech32Address } from "@zilliqa-js/crypto";
import { nanoid } from "nanoid";
import fetch from "node-fetch";

import { ContractState } from "../types/contractStateTypes";
import {
  AcceptContractOwnershipEvent,
  AddMinterEvent,
  BatchBurnEvent,
  BatchMintEvent,
  BatchTransferFromEvent,
  BurnEvent,
  CancelOrderEvent,
  SetOrderEvent,
  isBatchMintEvent,
  MintEvent,
  PauseEvent,
  RemoveMinterEvent,
  SetBaseURIEvent,
  SetContractOwnershipRecipientEvent,
  SetRoyaltyFeeBPSEvent,
  SetRoyaltyRecipientEvent,
  SetSpenderEvent,
  TransferFromEvent,
  UnpauseEvent,
  FulfillOrderEvent,
  StartEvent,
  BidEvent,
  CancelEvent,
} from "../types/qualifiedEventsTypes";
import { rpcCall } from "./executeRpcCall";
import { getSupabaseClient } from "../database/supabaseService";
import { Contract } from "../types/contractTypes";
import { AssetContractTypes } from "../../constants";
import { identifyCurrencyByTokenAddress } from "./identifyCurrencyByTokenAddress";

export const triggerPauseUnpause = async (
  event: PauseEvent | UnpauseEvent | EventLogEntry
) => {
  const bech32addr = toBech32Address(event.address);
  const response = await rpcCall(nanoid(), "GetSmartContractSubState", [
    bech32addr,
    "is_paused",
    [],
  ]);
  // console.log(`${event._eventname} : ${event.address}`);
  // console.dir(response, { depth: null });
  const { data, error } = await getSupabaseClient()
    .from("assets")
    .update({
      contractPaused:
        response["is_paused"]?.constructor === "False" ? false : true,
    })
    .match({
      contractAddress: event.address,
    });
  // console.log(data);
};

const updateTokenCountAndSupply = async (
  contract_addr: string,
  token_count: string,
  total_supply: string
) => {
  const { data, error } = await getSupabaseClient()
    .from("contracts")
    .update({
      tokenCount: token_count,
      totalSupply: total_supply,
    })
    .match({
      contractAddress: contract_addr,
    });
  // console.log(data);
};
/**
 * The function takes in a event log and a token ID, to update the database regarding a newly minted token.
 * It first fetches the current contract state, update the total supply and token count, checks if the token is already indexed or not, fetches the metadata of the token and then inserts the token details in the asset database.
 * @param token_id The token ID to be minted
 * @param event The event object
 */
const updateMintDetails = async (
  token_id: string,
  event: MintEvent | BatchMintEvent | EventLogEntry,
  minter_address?: string
) => {
  const bech32addr = toBech32Address(event.address);
  const supabase = getSupabaseClient();
  const state: ContractState = await rpcCall(
    nanoid(),
    "GetSmartContractState",
    [bech32addr]
  );
  console.dir(state, { depth: null });
  await updateTokenCountAndSupply(
    event.address,
    state.token_id_count,
    state.total_supply
  );
  const { data: duplicates, error } = await supabase
    .from("assets")
    .select()
    .eq("contractAddress", event.address)
    .eq("tokenId", token_id);
  console.log(JSON.stringify(duplicates));
  if (duplicates!.length > 0) {
    throw Error("Duplicate issue");
  }

  // if a token URI is explicitly set, use that. Otherwise, use the <base_uri><token_id>
  let tokenUri = state.token_uris?.[token_id];
  if (!tokenUri) tokenUri = `${state.base_uri}${token_id}`;

  let toInsert = {
    contractAddress: event.address,
    minterAddress: (() => {
      if (isBatchMintEvent(event)) {
        return minter_address;
      } else {
        return event.params.find((e) => e.vname === "to")?.value;
      }
    })(),
    tokenId: token_id,
    ownerAddress: state.token_owners?.[token_id] ?? null,
    contractPaused: state.is_paused?.constructor === "True" ? true : false,
    tokenUri: tokenUri,
    spenderAddress: state.spenders?.[token_id] ?? null,
    operatorAddress: (() => {
      const own = state.token_owners?.[token_id];
      if (!own) return null;
      const ops: string[] = [];
      for (const op in state.operators[own]) {
        if (state.operators[own][op]?.constructor === "True") ops.push(op);
      }
      return ops;
    })(),
    royaltyRecipient: state.royalty_recipient ?? null,
    royaltyFeeBps: state.royalty_fee_bps ?? null,
    name: null,
    description: null,
    resource: null,
    resourceMimetype: null,
    externalUrl: null,
    externalDescription: null,
    attributes: null,
  };
  try {
    // console.log(JSON.stringify(toInsert.tokenUri));
    const res = await fetch(`${toInsert.tokenUri}`);
    const metadata = (await res.json()) as unknown as any;
    // console.log(metadata);
    toInsert.name = metadata?.name ?? null;
    toInsert.description = metadata?.description ?? null;
    toInsert.resource = metadata?.resource ?? null;
    toInsert.resourceMimetype = metadata?.resource_mimetype ?? null;
    toInsert.externalUrl = metadata?.external_url ?? null;
    toInsert.externalDescription = metadata?.external_description ?? null;
    toInsert.attributes = metadata?.attributes ?? [];
  } catch (err) {
    console.error(err);
    throw Error(`Metadata not found ${toInsert.tokenUri}`);
  }
  const { data: result, error: insertError } = await supabase
    .from("assets")
    .insert(toInsert);
  // console.log(result);
};

export const triggerMint = async (event: MintEvent | EventLogEntry) => {
  const tokenId =
    event.params[0]["vname"] === "token_id"
      ? event.params[0].value
      : event.params[1].value;
  // console.log(`Token ID: ${tokenId}`);
  await updateMintDetails(tokenId, event);
};

export const triggerSetRoyaltyRecipient = async (
  event: SetRoyaltyRecipientEvent | EventLogEntry
) => {
  const bech32addr = toBech32Address(event.address);
  const response = await rpcCall(nanoid(), "GetSmartContractSubState", [
    bech32addr,
    "royalty_recipient",
    [],
  ]);
  // console.log(`${event._eventname} : ${event.address}`);
  // console.dir(response, { depth: null });
  const { data, error } = await getSupabaseClient()
    .from("assets")
    .update({
      royaltyRecipient: response["royalty_recipient"],
    })
    .match({
      contractAddress: event.address,
    });
  // console.log(data);
};

export const triggerSetRoyaltyFeeBPS = async (
  event: SetRoyaltyFeeBPSEvent | EventLogEntry
) => {
  const bech32addr = toBech32Address(event.address);
  const response = await rpcCall(nanoid(), "GetSmartContractSubState", [
    bech32addr,
    "royalty_fee_bps",
    [],
  ]);
  // console.log(`${event._eventname} : ${event.address}`);
  // console.dir(response, { depth: null });
  const { data, error } = await getSupabaseClient()
    .from("assets")
    .update({
      royaltyFeeBps: response["royalty_fee_bps"],
    })
    .match({
      contractAddress: event.address,
    });
  // console.log(data);
};

const transferOwnership = async (
  token_id: string,
  event: TransferFromEvent | BatchTransferFromEvent
) => {
  const bech32addr = toBech32Address(event.address);
  const response = await rpcCall(nanoid(), "GetSmartContractSubState", [
    bech32addr,
    "token_owners",
    [token_id],
  ]);
  // console.log(response);
  const { data, error } = await getSupabaseClient()
    .from("assets")
    .update({
      ownerAddress: response["token_owners"][token_id],
    })
    .match({
      contractAddress: event.address,
      tokenId: token_id,
    });
  // console.log(data);
};

export const triggerTransferFrom = async (
  event: TransferFromEvent | EventLogEntry
) => {
  const tokenId = event.params.find((e) => e.vname === "token_id")?.value;
  console.log(`${event._eventname}: ${event.address} :: ${tokenId}`);
  if (tokenId) {
    await transferOwnership(tokenId, event as TransferFromEvent);
  }
};

export const triggerBurn = async (event: BurnEvent | EventLogEntry) => {
  const bech32addr = toBech32Address(event.address);
  const tokenId = event.params.find((e) => e.vname === "token_id")?.value;
  const response: ContractState = await rpcCall(
    nanoid(),
    "GetSmartContractState",
    [bech32addr]
  );
  await updateTokenCountAndSupply(
    event.address,
    response.token_id_count,
    response.total_supply
  );
  const { data, error } = await getSupabaseClient()
    .from("assets")
    .delete()
    .match({
      contractAddress: event.address,
      tokenId,
    });
  console.log(data);
};

export const triggerSetContractOwnershipRecipient = async (
  event: SetContractOwnershipRecipientEvent | EventLogEntry
) => {
  const bech32addr = toBech32Address(event.address);
  const response = await rpcCall(nanoid(), "GetSmartContractSubState", [
    bech32addr,
    "contract_ownership_recipient",
    [],
  ]);
  console.log(response);
  const { data, error } = await getSupabaseClient()
    .from("contracts")
    .update({
      contractOwnershipRecipient: response["contract_ownership_recipient"],
    })
    .match({
      contractAddress: event.address,
    });
  console.log(data);
};

export const triggerAcceptContractOwnership = async (
  event: AcceptContractOwnershipEvent | EventLogEntry
) => {
  const bech32addr = toBech32Address(event.address);
  const response: ContractState = await rpcCall(
    nanoid(),
    "GetSmartContractState",
    [bech32addr]
  );
  console.log(response);
  const { data, error } = await getSupabaseClient()
    .from("contracts")
    .update({
      ownerAddress: response["contract_owner"],
      contractOwnershipRecipient: response["contract_ownership_recipient"],
    })
    .match({
      contractAddress: event.address,
    });
  console.log(data);
};

export const triggerAddMinterRemoveMinter = async (
  event: AddMinterEvent | RemoveMinterEvent | EventLogEntry
) => {
  const bech32addr = toBech32Address(event.address);
  const response = await rpcCall(nanoid(), "GetSmartContractSubState", [
    bech32addr,
    "minters",
    [],
  ]);
  console.log(response);
  const minters = [];
  for (const mnt in response["minters"]) {
    if (response["minters"][mnt].constructor === "True") {
      minters.push(mnt);
    }
  }
  const { data, error } = await getSupabaseClient()
    .from("contracts")
    .update({
      minterAddresses: minters,
    })
    .match({
      contractAddress: event.address,
    });
  // console.log(data);
};

export const triggerSetSpender = async (
  event: SetSpenderEvent | EventLogEntry
) => {
  const tokenId = event.params.find((e) => e.vname === "token_id")?.value;
  const bech32addr = toBech32Address(event.address);
  const response = await rpcCall(nanoid(), "GetSmartContractSubState", [
    bech32addr,
    "spenders",
    [tokenId],
  ]);
  console.log(response);
  const supabase = getSupabaseClient();
  const exists = await supabase
    .from("assets")
    .select()
    .eq("contractAddress", event.address)
    .eq("tokenId", tokenId);
  if ((exists as unknown as Array<any>)?.length === 0) {
    throw Error("Asset not indexed");
  }
  const { data, error } = await supabase
    .from("assets")
    .update({
      spenderAddress: response["spenders"][tokenId],
    })
    .match({
      contractAddress: event.address,
      tokenId,
    });
  console.log(data);
};

export const triggerSetBaseURI = async (
  event: SetBaseURIEvent | EventLogEntry
) => {
  console.log(`${event._eventname}: ${event.address}`);
  const bech32addr = toBech32Address(event.address);
  const response: ContractState = await rpcCall(
    nanoid(),
    "GetSmartContractState",
    [bech32addr]
  );
  const updatedBaseURI = response["base_uri"];
  // We assume that baseUri takes precedence
  // @TODO: to fix https://github.com/Quinence/zilliqa-nft-indexer/issues/10
  for (const tokenId of Object.keys(response["token_owners"])) {
    let toInsert = {
      tokenUri: `${updatedBaseURI}${tokenId}`,
      name: null,
      description: null,
      resource: null,
      resourceMimetype: null,
      externalUrl: null,
      externalDescription: null,
      attributes: null,
    };
    try {
      const res = await fetch(`${toInsert.tokenUri}`);
      const metadata = (await res.json()) as unknown as any;
      toInsert.name = metadata.name ?? null;
      toInsert.description = metadata.description ?? null;
      toInsert.resource = metadata.resource ?? null;
      toInsert.resourceMimetype = metadata.resource_mimetype ?? null;
      toInsert.externalUrl = metadata.external_url ?? null;
      toInsert.externalDescription = metadata.external_description ?? null;
      toInsert.attributes = metadata.attributes ?? [];
    } catch (err) {
      console.error(err);
      throw Error(`Metadata not found ${toInsert.tokenUri}`);
    }
    const { data, error } = await getSupabaseClient()
      .from("assets")
      .update(toInsert)
      .match({
        contractAddress: event.address,
        tokenId,
      });
    console.log(data);
  }
};

export const triggerBatchMint = async (
  event: BatchMintEvent | EventLogEntry
) => {
  const minters: Array<string> = event.params.find(
    (e) => e.vname === "to_list"
  )?.value;
  const startId = +event.params.find((e) => e.vname === "start_id")?.value;
  const endId = +event.params.find((e) => e.vname === "end_id")?.value;
  for (let id = startId; id <= endId; id++) {
    await updateMintDetails(`${id}`, event, minters[0]);
    minters.shift();
  }
};

export const triggerBatchBurn = async (
  event: BatchBurnEvent | EventLogEntry
) => {
  const bech32addr = toBech32Address(event.address);
  const tokenList = event.params.find(
    (e) => e.vname === "token_id_list"
  )?.value;
  const response: ContractState = await rpcCall(
    nanoid(),
    "GetSmartContractState",
    [bech32addr]
  );
  await updateTokenCountAndSupply(
    event.address,
    response.token_id_count,
    response.total_supply
  );
  for (const tokenId of tokenList) {
    const { data, error } = await getSupabaseClient()
      .from("assets")
      .delete()
      .match({
        contractAddress: event.address,
        tokenId,
      });
    console.log(data);
  }
};

export const triggerBatchTransferFrom = async (
  event: BatchTransferFromEvent | EventLogEntry
) => {
  for (const pair of (event as BatchTransferFromEvent).params[0].value) {
    await transferOwnership(pair.arguments[1], event as BatchTransferFromEvent);
  }
};
/**
 * Sorts the keys of the object alphabetically
 * @param obj The object to sort
 * @param keys The array of keys of the object
 * @returns Object with keys sorted in order
 */
const sortKeys = (obj: any, keys: Array<string>) => {
  return keys.reduce((o: any, key: string) => {
    o[key] = obj[key];
    return o;
  }, {});
};

/**
 * Appends an object to an already defined set of objects
 * @param data The set of object
 * @param toBeInserted The object to be inserted
 * @returns The updated object set
 */
const updateObjectSet = (data: any[], toBeInserted: any): any[] => {
  const sortedKeys = Object.keys(toBeInserted).sort();
  data = data.map((d) => {
    return sortKeys(d, sortedKeys);
  });
  console.log(`data(sorted): ${JSON.stringify(data)}`);
  const set = new Set(data.map((d) => JSON.stringify(d))).add(
    JSON.stringify(sortKeys(toBeInserted, sortedKeys))
  );
  const arrayOfStrings = Array.from(set);
  const arrayOfUniqueObjects = arrayOfStrings.map((a) => JSON.parse(a));
  return arrayOfUniqueObjects;
};

export const triggerSetOrder = async (
  event: SetOrderEvent | EventLogEntry,
  source_id: string,
  source_type: typeof AssetContractTypes[keyof typeof AssetContractTypes]
) => {
  console.log("trigger SetOrder");
  const { data, error } = await getSupabaseClient()
    .from("assets")
    .select("listingData, sources")
    .match({
      contractAddress: event.params.find((e) => e.vname === "token_address")
        ?.value,
      tokenId: event.params.find((e) => e.vname === "token_id")?.value,
    });
  if (!data || data?.length <= 0) return;

  const { listingData, sources } = data[0] as Contract;
  const paymentTokenAddress = event?.params.find(
    (e) => e.vname === "payment_token_address"
  )?.value;
  const buyOrSellSide =
    event?.params.find((e) => e.vname === "side")?.value === "0"
      ? "SELL"
      : "BUY";
  let toInsertListingData = { ...listingData };
  let toInsertSources = Array.from(new Set(sources).add(source_id));
  const newData = {
    maker: event?.params.find((e) => e.vname === "maker")?.value as string,
    amount: +(event?.params.find((e) => e.vname === "sale_price")
      ?.value as string),
    unit: "QA",
    currency: identifyCurrencyByTokenAddress(paymentTokenAddress),
    expirationInBlockNumber: event?.params.find(
      (e) => e.vname === "expiration_bnum"
    )?.value as string,
  };
  if (listingData?.[source_id]) {
    console.log("listing exists");
    toInsertListingData[source_id].marketplaceContractAddress =
      listingData?.[source_id].marketplaceContractAddress ?? event.address;
    if (buyOrSellSide === "BUY") {
      const updatedBuyOrderSet = updateObjectSet(
        listingData?.[source_id].data.buyOrders,
        newData
      );
      console.log(listingData?.[source_id].data.buyOrders);
      console.log(`updatedBuyOrderSet, ${JSON.stringify(updatedBuyOrderSet)}`);
      toInsertListingData[source_id].data.buyOrders = updatedBuyOrderSet;
    } else {
      const updatedSellOrderSet = updateObjectSet(
        listingData?.[source_id].data.sellOrders,
        newData
      );
      console.log(
        `updatedSellOrderSet, ${JSON.stringify(updatedSellOrderSet)}`
      );
      toInsertListingData[source_id].data.sellOrders = updatedSellOrderSet;
    }
  } else {
    if (buyOrSellSide === "BUY") {
      toInsertListingData[source_id] = {
        listingType: source_type,
        marketplaceContractAddress: event.address,
        data: {
          buyOrders: [newData],
          sellOrders: [],
        },
      };
    } else {
      toInsertListingData[source_id] = {
        listingType: source_type,
        marketplaceContractAddress: event.address,
        data: {
          buyOrders: [],
          sellOrders: [newData],
        },
      };
    }
  }
  const { data: resultData, error: resultError } = await getSupabaseClient()
    .from("assets")
    .update({
      listingData: toInsertListingData,
      sources: toInsertSources,
    })
    .match({
      contractAddress: event.params.find((e) => e.vname === "token_address")
        ?.value,
      tokenId: event.params.find((e) => e.vname === "token_id")?.value,
    });
  console.log(resultData);
};

export const triggerCancelOrder = async (
  event: CancelOrderEvent | EventLogEntry,
  source_id: string
) => {
  console.log("trigger CancelOrder");
  const { data, error } = await getSupabaseClient()
    .from("assets")
    .select("listingData")
    .match({
      contractAddress: event.params.find((e) => e.vname === "token_address")
        ?.value,
      tokenId: event.params.find((e) => e.vname === "token_id")?.value,
    });
  if (!data || data?.length <= 0) return;
  const { listingData } = data[0] as Contract;
  if (!listingData?.[source_id]) throw Error("Marketplace not found");
  const paymentTokenAddress = event?.params.find(
    (e) => e.vname === "payment_token_address"
  )?.value;
  const buyOrSellSide =
    event?.params.find((e) => e.vname === "side")?.value === "0"
      ? "SELL"
      : "BUY";
  let toInsertListingData = { ...listingData };
  if (buyOrSellSide === "BUY") {
    toInsertListingData[source_id].data.buyOrders = toInsertListingData[
      source_id
    ].data.buyOrders.filter((buyOrder) => {
      if (
        buyOrder.unit === "QA" &&
        buyOrder.maker ===
          (event?.params.find((e) => e.vname === "maker")?.value as string) &&
        buyOrder.amount ===
          +(event?.params.find((e) => e.vname === "sale_price")
            ?.value as string) &&
        buyOrder.currency ===
          identifyCurrencyByTokenAddress(paymentTokenAddress) &&
        buyOrder.expirationInBlockNumber ===
          (event?.params.find((e) => e.vname === "expiration_bnum")
            ?.value as string)
      )
        return false;
      return true;
    });
  } else {
    toInsertListingData[source_id].data.sellOrders = toInsertListingData[
      source_id
    ].data.sellOrders.filter((sellOrder) => {
      if (
        sellOrder.unit === "QA" &&
        sellOrder.maker ===
          (event?.params.find((e) => e.vname === "maker")?.value as string) &&
        sellOrder.amount ===
          +(event?.params.find((e) => e.vname === "sale_price")
            ?.value as string) &&
        sellOrder.currency ===
          identifyCurrencyByTokenAddress(paymentTokenAddress) &&
        sellOrder.expirationInBlockNumber ===
          (event?.params.find((e) => e.vname === "expiration_bnum")
            ?.value as string)
      )
        return false;
      return true;
    });
  }
  console.log("toInsertListingData", JSON.stringify(toInsertListingData));
  const { data: resultData, error: resultError } = await getSupabaseClient()
    .from("assets")
    .update({
      listingData: toInsertListingData,
    })
    .match({
      contractAddress: event.params.find((e) => e.vname === "token_address")
        ?.value,
      tokenId: event.params.find((e) => e.vname === "token_id")?.value,
    });
  console.log(resultData);
};

export const triggerFulfillOrder = async (
  event: FulfillOrderEvent | EventLogEntry,
  source_id: string
) => {
  console.log("trigger FulfillOrder");
  console.log(`source_id: ${source_id}`);
  const { data, error } = await getSupabaseClient()
    .from("assets")
    .select("listingData")
    .match({
      contractAddress: event.params.find((e) => e.vname === "token_address")
        ?.value,
      tokenId: event.params.find((e) => e.vname === "token_id")?.value,
    });
  if (!data || data?.length <= 0) return;
  const { listingData } = data[0] as Contract;
  if (!listingData?.[source_id]) throw Error("Market place listing not found");
  const paymentTokenAddress = event?.params.find(
    (e) => e.vname === "payment_token_address"
  )?.value;
  const buyOrSellSide =
    event?.params.find((e) => e.vname === "side")?.value === "0"
      ? "SELL"
      : "BUY";
  let toInsertListingData = { ...listingData };
  toInsertListingData[source_id].marketplaceContractAddress =
    listingData?.[source_id].marketplaceContractAddress ?? event.address;
  if (buyOrSellSide === "BUY") {
    toInsertListingData[source_id].data.buyOrders = toInsertListingData[
      source_id
    ].data.buyOrders.filter((buyOrder) => {
      if (
        buyOrder.amount ===
        +(event?.params.find((e) => e.vname === "sale_price")?.value as string)
      )
        return false;
      return true;
    });
  }

  toInsertListingData[source_id].data.sellOrders = [];
  toInsertListingData[source_id].data.fulfilled = true;
  toInsertListingData[source_id].data.fulfilledData = {
    amount: +event?.params.find((e) => e.vname === "sale_price")?.value,
    buyer: event?.params.find((e) => e.vname === "buyer")?.value,
    currency: identifyCurrencyByTokenAddress(paymentTokenAddress),
    seller: event?.params.find((e) => e.vname === "seller")?.value,
    type: buyOrSellSide,
    unit: "QA",
  };
  console.log(
    `fulfilledData: ${JSON.stringify(
      toInsertListingData[source_id].data.fulfilledData
    )}`
  );
  const { data: resultData, error: resultError } = await getSupabaseClient()
    .from("assets")
    .update({
      listingData: toInsertListingData,
    })
    .match({
      contractAddress: event.params.find((e) => e.vname === "token_address")
        ?.value,
      tokenId: event.params.find((e) => e.vname === "token_id")?.value,
    });
  console.log(resultData);
};

export const triggerStart = async (
  event: StartEvent | EventLogEntry,
  source_id: string,
  source_type: typeof AssetContractTypes[keyof typeof AssetContractTypes]
) => {
  console.log("trigger Start");
  console.log(`source_id: ${source_id}`);
  const { data, error } = await getSupabaseClient()
    .from("assets")
    .select("listingData")
    .match({
      contractAddress: event.params.find((e) => e.vname === "token_address")
        ?.value,
      tokenId: event.params.find((e) => e.vname === "token_id")?.value,
    });
  if (!data || data?.length <= 0) return;

  const { listingData, sources } = data[0] as Contract;
  const paymentTokenAddress = event?.params.find(
    (e) => e.vname === "payment_token_address"
  )?.value;
  let toInsertListingData = { ...listingData };
  let toInsertSources = Array.from(new Set(sources).add(source_id));
  const newData = {
    maker: event?.params.find((e) => e.vname === "maker")?.value as string,
    amount: +(event?.params.find((e) => e.vname === "start_amount")
      ?.value as string),
    unit: "QA",
    currency: identifyCurrencyByTokenAddress(paymentTokenAddress),
    expirationInBlockNumber: event?.params.find(
      (e) => e.vname === "expiration_bnum"
    )?.value as string,
  };
  if (listingData?.[source_id]) {
    toInsertListingData[source_id].marketplaceContractAddress =
      listingData?.[source_id].marketplaceContractAddress ?? event.address;
    const updatedSellOrderSet = updateObjectSet(
      listingData?.[source_id].data.sellOrders,
      newData
    );
    console.log(`updatedSellOrderSet, ${JSON.stringify(updatedSellOrderSet)}`);
    toInsertListingData[source_id].data.sellOrders = updatedSellOrderSet;
  } else {
    toInsertListingData[source_id] = {
      listingType: source_type,
      marketplaceContractAddress: event.address,
      data: {
        buyOrders: [],
        sellOrders: [newData],
      },
    };
  }
  const { data: resultData, error: resultError } = await getSupabaseClient()
    .from("assets")
    .update({
      listingData: toInsertListingData,
      sources: toInsertSources,
    })
    .match({
      contractAddress: event.params.find((e) => e.vname === "token_address")
        ?.value,
      tokenId: event.params.find((e) => e.vname === "token_id")?.value,
    });
  console.log(resultData);
};

export const triggerBid = async (
  event: BidEvent | EventLogEntry,
  source_id: string,
  source_type: typeof AssetContractTypes[keyof typeof AssetContractTypes]
) => {
  console.log("trigger Bid");
  console.log(`source_id: ${source_id}`);
  const { data, error } = await getSupabaseClient()
    .from("assets")
    .select("listingData")
    .match({
      contractAddress: event.params.find((e) => e.vname === "token_address")
        ?.value,
      tokenId: event.params.find((e) => e.vname === "token_id")?.value,
    });
  if (!data || data?.length <= 0) return;

  const { listingData, sources } = data[0] as Contract;
  let toInsertListingData = { ...listingData };
  let toInsertSources = Array.from(new Set(sources).add(source_id));
  const newData = {
    maker: event?.params.find((e) => e.vname === "maker")?.value as string,
    amount: +(event?.params.find((e) => e.vname === "amount")?.value as string),
    unit: "QA",
    dest: event?.params.find((e) => e.vname === "dest")?.value as string,
  };
  if (listingData?.[source_id]) {
    toInsertListingData[source_id].marketplaceContractAddress =
      listingData?.[source_id].marketplaceContractAddress ?? event.address;
    const updatedBuyOrderSet = updateObjectSet(
      listingData?.[source_id].data.buyOrders,
      newData
    );
    console.log(
      `existing buyOrders, ${JSON.stringify(
        listingData?.[source_id].data.buyOrders
      )}`
    );
    console.log(`newData, ${JSON.stringify(newData)}`);
    console.log(`updatedBuyOrderSet, ${JSON.stringify(updatedBuyOrderSet)}`);
    toInsertListingData[source_id].data.buyOrders = updatedBuyOrderSet;
  } else {
    toInsertListingData[source_id] = {
      listingType: source_type,
      marketplaceContractAddress: event.address,
      data: {
        buyOrders: [newData],
        sellOrders: [],
      },
    };
  }
  const { data: resultData, error: resultError } = await getSupabaseClient()
    .from("assets")
    .update({
      listingData: toInsertListingData,
      sources: toInsertSources,
    })
    .match({
      contractAddress: event.params.find((e) => e.vname === "token_address")
        ?.value,
      tokenId: event.params.find((e) => e.vname === "token_id")?.value,
    });
  console.log(resultData);
};

export const triggerCancel = async (
  event: CancelEvent | EventLogEntry,
  source_id: string,
  source_type: typeof AssetContractTypes[keyof typeof AssetContractTypes]
) => {
  console.log("trigger Cancel");
  console.log(`source_id: ${source_id}`);
  const { data, error } = await getSupabaseClient()
    .from("assets")
    .select("listingData")
    .match({
      contractAddress: event.params.find((e) => e.vname === "token_address")
        ?.value,
      tokenId: event.params.find((e) => e.vname === "token_id")?.value,
    });
  if (!data || data?.length <= 0) return;

  const { listingData, sources } = data[0] as Contract;
  let toInsertListingData = { ...listingData };
  let toInsertSources = Array.from(new Set(sources));
  if (toInsertSources.findIndex((source) => source === source_id) !== -1) {
    toInsertSources = toInsertSources.filter((source) => source !== source_id);
  }
  if (
    toInsertListingData?.[source_id]?.listingType === "ZILLIQA_ENGLISH_AUCTION"
  ) {
    delete toInsertListingData[source_id];
  } else {
    throw Error("Market place listing not found");
  }
  const { data: resultData, error: resultError } = await getSupabaseClient()
    .from("assets")
    .update({
      listingData: toInsertListingData,
      sources: toInsertSources,
    })
    .match({
      contractAddress: event.params.find((e) => e.vname === "token_address")
        ?.value,
      tokenId: event.params.find((e) => e.vname === "token_id")?.value,
    });
  console.log(resultData);
};

export const triggerEnd = async (
  event: CancelEvent | EventLogEntry,
  source_id: string,
  source_type: typeof AssetContractTypes[keyof typeof AssetContractTypes]
) => {
  console.log("trigger End");
  console.log(`source_id: ${source_id}`);
  const { data, error } = await getSupabaseClient()
    .from("assets")
    .select("listingData")
    .match({
      contractAddress: event.params.find((e) => e.vname === "token_address")
        ?.value,
      tokenId: event.params.find((e) => e.vname === "token_id")?.value,
    });
  if (!data || data?.length <= 0) return;

  const { listingData, sources } = data[0] as Contract;
  let toInsertListingData = { ...listingData };
  const paymentTokenAddress = event?.params.find(
    (e) => e.vname === "payment_token_address"
  )?.value;
  let toInsertSources = Array.from(new Set(sources).add(source_id));
  if (listingData?.[source_id]) {
    toInsertListingData[source_id].marketplaceContractAddress =
      listingData?.[source_id].marketplaceContractAddress ?? event.address;
    toInsertListingData[source_id].data = {
      buyOrders: [],
      sellOrders: [],
      auctionEnded: true,
      auctionEndedData: {
        amount: +event?.params.find((e) => e.vname === "sale_price")?.value,
        buyer: event?.params.find((e) => e.vname === "buyer")?.value,
        currency: identifyCurrencyByTokenAddress(paymentTokenAddress),
        seller: event?.params.find((e) => e.vname === "seller")?.value,
        unit: "QA",
        assetRecipient: event?.params.find((e) => e.vname === "asset_recipient")
          ?.value,
        paymentTokensRecipient: event?.params.find(
          (e) => e.vname === "payment_tokens_recipient"
        )?.value,
        royaltyRecipient: event?.params.find(
          (e) => e.vname === "royalty_recipient"
        )?.value,
      },
    };
  } else {
    throw Error("Market place listing not found");
  }
  const { data: resultData, error: resultError } = await getSupabaseClient()
    .from("assets")
    .update({
      listingData: toInsertListingData,
      sources: toInsertSources,
    })
    .match({
      contractAddress: event.params.find((e) => e.vname === "token_address")
        ?.value,
      tokenId: event.params.find((e) => e.vname === "token_id")?.value,
    });
  console.log(resultData);
};
