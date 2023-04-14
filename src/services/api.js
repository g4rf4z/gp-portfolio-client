import axios from "axios";

const baseURI = import.meta.env.VITE_APP_SERVER_URL;

const apiClient = axios.create({
  baseURL: baseURI,
  timeout: 100000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    dataType: "json",
  },
});

export const apiWrapper = {
  instance: apiClient,
  responseBody: (response) => response.data,

  get: async function (url, params = {}) {
    const response = await this.instance.get(url, { params });
    return this.responseBody(response);
  },

  post: async function (url, data = {}, config) {
    const response = await this.instance.post(url, data, config);
    return this.responseBody(response);
  },

  patch: async function (url, data = {}, config) {
    const response = await this.instance.patch(url, data, config);
    return this.responseBody(response);
  },

  delete: async function (url, params = {}) {
    const response = await this.instance.delete(url, {
      params,
    });
    return this.responseBody(response);
  },
};
