import axios from 'axios';
import humps from 'humps';

export const backendUrl = 'https://pilkanoznabar.website/';

export const domain = backendUrl.endsWith('/')
  ? backendUrl.substr(0, backendUrl.length - 1)
  : backendUrl;

//  Add Base URL and change snake_case to camelCase
const baseAxios = axios.create({
  baseURL: `${domain}`,
  // transformResponse: [...axios.defaults.transformResponse, humps.camelizeKeys],
  // transformRequest: [decamelize, ...axios.defaults.transformRequest],
});

baseAxios.interceptors.request.use(config => ({
  ...config,
  // params: humps.decamelizeKeys(config.params),
}));

export default baseAxios;

function decamelize(object) {
  if (!(object && !(object instanceof File))) {
    return object;
  }

  if (object instanceof FormData) {
    const formData = new FormData();

    for (const [key, value] of object.entries()) {
      formData.append(humps.decamelize(key), value);
    }
    return formData;
  }

  if (typeof object === 'object') {
    return Object.keys(object).reduce(
      (acc, next) => ({
        ...acc,
        [humps.decamelize(next)]: object[next],
      }),
      {},
    );
  }
}
