const isExisty = function (value) {
    return value !== null && value !== undefined;
};

const isEmpty = function (value) {
    return value === '' || value === undefined || value == null;
};

const isEmptyTrimed = function (value) {
    if (typeof value === 'string') {
        return value.trim() === '';
    }
    return true;
};

const validations = {
    matchRegexp: (value, regexp) => {
        const validationRegexp = (regexp instanceof RegExp ? regexp : (new RegExp(regexp)));
        return (!isExisty(value) || isEmpty(value) || validationRegexp.test(value));
    },

    // eslint-disable-next-line
    isEmail: value => validations.matchRegexp(value, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i),

    isEmpty: value => isEmpty(value),

    required: value => !isEmpty(value),

    trim: value => !isEmptyTrimed(value),

    isNumber: value => validations.matchRegexp(value, /^-?[0-9]\d*(\d+)?$/i),

    isFloat: value => validations.matchRegexp(value, /^(?:[1-9]\d*|0)?(?:\.\d+)?$/i),

    isPositive: (value) => {
        if (isExisty(value)) {
            return (validations.isNumber(value) || validations.isFloat(value)) && value >= 0;
        }
        return true;
    },

    maxNumber: (value, max) => !isExisty(value) || isEmpty(value) || parseInt(value, 10) <= parseInt(max, 10),

    minNumber: (value, min) => !isExisty(value) || isEmpty(value) || parseInt(value, 10) >= parseInt(min, 10),
};

module.exports = validations;
