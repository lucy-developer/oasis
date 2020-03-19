// eslint-disable-next-line import/named
import { isEmpty, formatBytes } from './helper';
import regexp from '../constants/regExp.constant';

export const mandatory = (param) => {
    throw new Error(`Parameter(s) {${param}} is required.`);
};

export const isEmail = (value) => {
    const error = isEmpty(value) || regexp.email.test(value)
        ? null
        : 'Invalid Email';

    return error;
};

export const isEmailCustom = (errorMessage = 'Invalid Email') => (value) => {
    const error = isEmpty(value) || regexp.email.test(value)
        ? null
        : errorMessage;

    return error;
};

export const isPasswordCustom = (errorMessage = 'Wrong Password') => (value) => {
    const error = isEmpty(value) || regexp.password.test(value)
        ? null
        : errorMessage;

    return error;
};

export const isPromocode = (value) => {
    const error = isEmpty(value) || regexp.allSymbols.test(value)
        ? null
        : 'Invalid value';

    return error;
};

export const isText = (value) => {
    const error = isEmpty(value) || regexp.text.test(value)
        ? null
        : 'Value must me a text';

    return error;
};

export const isCustomText = (errorMessage = 'Not Valid URL') => (value) => {
    const error = isEmpty(value) || regexp.text.test(value)
        ? null
        : errorMessage;

    return error;
};

export const isCustomTextAndNumber = (errorMessage = 'Not Valid URL') => (value) => {
    const error = isEmpty(value) || regexp.characterAndNumber.test(value)
        ? null
        : errorMessage;

    return error;
};

export const isCustomUppercaseAndNumber = (errorMessage = 'Not Valid URL') => (value) => {
    const error = isEmpty(value) || regexp.upperCaseAndNumber.test(value)
        ? null
        : errorMessage;

    return error;
};

export const isNickname = (value) => {
    const error = isEmpty(value) || regexp.personName.test(value)
        ? null
        : 'Invalid nickname';

    return error;
};

export const isNicknameCustom = (errorMessage = 'Invalid username') => (value) => {
    const error = isEmpty(value) || regexp.personName.test(value)
        ? null
        : errorMessage;

    return error;
};

export const isUrl = (value) => {
    const error = isEmpty(value) || regexp.url.test(value)
        ? null
        : 'Invalid url';

    return error;
};

export const isCustomUrl = (errorMessage = 'Not Valid URL') => (value) => {
    const error = isEmpty(value) || regexp.url.test(value)
        ? null
        : errorMessage;

    return error;
};

export const isPhone = (errorMessage = 'Invalid Phone') => (value) => {
    const error = isEmpty(value) || regexp.phone.test(value)
        ? null
        : errorMessage;

    return error;
};

export const isImage = (value) => {
    const error = isEmpty(value) || regexp.image.test(value)
        ? null
        : 'The type of the file is invalid. You can upload image file only.';

    return error;
};

export const required = (value) => {
    const error = !isEmpty(value)
        ? null
        : 'Required';

    return error;
};

export const requiredCustom = (errorMessage = 'Required') => (value) => {
    const error = isEmpty(value)
        ? errorMessage
        : null;

    return error;
};

export const sameAs = key => (value, values) => {
    const error = value === values[key]
        ? null
        : 'Passwords are not the same';

    return error;
};

export const requiredOn = (key, errorMessage = 'Required') => (value, values) => {
    const error = values[key] && isEmpty(value)
        ? errorMessage
        : null;

    return error;
};

export const minLength = min => (value) => {
    const formattedValue = value ? value.toString() : null;
    const error = isEmpty(value) || (formattedValue.trim().length >= min)
        ? null
        : `Must be at least ${min} characters`;

    return error;
};

export const maxLength = max => (errorMessage = 'Not valid') => (value) => {
    const formattedValue = value ? value.toString() : null;
    const error = isEmpty(value) || (formattedValue.trim().length <= max)
        ? null
        : errorMessage;

    return error;
};

// export const maxSize = bytes => (value) => {
//     const formattedValue = value ? value[0] : null;
//     const max = formatBytes(bytes);
//     const fileSize = formattedValue ? formatBytes(formattedValue.size) : null;
//
//     const error = isEmpty(value) || (formattedValue.size <= bytes)
//         ? null
//         : `The file is too large ${fileSize}. Allowed maximum size is ${max}.`;
//
//     return error;
// };

export const minSize = (value) => {
    const formattedValue = value ? value[0] : null;

    return !isEmpty(value) && (formattedValue.size <= 0)
        ? 'File can not be empty'
        : null;
};

export const isYear = (value) => {
    const minimumYear = 1000;
    const currentYear = (new Date()).getFullYear();

    const isNumber = Number.isInteger(+value);
    const isInValidYearDiapason = ((minimumYear <= +value) && (+value <= currentYear));

    if (!isEmpty(value) && !isNumber) return 'Is not a number';
    if (!isEmpty(value) && !isInValidYearDiapason) return 'Is not valid year';

    return null;
};

export const isInteger = (value) => {
    const formattedValue = (value && value.replace && value.replace(/\s+/g, '')) || value;

    const error = !isEmpty(value) && !Number.isInteger(Number(formattedValue))
        ? 'Must be an integer'
        : null;

    return error;
};

export const minValue = min => (value) => {
    const error = (isEmpty(value) ? false : +value < +min)
        ? `Value can't be smaller than ${min}`
        : null;

    return error;
};

export const maxValue = max => (value) => {
    const error = (isEmpty(value) ? false : +value > +max)
        ? `Value can't be greater than ${max}`
        : null;

    return error;
};

export const isNumber = (value) => {
    const error = (isEmpty(value) ? false : Number.parseFloat(value) !== +value)
        ? 'Value must be an integer'
        : null;

    return error;
};

export const positiveNumber = (value) => {
    const error = (isEmpty(value) ? false : +value < 0)
        ? 'Value must be greater than 0'
        : null;

    return error;
};

export const isPositiveNumberCustom = (errorMessage = 'Not Positive Number') => (value) => {
    const error = (isEmpty(value) ? false : !regexp.positiveNumber.test(value))
        ? errorMessage
        : null;

    return error;
};

export const numberFormat = (value) => {
    const error = (isEmpty(value) ? false : !regexp.twoDecimal.test(value))
        ? 'Format must me XX.XX'
        : null;

    return error;
};

export const rangeValue = (min, max) => (value) => {
    const error = (isEmpty(value) ? false : (+value > +max || +value < +min))
        ? `Value must be from ${min} to ${max}`
        : null;

    return error;
};

export const rangeLength = (min, max) => (value) => {
    let error;
    if (isEmpty(value) ? false : (value.length < min)) {
        error = `Must be at least ${min} characters`;
    } else if (isEmpty(value) ? false : (value.length > max)) {
        error = `Must be less than ${max} characters`;
    }

    return error;
};

const join = rules => (value, data) => rules
    .map(rule => rule(value, data))
    .filter(error => !!error)[0];

export const createValidator = fields => (data = {}) => {
    const errors = {};

    Object.keys(fields).forEach((key) => {
        // field: message
        // rules: [required, minLength(1)]
        const rule = join([...fields[key]]);

        const error = rule(data[key], data);

        if (error) {
            errors[key] = error;
        }
    });

    return errors;
};