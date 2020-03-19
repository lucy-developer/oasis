import queryString from 'query-string';

export const isEmpty = (val) => {
    let empty = true;

    if (!val && val !== 0) {
        empty = true;
    }

    if (typeof val === 'number') {
        empty = false;
    }

    if (typeof val === 'string') {
        empty = !val.trim();
    }

    if (typeof val === 'object' && val) {
        empty = !Object.keys(val).length;
    }

    if (Array.isArray(val)) {
        empty = !val.length;
    }

    return empty;
};

export const isBoolean = value => (typeof value === 'boolean');

export const formatStringLength = (text = '', length = -1) => (
    text && text.length > length
        ? `${text.slice(0, length)}...`
        : text
);

export const filterCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const {data} = imgData;

    for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 255) {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
            data[i + 3] = 255;
        }
    }
    ctx.putImageData(imgData, 0, 0);

    return canvas;
};

export const dataURItoBlob = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;

    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
    } else {
        byteString = unescape(dataURI.split(',')[1]);
    }
    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
};

export const getRandomInt = (min, max) => (Math.floor(Math.random() * (max - (min + 1))) + min);

export const arrayStringify = (array = [], separator = ',') => array.join(separator);

export const covertUtcDate = (dateStr) => {
    const ua = navigator.userAgent.toLowerCase();

    return (ua.indexOf('safari') !== -1)
        ? new Date(dateStr.replace(/-/g, '/').replace(/T/g, ' '))
        : new Date(dateStr);
};

export const getUrlEncoded = params => queryString.stringify(params, { encode: true });

export const clearObject = (obj) => {
    const result = {};

    Object.keys(obj).forEach((key) => {
        if (obj[key] || isBoolean(obj[key])) {
            result[key] = obj[key];
        }
    });

    return result;
};