import axios, { AxiosInstance } from "axios";
import { HospitalProps } from "../utils/interfaces/hospital";
import { SummaryProps } from "../utils/interfaces/summary";

const instance: AxiosInstance = axios.create({
  baseURL: "https://dce45c8eo8.execute-api.ap-south-1.amazonaws.com",
});

export const postMagicToken = async (
  token: string,
  email: string
): Promise<boolean> => {
  const res = await instance.post("/user/magic", {
    token,
    email,
  });
  return res.data;
};

export const getHospitals = async (): Promise<HospitalProps[]> => {
  const { data } = await instance.get("/hospital");
  return data.hospitals;
};

export const postTicket = async (
  commodity: {
    name: string;
    quantity: number;
    price: number;
    projectedPrice: number;
  },
  name: string,
  hospital: string
): Promise<boolean> => {
  const res = await instance.post("/hospital/ticket", {
    commodity,
    hospital,
    name,
  });
  return res.data;
};
