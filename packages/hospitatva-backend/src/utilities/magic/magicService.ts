import { Magic } from "@magic-sdk/admin";
import { SSM } from "aws-sdk";
import { checkExisitngUser } from "../database/mongoDbService";

let magic: Magic;
let ssmResponse;

const ssm = new SSM();

const createMagicInstance = async () => {
  ssmResponse = await ssm
    .getParameter({
      Name: "/sih-22-backend/MAGIC_API_KEY",
      WithDecryption: true,
    })
    .promise();
  const magicApiKey = ssmResponse.Parameter?.Value;
  if (!magicApiKey)
    throw { isCustom: true, statusCode: 404, message: "Missing Magic API key" };
};

const getMagicInstance = async () => {
  if (!magic) await createMagicInstance();
  return magic;
};

export const verifyMagicToken = async (token: string, email: string) => {
  const did = (await getMagicInstance()).token.getIssuer(token);
  const publicAddress = (await getMagicInstance()).token.getPublicAddress(
    token
  );
  await checkExisitngUser(did, publicAddress, email);
};
