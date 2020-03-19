import apiConfig from '../apiConfig';
import ApiClient from './ApiClient';

import UserAPI from '../UserAPI';
// import CommonAPI from '../CommonAPI';
// import ProductAPI from '../ProductAPI';

function apiFactory({ baseURL }) {
    const api =  new ApiClient({ baseURL });

    return {
        user: new UserAPI({ apiClient: api }),
        // common: new CommonAPI({ apiClient: api }),
        // product: new ProductAPI({ apiClient: api }),
    };
}

export default apiFactory({
    baseURL: apiConfig.apiUrl,
});