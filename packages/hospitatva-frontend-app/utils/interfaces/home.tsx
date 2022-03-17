import { COMMODITIES } from "../constants";

export interface CardProps {
  name: string;
  address: [string, string, string];
  commodities: COMMODITIES[];
}
