'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AutoComplete = require('material-ui/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _ValidatorComponent2 = require('./ValidatorComponent');

var _ValidatorComponent3 = _interopRequireDefault(_ValidatorComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoCompleteValidator = function (_ValidatorComponent) {
    _inherits(AutoCompleteValidator, _ValidatorComponent);

    function AutoCompleteValidator() {
        _classCallCheck(this, AutoCompleteValidator);

        return _possibleConstructorReturn(this, (AutoCompleteValidator.__proto__ || Object.getPrototypeOf(AutoCompleteValidator)).apply(this, arguments));
    }

    _createClass(AutoCompleteValidator, [{
        key: 'render',
        value: function render() {
            // eslint-disable-next-line
            var _props = this.props,
                errorMessage = _props.errorMessage,
                validators = _props.validators,
                requiredError = _props.requiredError,
                rest = _objectWithoutProperties(_props, ['errorMessage', 'validators', 'requiredError']);

            var isValid = this.state.isValid;

            return _react2.default.createElement(_AutoComplete2.default, _extends({}, rest, {
                errorText: !isValid && this.getErrorMessage()
            }));
        }
    }]);

    return AutoCompleteValidator;
}(_ValidatorComponent3.default);

exports.default = AutoCompleteValidator;