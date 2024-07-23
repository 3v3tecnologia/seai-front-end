import axios, { AxiosInstance } from "axios";
import { toast } from "vue3-toastify";

const extractBaseUrl = () => {
  // const urlObj = new URL(window.location.href);
  const urlObj = new URL("http://seai.3v3.farm");
  // const urlObj = new URL("http://localhost");

  return [
    urlObj.protocol,
    urlObj.hostname,
    `${urlObj.protocol}//${urlObj.hostname}`,
  ];
};

const urlBase = extractBaseUrl();
const serverUrlBase = urlBase[2];

const serverPort = 80;
// const serverPort = 4201;
const baseURL = `${serverUrlBase}:${serverPort}/api/`;

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
    console.log(error);
    if (error.response.status == 401) {
      toast.error("Sem permissão de acesso para este recurso");
    } else if (error.response.status == 404) {
      toast.error("Recurso não encontrado");
    } else if (error.response.status == 403) {
      console.log(error.response);
      toast.error(error.response.data.error);
    }

    return Promise.reject(error);
  }
);

export default httpClient;
