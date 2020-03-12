export default function phoneFormatter(num, type) {
    let formatNum = '';
    const number = num.replace(/[^0-9]/g, '');
    if (number.length === 11) {
        if (type === 0) {
            formatNum = number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
        } else {
            formatNum = number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        }
    } else if (number.length === 8) {
        formatNum = number.replace(/(\d{4})(\d{4})/, '$1-$2');
    } else if (number.indexOf('02') === 0) {
        if (type === 0) {
            formatNum = number.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
        } else {
            formatNum = number.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
        }
    } else if (type === 0) {
        formatNum = number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
    } else {
        formatNum = number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    return formatNum;
}
