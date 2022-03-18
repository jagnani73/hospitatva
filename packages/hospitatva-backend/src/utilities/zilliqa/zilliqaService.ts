import { Zilliqa, Long, BN, bytes } from "@zilliqa-js/zilliqa";
import { SSM } from "aws-sdk";

const zilliqa = new Zilliqa("https://dev-api.zilliqa.com");
const msgVersion = 1;
const chainId = 333;
const gasLimit = Long.fromNumber(25000);
const gasPrice = new BN(1000000000000);
const CONTRACT_ADDRESS = "0xe7dcf9184d66746dd5e01509c65f7255fb19db9c";

const ssm = new SSM();

export const getWallet = async () => {
  const { Parameter } = await ssm
    .getParameter({
      Name: `/sih-22-backend/WALLET_PRIVATE_KEY`,
      WithDecryption: true,
    })
    .promise();
  const walletPrivateKey = Parameter?.Value;
  if (!walletPrivateKey) throw `Could not fetch Wallet Private Key`;

  return {
    zilliqa,
    msgVersion,
    chainId,
    gasLimit,
    gasPrice,
  };
};

export const updatePriceList = async (
  commodityName: string,
  price: string,
  id: string
) => {
  console.log("Update Price List invoked with:", commodityName, price, id);

  const args = [
    {
      vname: "listing_data_name",
      type: "String",
      value: commodityName,
    },
    {
      vname: "listing_data_price",
      type: "Uint256",
      value: price,
    },
    {
      vname: "listing_id",
      type: "Uint256",
      value: id,
    },
  ];

  const contract = zilliqa.contracts.at(CONTRACT_ADDRESS);
  const callTxn = await contract.call("UpdateItem", args, {
    amount: new BN(0),
    gasLimit: gasLimit,
    gasPrice: gasPrice,
    version: bytes.pack(333, 1),
  });
  const txnReceipt = callTxn?.getReceipt();
  console.log(`Transaction: ${JSON.stringify(txnReceipt)}`);
};
