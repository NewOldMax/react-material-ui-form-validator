'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ValidatorForm = require('./ValidatorForm');

var _ValidatorForm2 = _interopRequireDefault(_ValidatorForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ValidatorComponent = function (_React$Component) {
    _inherits(ValidatorComponent, _React$Component);

    function ValidatorComponent(props) {
        _classCallCheck(this, ValidatorComponent);

        var _this = _possibleConstructorReturn(this, (ValidatorComponent.__proto__ || Object.getPrototypeOf(ValidatorComponent)).call(this, props));

        _this.invalid = [];

        _this.form = new _ValidatorForm2.default();

        _this.state = {
            isValid: true,
            errorMessages: props.errorMessages,
            validators: props.validators
        };

        _this.validate = _this.validate.bind(_this);
        _this.getErrorMessage = _this.getErrorMessage.bind(_this);
        _this.makeInvalid = _this.makeInvalid.bind(_this);
        _this.instantValidate = true;
        _this.configure = _this.configure.bind(_this);
        return _this;
    }

    _createClass(ValidatorComponent, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.configure();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.instantValidate) {
                this.validate(nextProps.value);
            }
            if (nextProps.validators && nextProps.errorMessages) {
                this.setState({ validators: nextProps.validators, errorMessages: nextProps.errorMessages });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.context.form.detachFromForm(this);
        }
    }, {
        key: 'getErrorMessage',
        value: function getErrorMessage() {
            var type = _typeof(this.state.errorMessages);

            if (type === 'string') {
                return this.state.errorMessages;
            } else if (type === 'object') {
                if (this.invalid.length > 0) {
                    return this.state.errorMessages[this.invalid[0]];
                }
            }
            // eslint-disable-next-line
            console.log('unknown errorMessages type', this.state.errorMessages);
            return true;
        }
    }, {
        key: 'configure',
        value: function configure() {
            this.context.form.attachToForm(this);
            this.instantValidate = this.context.form.instantValidate;
            if (!this.props.name) {
                throw new Error('Form field requires a name property when used');
            }
        }
    }, {
        key: 'validate',
        value: function validate(value, includeRequired) {
            var _this2 = this;

            this.invalid = [];
            var result = [];
            var valid = true;
            this.state.validators.map(function (validator, i) {
                var obj = {};
                obj[i] = _this2.form.getValidator(validator, value, includeRequired);
                return result.push(obj);
            });
            result.map(function (item) {
                return Object.keys(item).map(function (key) {
                    if (!item[key]) {
                        valid = false;
                        _this2.invalid.push(key);
                    }
                    return key;
                });
            });

            this.setState({ isValid: valid });
        }
    }, {
        key: 'isValid',
        value: function isValid() {
            return this.state.isValid;
        }
    }, {
        key: 'makeInvalid',
        value: function makeInvalid() {
            this.setState({ isValid: false });
        }
    }]);

    return ValidatorComponent;
}(_react2.default.Component);

ValidatorComponent.contextTypes = {
    form: _react2.default.PropTypes.object
};

ValidatorComponent.propTypes = {
    errorMessages: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.string]),
    validators: _react2.default.PropTypes.array,
    name: _react2.default.PropTypes.string,
    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]).isRequired
};

ValidatorComponent.defaultProps = {
    errorMessages: 'error',
    validators: []
};

exports.default = ValidatorComponent;