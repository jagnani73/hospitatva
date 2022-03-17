import { Magic } from "@magic-sdk/admin";
import { SSM } from "aws-sdk";
import { checkExisitngUser } from "../database/mongoDbService";

let magic: Magic;

const createMagicInstance = async (magicApiKey: string) => {
  if (!magicApiKey)
    throw { isCustom: true, statusCode: 404, message: "Missing Magic API key" };
  magic = new Magic(magicApiKey);
};

const getMagicInstance = async (magicApiKey: string) => {
  if (!magic) await createMagicInstance(magicApiKey);
  return magic;
};

export const verifyMagicToken = async (
  token: string,
  email: string,
  magicApiKey: string
) => {
  const magicInstance = await getMagicInstance(magicApiKey);
  const did = magicInstance.token.getIssuer(token);
  const publicAddress = magicInstance.token.getPublicAddress(token);
  await checkExisitngUser(did, publicAddress, email);
};
