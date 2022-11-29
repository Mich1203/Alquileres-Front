import axios from "axios";
import { getSession } from "next-auth/react";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.accessToken)
    config.headers!.authorization = `Bearer ${session?.accessToken}`;

  return config;
});

export default instance;
