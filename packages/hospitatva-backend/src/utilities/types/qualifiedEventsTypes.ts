import { EventLogEntry } from "@zilliqa-js/core";

export interface PauseEvent extends EventLogEntry {
  _eventname: "Pause";
  address: string;
  params: [
    {
      vname: "is_paused";
      type: "Bool";
      value: {
        argtypes: [];
        arguments: [];
        constructor: "True" | "False";
      };
    }
  ];
}

const isPauseEvent = (event: EventLogEntry): event is PauseEvent => {
  if (
    event?._eventname === "Pause" &&
    typeof event?.address === "string" &&
    event?.params?.length > 0 &&
    event?.params[0]?.vname === "is_paused" &&
    event?.params[0]?.type === "Bool" &&
    ["True", "False"].includes(event?.params[0]?.value?.constructor)
  )
    return true;
  return false;
};

export interface UnpauseEvent extends EventLogEntry {
  _eventname: "Unpause";
  address: string;
  params: [
    {
      vname: "is_paused";
      type: "Bool";
      value: {
        argtypes: [];
        arguments: [];
        constructor: "True" | "False";
      };
    }
  ];
}

const isUnpauseEvent = (event: EventLogEntry): event is UnpauseEvent => {
  if (
    event?._eventname === "Unpause" &&
    typeof event?.address === "string" &&
    event?.params?.length > 0 &&
    event?.params[0]?.vname === "is_paused" &&
    event?.params[0]?.type === "Bool" &&
    ["True", "False"].includes(event?.params[0]?.value?.constructor)
  )
    return true;
  return false;
};

export interface SetRoyaltyRecipientEvent extends EventLogEntry {
  _eventname: "SetRoyaltyRecipient";
  address: string;
  params: [
    {
      vname: "to";
      type: "ByStr20";
      value: string;
    }
  ];
}

const isSetRoyaltyRecipientEvent = (
  event: EventLogEntry
): event is SetRoyaltyRecipientEvent => {
  if (
    event?._eventname === "SetRoyaltyRecipient" &&
    typeof event?.address === "string" &&
    event?.params?.length > 0 &&
    event?.params[0]?.vname === "to" &&
    event?.params[0]?.type === "ByStr20" &&
    typeof event?.params[0]?.value === "string"
  )
    return true;
  return false;
};

export interface SetRoyaltyFeeBPSEvent extends EventLogEntry {
  _eventname: "SetRoyaltyFeeBPS";
  address: string;
  params: [
    {
      vname: "royalty_fee_bps";
      type: "Uint128";
      value: string;
    }
  ];
}

const isSetRoyaltyFeeBPSEvent = (
  event: EventLogEntry
): event is SetRoyaltyFeeBPSEvent => {
  if (
    event?._eventname === "SetRoyaltyFeeBPS" &&
    typeof event?.address === "string" &&
    event?.params?.length > 0 &&
    event?.params[0]?.vname === "royalty_fee_bps" &&
    event?.params[0]?.type === "Uint128" &&
    typeof event?.params[0]?.value === "string"
  )
    return true;
  return false;
};

export interface SetBaseURIEvent extends EventLogEntry {
  _eventname: "SetBaseURI";
  address: string;
  params: [
    {
      vname: "base_uri";
      type: "String";
      value: string;
    }
  ];
}

const isSetBaseURIEvent = (event: EventLogEntry): event is SetBaseURIEvent => {
  if (
    event?._eventname === "SetBaseURI" &&
    typeof event?.address === "string" &&
    event?.params?.length > 0 &&
    event?.params[0]?.vname === "base_uri" &&
    event?.params[0]?.type === "String" &&
    typeof event?.params[0]?.value === "string"
  )
    return true;
  return false;
};

export interface MintEvent extends EventLogEntry {
  _eventname: "Mint";
  address: string;
  params: [
    {
      vname: "to";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "token_id";
      type: "Uint256";
      value: string;
    }
  ];
}

const isMintEvent = (event: EventLogEntry): event is MintEvent => {
  if (
    event?._eventname === "Mint" &&
    typeof event?.address === "string" &&
    event?.params?.length > 1 &&
    event?.params[0]?.vname === "to" &&
    event?.params[0]?.type === "ByStr20" &&
    typeof event?.params[0]?.value === "string" &&
    event?.params[1]?.vname === "token_id" &&
    event?.params[1]?.type === "Uint256" &&
    typeof event?.params[1]?.value === "string"
  )
    return true;
  return false;
};

