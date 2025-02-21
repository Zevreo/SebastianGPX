import axios from "axios";
import { Method } from "../types/method.types";
import { EnvVars } from "./enviroment";

export const useRequest = () => {
  axios.defaults.baseURL = EnvVars.API_URI;

  async function fetcher(url: string, method: Method, data?: object) {
    return await axios(url, {
      method,
      data,
    });
  }

  return fetcher;
};
