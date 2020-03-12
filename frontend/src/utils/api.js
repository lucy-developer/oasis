import axios from 'axios';

const api1url = url => {
    return 'http://localhost:3030';
};

const getRequestHeader = config => {
    const authToken = localStorage.getItem('jwtToken');
    if (authToken) {
        return {
            ...config,
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }
    }
    return config;
};

const api = {
    get: (url, config = {}) => {
        return axios.get(api1url(url), getRequestHeader(config));
    },
    post: (url, data = {}, config = {}) => {
        return axios.post(api1url(url), data, getRequestHeader(config));
    },
    patch: (url, data = {}, config = {}) => {
        return axios.patch(api1url(url), data, getRequestHeader(config));
    },
    delete: (url, config = {}) => {
        return axios.delete(api1url(url), getRequestHeader(config));
    }
};

export default api;