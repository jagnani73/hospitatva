export interface Bool {
  argtypes: Array<unknown>;
  arguments: Array<unknown>;
  constructor: "True" | "False";
}

export interface ContractState {
  is_paused?: Bool;
  contract_owner: string;
  royalty_recipient?: string;
  royalty_fee_bps?: string;
  base_uri: string;
  minters: {
    [x: string]: Bool;
  };
  token_owners: {
    [x: string]: string;
  };
  token_uris?: {
    [x: string]: string;
  };
  spenders: {
    [x: string]: string;
  };
  operators: {
    [x: string]: {
      [x: string]: Bool;
    };
  };
  token_id_count: string;
  balances: {
    [x: string]: string;
  };
  total_supply: string;
  token_name: string;
  token_symbol: string;
  contract_ownership_recipient?: string;
}