export interface BatchMintEvent extends EventLogEntry {
  _eventname: "BatchMint";
  address: string;
  params: [
    {
      vname: "to_list";
      type: "List (ByStr20)";
      value: object;
    },
    {
      vname: "start_id";
      type: "Uint256";
      value: string;
    },
    {
      vname: "end_id";
      type: "Uint256";
      value: string;
    }
  ];
}

export const isBatchMintEvent = (
  event: EventLogEntry
): event is BatchMintEvent => {
  if (
    event?._eventname === "BatchMint" &&
    typeof event?.address === "string" &&
    event?.params?.length > 2 &&
    event?.params[0]?.vname === "to_list" &&
    event?.params[0]?.type === "List (ByStr20)" &&
    typeof event?.params[0]?.value === "object" &&
    event?.params[1]?.vname === "start_id" &&
    event?.params[1]?.type === "Uint256" &&
    typeof event?.params[1]?.value === "string" &&
    event?.params[2]?.vname === "end_id" &&
    event?.params[2]?.type === "Uint256" &&
    typeof event?.params[2]?.value === "string"
  )
    return true;
  return false;
};

export interface BurnEvent extends EventLogEntry {
  _eventname: "Burn";
  address: string;
  params: [
    {
      vname: "token_owner";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "token_id";
      type: "Uint256";
      value: string;
    }
  ];
}

const isBurnEvent = (event: EventLogEntry): event is BurnEvent => {
  if (
    event?._eventname === "Burn" &&
    typeof event?.address === "string" &&
    event?.params?.length > 1 &&
    event?.params[0]?.vname === "token_owner" &&
    event?.params[0]?.type === "ByStr20" &&
    typeof event?.params[0]?.value === "string" &&
    event?.params[1]?.vname === "token_id" &&
    event?.params[1]?.type === "Uint256" &&
    typeof event?.params[1]?.value === "string"
  )
    return true;
  return false;
};

export interface BatchBurnEvent extends EventLogEntry {
  _eventname: "BatchBurn";
  address: string;
  params: [
    {
      vname: "token_id_list";
      type: "List (Uint256)";
      value: object;
    }
  ];
}

const isBatchBurnEvent = (event: EventLogEntry): event is BatchBurnEvent => {
  if (
    event?._eventname === "BatchBurn" &&
    typeof event?.address === "string" &&
    event?.params?.length > 0 &&
    event?.params[0]?.vname === "token_id_list" &&
    event?.params[0]?.type === "List (Uint256)" &&
    typeof event?.params[0]?.value === "object"
  )
    return true;
  return false;
};

export interface AddMinterEvent extends EventLogEntry {
  _eventname: "AddMinter";
  address: string;
  params: [
    {
      vname: "minter";
      type: "ByStr20";
      value: string;
    }
  ];
}

const isAddMinterEvent = (event: EventLogEntry): event is AddMinterEvent => {
  if (
    event?._eventname === "AddMinter" &&
    typeof event?.address === "string" &&
    event?.params?.length > 0 &&
    event?.params[0]?.vname === "minter" &&
    event?.params[0]?.type === "ByStr20" &&
    typeof event?.params[0]?.value === "string"
  )
    return true;
  return false;
};

export interface RemoveMinterEvent extends EventLogEntry {
  _eventname: "RemoveMinter";
  address: string;
  params: [
    {
      vname: "minter";
      type: "ByStr20";
      value: string;
    }
  ];
}

const isRemoveMinterEvent = (
  event: EventLogEntry
): event is RemoveMinterEvent => {
  if (
    event?._eventname === "RemoveMinter" &&
    typeof event?.address === "string" &&
    event?.params?.length > 0 &&
    event?.params[0]?.vname === "minter" &&
    event?.params[0]?.type === "ByStr20" &&
    typeof event?.params[0]?.value === "string"
  )
    return true;
  return false;
};

export interface SetSpenderEvent extends EventLogEntry {
  _eventname: "SetSpender";
  address: string;
  params: [
    {
      vname: "spender";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "token_id";
      type: "Uint256";
      value: string;
    }
  ];
}

