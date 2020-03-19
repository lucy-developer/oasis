import axios from 'axios';
import queryString from 'query-string';
import httpAdapter from 'axios/lib/adapters/http';
import { successHandler, failureHandler } from '../api.helper';

// Axios instance setUp
axios.defaults.adapter = httpAdapter;

// Add a request interceptor
axios.interceptors.request.use(
    request => request,
    error => Promise.reject(error),
);

// Add a response interceptor
axios.interceptors.response.use(
    response => response,
    error => Promise.reject(error),
);

class ApiClient {
    constructor({ baseURL }) {
        this.baseURL = baseURL;
    }

    get(requestUrl, params = {}, headers = {}, payload = {}) {
        return this.request({
            url: requestUrl,
            method: 'get',
            data: payload,
            params,
            headers,
        });
    }

    put(requestUrl, payload = {}, headers = {}) {
        return this.request({
            url: requestUrl,
            method: 'put',
            data: payload,
            headers,
        });
    }

    post(requestUrl, payload = {}, headers = {}) {
        return this.request({
            url: requestUrl,
            method: 'post',
            data: payload,
            headers,
        });
    }

    patch(requestUrl, payload = {}, headers = {}) {
        return this.request({
            url: requestUrl,
            method: 'patch',
            data: payload,
            headers,
        });
    }

    delete(requestUrl, headers = {}) {
        return this.request({
            url: requestUrl,
            method: 'delete',
            headers,
        });
    }

    request({ url, method, params = {}, headers, data }) {
        const substring = 'login';

        if (url.includes(substring)) {
            const config = {
                url,
                method,
                baseURL: this.baseURL,
                params,
                paramsSerializer(p) {
                    return queryString.stringify(p, {encode: true});
                },
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    ...headers,
                },
                withCredentials: true,
                data,
            };
            return axios(config)
                .then(successHandler)
                .catch(failureHandler);

        }
        const config = {
            url,
            method,
            baseURL: this.baseURL,
            params,
            paramsSerializer(p) {
                return queryString.stringify(p, {encode: true});
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                ...ApiClient.getToken(),
                ...headers,
            },
            withCredentials: true,
            data,
        };
        return axios(config)
            .then(successHandler)
            .catch(failureHandler);
    }
}

ApiClient.getToken = () => {
    const { webToken } = localStorage.getItem('jwtToken');//store.getState().user;

    return webToken
        ? { Authorization: `Bearer ${webToken}` }
        : {};
};

export default ApiClient;