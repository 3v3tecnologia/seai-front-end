import axios, { AxiosInstance } from "axios";
import { toast } from "vue3-toastify";

const extractBaseUrl = () => {
  const API_URL = process.env.VUE_APP_API_URL || "http://localhost:8080";
  const urlObj = new URL(API_URL);

  return [
    urlObj.protocol,
    urlObj.hostname,
    `${urlObj.protocol}//${urlObj.hostname}`,
    urlObj.port,
  ];
};

const urlBase = extractBaseUrl();
const serverUrlBase = urlBase[2];

const serverPort = urlBase[3];

// const serverPort = 4201;
const baseURL = `${serverUrlBase}:${serverPort}/api/`;
console.log("baseURL ", baseURL);

const httpClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

httpClient.interceptors.response.use(
  function (response) {
    // Optional: Do something with response data
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      toast.error("Sem permissão de acesso para este recurso");
    } else if (error.response.status == 404) {
      toast.error("Recurso não encontrado");
    } else if (error.response.status == 403) {
      toast.error(error.response.data.error);
    } else if (error.response.status == 400) {
      toast.error(error.response.data.error);
    }

    return Promise.reject(error);
  }
);

export default httpClient;
