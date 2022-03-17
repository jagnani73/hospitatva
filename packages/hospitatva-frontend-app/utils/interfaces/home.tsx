import { COMMODITIES } from "../constants";

export interface CardProps {
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
