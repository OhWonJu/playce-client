import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { MutationResponse } from "./axiosInstance.types";
import { ERROR_CODE } from "../errorCode";

const { VITE_SERVER_BASE_URL, VITE_CLIENT_BASE_URL } = import.meta.env;

export const axiosConfig = {
  baseURL: VITE_SERVER_BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response.data;
};

export const onError = (error: AxiosError) => {
  const response = error.response as AxiosResponse;

  if (response?.data) {
    console.error(response.data);
    // TODO : 에러 코드 매핑 작업
    // return {
    //   ok: false,
    //   error: "로그인 문제",
    //   errorCode: response.data.message === "Unauthorized" ? "401" : undefined,
    // };
    return Promise.reject(response.data);
  }

  return Promise.reject(error);
};

export const onRequest = async (config: InternalAxiosRequestConfig) => {
  const expiresAt = getExpiresAt();

  if (!!expiresAt && isTokenExpired()) {
    try {
      const res = await refreshAccessToken();

      if (!res.ok && res.errorCode) {
        throw new Error(ERROR_CODE[res.errorCode]);
      }
    } catch (error) {
      // 리프레시 토큰 요청 실패 시 처리
      window.location.href = `${VITE_CLIENT_BASE_URL}/?error=true`;
      return Promise.reject(error);
    }
  }
  return config;
};

function isTokenExpired() {
  // const expiresAt = getExpiresAt();
  const expiresAt = Number(localStorage.getItem("playce_expired_at"));
  if (!expiresAt) return true;

  const currentTime = Date.now();
  const TEN_MINUTES_AGO_IN_MS = 60 * 10 * 1000;

  // console.log(expiresAt * 1000);
  // console.log(currentTime + TEN_MINUTES_AGO_IN_MS);

  // 만료시간이 10분 이내로 떨어지면 토큰을 갱신해준다.
  return expiresAt * 1000 < currentTime + TEN_MINUTES_AGO_IN_MS;
}

// 새로운 액세스 토큰을 요청하는 함수
async function refreshAccessToken() {
  const response = await axios.post(
    `${VITE_SERVER_BASE_URL}/auth/refresh`,
    {},
    {
      withCredentials: true, // 쿠키 포함
    },
  );

  // TODo data.ok -> false 리프레시 실패 로그인 해제 작업 필요

  return response.data as MutationResponse;
}

// 쿠키에서 액세스 토큰을 가져오는 함수
function getExpiresAt() {
  const cookieValue = document.cookie
    .match("(^|;)\\s*playce_expires_at\\s*=\\s*([^;]+)")
    ?.pop();

  return cookieValue ? parseInt(cookieValue) : null;
}