const isSetSpenderEvent = (event: EventLogEntry): event is SetSpenderEvent => {
  if (
    event?._eventname === "SetSpender" &&
    typeof event?.address === "string" &&
    event?.params?.length > 1 &&
    event?.params[0]?.vname === "spender" &&
    event?.params[0]?.type === "ByStr20" &&
    typeof event?.params[0]?.value === "string" &&
    event?.params[1]?.vname === "token_id" &&
    event?.params[1]?.type === "Uint256" &&
    typeof event?.params[1]?.value === "string"
  )
    return true;
  return false;
};

export interface AddOperatorEvent extends EventLogEntry {
  _eventname: "AddOperator";
  address: string;
  params: [
    {
      vname: "operator";
      type: "ByStr20";
      value: string;
    }
  ];
}

const isAddOperatorEvent = (
  event: EventLogEntry
): event is AddOperatorEvent => {
  if (
    event?._eventname === "AddOperator" &&
    typeof event?.address === "string" &&
    event?.params?.length > 0 &&
    event?.params[0]?.vname === "operator" &&
    event?.params[0]?.type === "ByStr20" &&
    typeof event?.params[0]?.value === "string"
  )
    return true;
  return false;
};

export interface RemoveOperatorEvent extends EventLogEntry {
  _eventname: "RemoveOperator";
  address: string;
  params: [
    {
      vname: "operator";
      type: "ByStr20";
      value: string;
    }
  ];
}

const isRemoveOperatorEvent = (
  event: EventLogEntry
): event is RemoveOperatorEvent => {
  if (
    event?._eventname === "RemoveOperator" &&
    typeof event?.address === "string" &&
    event?.params?.length > 0 &&
    event?.params[0]?.vname === "operator" &&
    event?.params[0]?.type === "ByStr20" &&
    typeof event?.params[0]?.value === "string"
  )
    return true;
  return false;
};

export interface TransferFromEvent extends EventLogEntry {
  _eventname: "TransferFrom";
  address: string;
  params: [
    {
      vname: "from";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "to";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "token_id";
      type: "Uint256";
      value: string;
    }
  ];
}

const isTransferFromEvent = (
  event: EventLogEntry
): event is TransferFromEvent => {
  if (
    event?._eventname === "TransferFrom" &&
    typeof event?.address === "string" &&
    event?.params?.length > 2 &&
    event?.params[0]?.vname === "from" &&
    event?.params[0]?.type === "ByStr20" &&
    typeof event?.params[0]?.value === "string" &&
    event?.params[1]?.vname === "to" &&
    event?.params[1]?.type === "ByStr20" &&
    typeof event?.params[1]?.value === "string" &&
    event?.params[2]?.vname === "token_id" &&
    event?.params[2]?.type === "Uint256" &&
    typeof event?.params[2]?.value === "string"
  )
    return true;
  return false;
};

export interface BatchTransferFromEvent extends EventLogEntry {
  _eventname: "BatchTransferFrom";
  address: string;
  params: [
    {
      vname: "to_token_id_pair_list";
      type: "List (Pair (ByStr20) (Uint256))";
      value: Array<{
        argtypes: ["ByStr20", "Uint256"];
        constructor: "Pair";
        arguments: [string, string];
      }>;
    }
  ];
}

interface Pair {
  argtypes: [string, string];
  constructor: "Pair";
  arguments: [string, string];
}

const isPair = (type1: string, type2: string, data: Pair): data is Pair => {
  if (
    data?.constructor === "Pair" &&
    data?.argtypes?.[0] === type1 &&
    data?.argtypes?.[1] === type2 &&
    typeof data?.arguments === "object" &&
    data?.arguments?.length === 2
  )
    return true;
  return false;
};

const isBatchTransferFromEvent = (
  event: EventLogEntry
): event is BatchTransferFromEvent => {
  if (
    event?._eventname === "BatchTransferFrom" &&
    typeof event?.address === "string" &&
    event?.params?.length > 0 &&
    event?.params[0]?.vname === "to_token_id_pair_list" &&
    event?.params[0]?.type === "List (Pair (ByStr20) (Uint256))" &&
    typeof event?.params[0]?.value === "object" &&
    (event?.params[0]?.value as Array<any>)?.every((e) =>
      isPair("ByStr20", "Uint256", e)
    )
  )
    return true;
  return false;
};

