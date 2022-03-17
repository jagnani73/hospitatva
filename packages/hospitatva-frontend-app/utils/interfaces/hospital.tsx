import { COMMODITIES } from "../constants";
import { CardProps } from "./home";

export interface HospitalProps extends Omit<CardProps, "commodities"> {
  specialists: string[];
  commodities: {
    name: COMMODITIES;
    count: number;
    in_use: number;
    price: number;
  }[];
}
