import { COMMODITIES } from "../constants";

export interface HospitalProps {
  contract_address: string;
  name: string;
  address: [string, string, string];
  specialists: string[];
  commodities: {
    name: COMMODITIES;
    count: number;
    available: number;
    price: number;
    projectedPrice: number;
  }[];
  marker: { latitude: number; longitude: number };
}

export interface MapProps {
  longitude: number;
  latitude: number;
}
