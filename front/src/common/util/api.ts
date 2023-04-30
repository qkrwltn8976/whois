import axios from "axios";
import { API_HOST } from "../constant";
import { message } from "antd";

interface CallApiInterface {
  method?: "get" | "post";
  url: string;
  params?: object;
  data?: object;
}

export function callApi<T extends _>({
  method = "get",
  url,
  params,
  data,
}: CallApiInterface) {
  return axios({
    url,
    method,
    baseURL: API_HOST,
    params,
    data,
    withCredentials: true,
  })
    .then((response) => {
      const { resultCode, resultMessage, totalCount } = response.data;
      if (resultCode < 0) {
        message.error(resultMessage);
      }

      return {
        isSuccess: resultCode === ResultCode.Success,
        data: response.data.data,
        resultCode,
        resultMessage,
        totalCount,
      };
    })
    .catch(() => {
      return {
        isSuccess: false,
        data: null,
      };
    });
}

export const ResultCode = {
  Success: 0,
};
