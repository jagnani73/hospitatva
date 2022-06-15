import { getInventoryData } from "./database/mongoDbService";

export const idToNameMapper = async (id: string) => {
  const data = await getInventoryData();
  return data.find((element) => element.id === id)?.name;
};

export const idToChainNameMapper = async (id: string) => {
  const data = await getInventoryData();
  return data.find((element) => element.id === id)?.chainName;
};

export const nameToIdMapper = async (name: string) => {
  const data = await getInventoryData();
  return data.find((element) => element.name === name)?.id;
};
