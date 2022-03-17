import { AssetContractTypes } from "../../constants";

export type Contract = {
  contractAddress: string;
  type?: string | null;
  standard?: string | null;
  contractOwnershipRecipient?: string | null;
  ownerAddress?: string | null;
  tokenCount?: number | null;
  totalSupply?: number | null;
  tokenName?: string | null;
  tokenSymbol?: string | null;
  minterAddresses?: string[] | [];
  sources?: string[] | [];
  listingData?: {
    [x: string]: {
      listingType: typeof AssetContractTypes[keyof typeof AssetContractTypes];
      marketplaceContractAddress: string;
      data: {
        buyOrders: Array<{
          maker: string;
          unit: string;
          amount: number;
          // For fixed price-type buy orders
          currency?: string;
          expirationInBlockNumber?: string;
          // For english auction-type buy orders
          dest?: string;
        }>;
        sellOrders: Array<{
          maker: string;
          unit: string;
          amount: number;
          currency: string;
          expirationInBlockNumber: string;
        }>;
        // For fixed price-type marketplaces
        fulfilled?: boolean;
        fulfilledData?: {
          seller: string;
          buyer: string;
          type: string;
          unit: string;
          amount: number;
          currency: string;
        };
        // For english auction-type marketplaces
        auctionEnded?: boolean;
        auctionEndedData?: {
          seller: string;
          buyer: string;
          unit: string;
          amount: number;
          currency: string;
          assetRecipient: string;
          paymentTokensRecipient: string;
          royaltyRecipient: string;
        };
      };
    };
  };
};

export type ContractsType = {
  cursor: string;
  contractsList: Contract[];
};

export type ContractByAddressInputType = {
  contractAddress: string;
};

export const ZRC6ImmutableParameters = [
  "initial_contract_owner",
  "initial_base_uri",
  "name",
  "symbol",
] as const;

export const ZRC6MutableFields = {
  is_paused: {
    required: false,
  },
  contract_owner: {
    required: true,
  },
  royalty_recipient: {
    required: false,
  },
  royalty_fee_bps: {
    required: false,
  },
  base_uri: {
    required: true,
  },
  minters: {
    required: true,
  },
  token_owners: {
    required: true,
  },
  spenders: {
    required: true,
  },
  operators: {
    required: true,
  },
  token_id_count: {
    required: true,
  },
  balances: {
    required: true,
  },
  total_supply: {
    required: true,
  },
  token_name: {
    required: true,
  },
  token_symbol: {
    required: true,
  },
  contract_ownership_recipient: {
    required: false,
  },
} as const;

export const ZRC6EventsAndTransitions = {
  Pause: {
    required: false,
  },
  Unpause: {
    required: false,
  },
  SetRoyaltyRecipient: {
    required: false,
  },
  SetRoyaltyFeeBPS: {
    required: false,
  },
  SetBaseURI: {
    required: false,
  },
  Mint: {
    required: true,
  },
  BatchMint: {
    required: false,
  },
  Burn: {
    required: false,
  },
  BatchBurn: {
    required: false,
  },
  AddMinter: {
    required: true,
  },
  RemoveMinter: {
    required: true,
  },
  SetSpender: {
    required: true,
  },
  AddOperator: {
    required: true,
  },
  RemoveOperator: {
    required: true,
  },
  TransferFrom: {
    required: true,
  },
  BatchTransferFrom: {
    required: false,
  },
  SetContractOwnershipRecipient: {
    required: false,
  },
  AcceptContractOwnership: {
    required: false,
  },
} as const;

export interface ZRC6ContractCode {
  contract_info: {
    scilla_major_version: string;
    vname: string;
    params: Array<{
      vname: typeof ZRC6ImmutableParameters[number];
      type: string;
    }>;
    fields: Array<{
      vname: keyof typeof ZRC6MutableFields;
      type: string;
      depth: number;
    }>;
    transitions: Array<{
      vname: keyof typeof ZRC6EventsAndTransitions;
      params: Array<{
        vname: string;
        type: string;
      }>;
    }>;
    events: Array<{
      vname: keyof typeof ZRC6EventsAndTransitions;
      params: Array<{
        vname: string;
        type: string;
      }>;
    }>;
  };
}

export const isZRC6ContractCode = (data: any): data is ZRC6ContractCode => {
  if (
    (data?.contract_info?.params as Array<any>).every((e) =>
      ZRC6ImmutableParameters.includes(e.vname)
    ) &&
    // `as unknown as` is required to explicitly typecast from one type to another
    Object.keys(ZRC6MutableFields).every((e: string) => {
      if (
        (
          ZRC6MutableFields as unknown as {
            [x: string]: { required: boolean };
          }
        )[e].required === false
      )
        return true;
      return (data?.contract_info?.fields as Array<any>).some(
        (f) => f.vname === e
      );
    }) &&
    Object.keys(ZRC6EventsAndTransitions).every((e: string) => {
      if (
        (
          ZRC6EventsAndTransitions as unknown as {
            [x: string]: { required: boolean };
          }
        )[e].required === false
      )
        return true;
      return (data?.contract_info?.events as Array<any>).some(
        (f) => f.vname === e
      );
    }) &&
    Object.keys(ZRC6EventsAndTransitions).every((e: string) => {
      if (
        (
          ZRC6EventsAndTransitions as unknown as {
            [x: string]: { required: boolean };
          }
        )[e].required === false
      )
        return true;
      return (data?.contract_info?.transitions as Array<any>).some(
        (f) => f.vname === e
      );
    })
  )
    return true;
  return false;
};