export interface SetContractOwnershipRecipientEvent extends EventLogEntry {
  _eventname: "SetContractOwnershipRecipient";
  address: string;
  params: [
    {
      vname: "to";
      type: "ByStr20";
      value: string;
    }
  ];
}

const isSetContractOwnershipRecipientEvent = (
  event: EventLogEntry
): event is SetContractOwnershipRecipientEvent => {
  if (
    event?._eventname === "SetContractOwnershipRecipient" &&
    typeof event?.address === "string" &&
    event?.params?.length > 0 &&
    event?.params[0]?.vname === "to" &&
    event?.params[0]?.type === "ByStr20" &&
    typeof event?.params[0]?.value === "string"
  )
    return true;
  return false;
};

export interface AcceptContractOwnershipEvent extends EventLogEntry {
  _eventname: "AcceptContractOwnership";
  address: string;
  params: [
    {
      vname: "contract_owner";
      type: "ByStr20";
      value: string;
    }
  ];
}

const isAcceptContractOwnershipEvent = (
  event: EventLogEntry
): event is AcceptContractOwnershipEvent => {
  if (
    event?._eventname === "AcceptContractOwnership" &&
    typeof event?.address === "string" &&
    event?.params?.length > 0 &&
    event?.params[0]?.vname === "contract_owner" &&
    event?.params[0]?.type === "ByStr20" &&
    typeof event?.params[0]?.value === "string"
  )
    return true;
  return false;
};

export interface SetOrderEvent {
  _eventname: "SetOrder";
  address: string;
  params: [
    {
      vname: "maker";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "side";
      type: "Uint32";
      value: string;
    },
    {
      vname: "token_address";
      type: "ByStr20";
      value: string;
    },
    { vname: "token_id"; type: "Uint256"; value: string },
    {
      vname: "payment_token_address";
      type: "ByStr20";
      value: string;
    },
    { vname: "sale_price"; type: "Uint128"; value: string },
    { vname: "expiration_bnum"; type: "BNum"; value: string }
  ];
}

const isSetOrderEvent = (event: EventLogEntry): event is SetOrderEvent => {
  const validator = [
    {
      type: "ByStr20",
      vname: "maker",
    },
    { type: "Uint32", vname: "side" },
    {
      type: "ByStr20",
      vname: "token_address",
    },
    { type: "Uint256", vname: "token_id" },
    {
      type: "ByStr20",
      vname: "payment_token_address",
    },
    { type: "Uint128", vname: "sale_price" },
    { type: "BNum", vname: "expiration_bnum" },
  ];
  if (
    event._eventname === "SetOrder" &&
    typeof event.address === "string" &&
    validator.every((v) => {
      return !!event.params.find(
        (p) => p.vname === v.vname && p.type === v.type
      );
    })
  )
    return true;
  return false;
};

export interface CancelOrderEvent {
  _eventname: "CancelOrder";
  address: string;
  params: [
    {
      vname: "maker";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "side";
      type: "Uint32";
      value: string;
    },
    {
      vname: "token_address";
      type: "ByStr20";
      value: string;
    },
    { vname: "token_id"; type: "Uint256"; value: string },
    {
      vname: "payment_token_address";
      type: "ByStr20";
      value: string;
    },
    { vname: "sale_price"; type: "Uint128"; value: string }
  ];
}

const isCancelOrderEvent = (
  event: EventLogEntry
): event is CancelOrderEvent => {
  const validator = [
    {
      type: "ByStr20",
      vname: "maker",
    },
    { type: "Uint32", vname: "side" },
    {
      type: "ByStr20",
      vname: "token_address",
    },
    { type: "Uint256", vname: "token_id" },
    {
      type: "ByStr20",
      vname: "payment_token_address",
    },
    { type: "Uint128", vname: "sale_price" },
  ];
  if (
    event._eventname === "CancelOrder" &&
    typeof event.address === "string" &&
    validator.every((v) => {
      return !!event.params.find(
        (p) => p.vname === v.vname && p.type === v.type
      );
    })
  )
    return true;
  return false;
};

