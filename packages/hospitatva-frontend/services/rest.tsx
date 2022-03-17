import axios, { AxiosInstance } from "axios";

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
