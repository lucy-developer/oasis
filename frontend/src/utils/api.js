import axios from 'axios';

const api1url = url => {
    return 'http://localhost:3030'+url;
};

const getRequestHeader = config => {
    const authToken = localStorage.getItem('jwtToken');
    if (authToken) {
        return {
            ...config,
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            }
        }
    }
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
        }
    };
};

const api = {
    get: (url, config = {}) => {
        return axios.get(api1url(url), getRequestHeader(config));
    },
    post: (url, data = {}, config = {}) => {
        //return axios.post(api1url(url), data, getRequestHeader(config));
        return axios.post(api1url(url), data, config).then(response => {
            //setToken(response);
            return response;
        });
    },
    patch: (url, data = {}, config = {}) => {
        return axios.patch(api1url(url), data, getRequestHeader(config));
    },
    delete: (url, config = {}) => {
        return axios.delete(api1url(url), getRequestHeader(config));
    }
};

export default api;