export interface FulfillOrderEvent {
  _eventname: "FulfillOrder";
  address: string;
  params: [
    {
      vname: "taker";
      type: "ByStr20";
      value: string;
    },
    { vname: "side"; type: "Uint32"; value: string },
    {
      vname: "token_address";
      type: "ByStr20";
      value: string;
    },
    { vname: "token_id"; type: "Uint256"; value: string },
    {
      vname: "payment_token_address";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "sale_price";
      type: "Uint128";
      value: string;
    },
    {
      vname: "seller";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "buyer";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "asset_recipient";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "payment_tokens_recipient";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "royalty_recipient";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "royalty_amount";
      type: "Uint128";
      value: string;
    },
    {
      vname: "service_fee";
      type: "Uint128";
      value: string;
    }
  ];
}

const isFulfillOrderEvent = (
  event: EventLogEntry
): event is FulfillOrderEvent => {
  const validator = [
    {
      vname: "taker",
      type: "ByStr20",
    },
    { vname: "side", type: "Uint32" },
    {
      vname: "token_address",
      type: "ByStr20",
    },
    { vname: "token_id", type: "Uint256" },
    {
      vname: "payment_token_address",
      type: "ByStr20",
    },
    {
      vname: "sale_price",
      type: "Uint128",
    },
    {
      vname: "seller",
      type: "ByStr20",
    },
    {
      vname: "buyer",
      type: "ByStr20",
    },
    {
      vname: "asset_recipient",
      type: "ByStr20",
    },
    {
      vname: "payment_tokens_recipient",
      type: "ByStr20",
    },
    {
      vname: "royalty_recipient",
      type: "ByStr20",
    },
    {
      vname: "royalty_amount",
      type: "Uint128",
    },
    {
      vname: "service_fee",
      type: "Uint128",
    },
  ];
  if (
    event._eventname === "FulfillOrder" &&
    typeof event.address === "string" &&
    validator.every((v) => {
      return !!event.params.find(
        (p) => p.vname === v.vname && p.type === v.type
      );
    })
  )
    return true;
  return false;
};

export interface StartEvent {
  _eventname: "Start";
  address: string;
  params: [
    {
      vname: "maker";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "token_address";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "token_id";
      type: "Uint256";
      value: string;
    },
    {
      vname: "payment_token_address";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "start_amount";
      type: "Uint128";
      value: string;
    },
    {
      vname: "expiration_bnum";
      type: "BNum";
      value: string;
    }
  ];
}

const isStartEvent = (event: EventLogEntry): event is StartEvent => {
  const validator = [
    {
      vname: "maker",
      type: "ByStr20",
    },
    {
      vname: "token_address",
      type: "ByStr20",
    },
    {
      vname: "token_id",
      type: "Uint256",
    },
    {
      vname: "payment_token_address",
      type: "ByStr20",
    },
    {
      vname: "start_amount",
      type: "Uint128",
    },
    {
      vname: "expiration_bnum",
      type: "BNum",
    },
  ];
  if (
    event._eventname === "Start" &&
    typeof event.address === "string" &&
    validator.every((v) => {
      return !!event.params.find(
        (p) => p.vname === v.vname && p.type === v.type
      );
    })
  )
    return true;
  return false;
};

export interface BidEvent {
  _eventname: "Bid";
  address: string;
  params: [
    {
      vname: "maker";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "token_address";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "token_id";
      type: "Uint256";
      value: string;
    },
    {
      vname: "amount";
      type: "Uint128";
      value: string;
    },
    {
      vname: "dest";
      type: "ByStr20";
      value: string;
    }
  ];
}

const isBidEvent = (event: EventLogEntry): event is BidEvent => {
  const validator = [
    {
      vname: "maker",
      type: "ByStr20",
    },
    {
      vname: "token_address",
      type: "ByStr20",
    },
    {
      vname: "token_id",
      type: "Uint256",
    },
    {
      vname: "amount",
      type: "Uint128",
    },
    {
      vname: "dest",
      type: "ByStr20",
    },
  ];
  if (
    event._eventname === "Bid" &&
    typeof event.address === "string" &&
    validator.every((v) => {
      return !!event.params.find(
        (p) => p.vname === v.vname && p.type === v.type
      );
    })
  )
    return true;
  return false;
};

export interface CancelEvent {
  _eventname: "Cancel";
  address: string;
  params: [
    {
      vname: "token_address";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "token_id";
      type: "Uint256";
      value: string;
    }
  ];
}

