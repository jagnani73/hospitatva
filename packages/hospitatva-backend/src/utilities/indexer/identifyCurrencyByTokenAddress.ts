// TODO: Make the wZIL addresses dynamic and the unit dynamic (unit has been hard-coded to "QA" in listing data)
const wZILAddresses = [
  "0x316e84bc7fcfac81a441cac8045824297cec24ce",
  "0x4306f921c982766810cf342775fd79aa2d0d0e24",
];

const zeroAddress = "0x0000000000000000000000000000000000000000";

export const identifyCurrencyByTokenAddress = (
  tokenAddress: string
): string => {
  if (wZILAddresses.includes(tokenAddress)) return "wZIL";
  if (zeroAddress === tokenAddress) return "ZIL";
  return "";
};
