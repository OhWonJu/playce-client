import { axiosConfig, onError, onRequest, onResponse } from "./axiosConfig";
import { CustomInstance } from "./axiosInstance.types";

import axios from "axios";

export const axiosInstance: CustomInstance = axios.create(axiosConfig);

axiosInstance.interceptors.response.use(onResponse, onError);
axiosInstance.interceptors.request.use(onRequest, onError);
