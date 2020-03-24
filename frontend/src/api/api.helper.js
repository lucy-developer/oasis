import { statuses } from '../constants/httpErrors.constant';

export const httpStatusNormalizer = ({ status = 0 }) => {
    let normalizedStatus = status;

    if (status >= 200 && status < 300) {
        normalizedStatus = 200;
    }

    if (status >= 300 && status < 400) {
        normalizedStatus = 300;
    }

    if (status > 403 && status < 500) {
        normalizedStatus = 400;
    }

    if (status >= 500) {
        normalizedStatus = 500;
    }

    return normalizedStatus;
};

export const httpErrorHandler = ({ status = 0 }) => {
    const unhandledStatus = 0;
    const normalizedStatus = status;

    return statuses[normalizedStatus]
        ? statuses[normalizedStatus]
        : statuses[unhandledStatus];
};

export const successHandler = (response) => {
    const {data} = response;
    const meta = {
        status: response.status,
        normalizedStatus: httpStatusNormalizer({ status: response.status }),
        statusText: response.data,
    };

    return Promise.resolve({ data, meta });
};

export const validationErrorNormalizr = (data) => {
    const nData = {};

    Object.keys(data).forEach((error) => {
        nData[error] = data[error];
    });

    return nData;
};

export const failureHandler = (error) => {
    const errorResponse = error.data || error;
    const data = errorResponse.errors;
    const meta = {};

    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.resolve({ data, meta });
};