const isCancelEvent = (event: EventLogEntry): event is CancelEvent => {
  const validator = [
    {
      vname: "token_address",
      type: "ByStr20",
    },
    {
      vname: "token_id",
      type: "Uint256",
    },
  ];
  if (
    event._eventname === "Cancel" &&
    typeof event.address === "string" &&
    validator.every((v) => {
      return !!event.params.find(
        (p) => p.vname === v.vname && p.type === v.type
      );
    })
  )
    return true;
  return false;
};

export interface EndEvent {
  _eventname: "End";
  address: string;
  params: [
    {
      vname: "token_address";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "token_id";
      type: "Uint256";
      value: string;
    },
    {
      vname: "payment_token_address";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "sale_price";
      type: "Uint128";
      value: string;
    },
    {
      vname: "seller";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "buyer";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "asset_recipient";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "payment_tokens_recipient";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "royalty_recipient";
      type: "ByStr20";
      value: string;
    },
    {
      vname: "royalty_amount";
      type: "Uint128";
      value: string;
    },
    {
      vname: "service_fee";
      type: "Uint128";
      value: string;
    }
  ];
}

const isEndEvent = (event: EventLogEntry): event is EndEvent => {
  const validator = [
    {
      vname: "token_address",
      type: "ByStr20",
    },
    {
      vname: "token_id",
      type: "Uint256",
    },
    {
      vname: "payment_token_address",
      type: "ByStr20",
    },
    {
      vname: "sale_price",
      type: "Uint128",
    },
    {
      vname: "seller",
      type: "ByStr20",
    },
    {
      vname: "buyer",
      type: "ByStr20",
    },
    {
      vname: "asset_recipient",
      type: "ByStr20",
    },
    {
      vname: "payment_tokens_recipient",
      type: "ByStr20",
    },
    {
      vname: "royalty_recipient",
      type: "ByStr20",
    },
    {
      vname: "royalty_amount",
      type: "Uint128",
    },
    {
      vname: "service_fee",
      type: "Uint128",
    },
  ];
  if (
    event._eventname === "End" &&
    typeof event.address === "string" &&
    validator.every((v) => {
      return !!event.params.find(
        (p) => p.vname === v.vname && p.type === v.type
      );
    })
  )
    return true;
  return false;
};

const qualifiedEvents = [
  isPauseEvent,
  isUnpauseEvent,
  isSetRoyaltyRecipientEvent,
  isSetRoyaltyFeeBPSEvent,
  isSetBaseURIEvent,
  isMintEvent,
  isBatchMintEvent,
  isBurnEvent,
  isBatchBurnEvent,
  isAddMinterEvent,
  isRemoveMinterEvent,
  isSetSpenderEvent,
  isAddOperatorEvent,
  isRemoveOperatorEvent,
  isTransferFromEvent,
  isBatchTransferFromEvent,
  isSetContractOwnershipRecipientEvent,
  isAcceptContractOwnershipEvent,
  isSetOrderEvent,
  isCancelOrderEvent,
  isFulfillOrderEvent,
  isStartEvent,
  isBidEvent,
  isCancelEvent,
  isEndEvent,
];
type QualifiedEvent =
  | PauseEvent
  | UnpauseEvent
  | SetRoyaltyRecipientEvent
  | SetRoyaltyFeeBPSEvent
  | SetBaseURIEvent
  | MintEvent
  | BatchMintEvent
  | BurnEvent
  | BatchBurnEvent
  | AddMinterEvent
  | RemoveMinterEvent
  | SetSpenderEvent
  | AddOperatorEvent
  | RemoveOperatorEvent
  | TransferFromEvent
  | BatchTransferFromEvent
  | SetContractOwnershipRecipientEvent
  | AcceptContractOwnershipEvent
  | SetOrderEvent
  | CancelOrderEvent
  | FulfillOrderEvent
  | StartEvent
  | BidEvent
  | CancelEvent
  | EndEvent;

export const isQualifiedEvent = (
  event: EventLogEntry
): event is QualifiedEvent => {
  const results: Array<boolean> = [];
  for (const test of qualifiedEvents) {
    results.push(test(event));
  }
  return results.some((t) => t);
};
