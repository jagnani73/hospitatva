import { COMMODITIES } from "../constants";

export interface CardProps {
  contract_address: string;
  name: string;
  address: [string, string, string];
  commodities: COMMODITIES[];
}

export interface HeroProps {
  hospitals: CardProps[];
}

export interface HomeProps {
  hospitals: CardProps[];
}
