import axios from 'axios';

// eslint-disable-next-line import/no-unresolved
//const cors = require('cors');

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
                //'Access-Control-Allow-Origin': 'http://localhost:3000',
                // crossDomain: true
            }
        }
    }
    return {
        ...config,
        headers: {
            //'Access-Control-Allow-Origin': 'http://localhost:3000',
            // crossDomain: true
        }
    };
};

const api = {
    get: (url, data = {}, config = {}) => {
        return axios.get(api1url(url), getRequestHeader(config));
    },
    post: (url, data = {}, config = {}) => {
        return axios.post(api1url(url), data, getRequestHeader(config)).then(response => {
            return response;
        });
    },
    // post:(url, data = {}, config = {}) => {
    //     const authToken = localStorage.getItem('jwtToken')
    //     return axios(api1url(url), {
    //         method: "POST",
    //         mode: "no-cors",
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${authToken}`,
    //         },
    //         data: data,
    //         withCredentials: true,
    //         credentials: "same-origin"
    //     });
    // },
    patch: (url, data = {}, config = {}) => {
        return axios.patch(api1url(url), data, getRequestHeader(config));
    },
    delete: (url, config = {}) => {
        return axios.delete(api1url(url), getRequestHeader(config));
    }
};

export default api;