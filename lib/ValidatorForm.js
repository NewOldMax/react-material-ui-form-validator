'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ValidationRules = require('./ValidationRules');

var _ValidationRules2 = _interopRequireDefault(_ValidationRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ValidatorForm = function (_React$Component) {
    _inherits(ValidatorForm, _React$Component);

    function ValidatorForm(props) {
        _classCallCheck(this, ValidatorForm);

        var _this = _possibleConstructorReturn(this, (ValidatorForm.__proto__ || Object.getPrototypeOf(ValidatorForm)).call(this, props));

        _this.submit = _this.submit.bind(_this);
        _this.walk = _this.walk.bind(_this);
        _this.attachToForm = _this.attachToForm.bind(_this);
        _this.detachFromForm = _this.detachFromForm.bind(_this);
        _this.childs = [];
        return _this;
    }

    _createClass(ValidatorForm, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                form: {
                    attachToForm: this.attachToForm,
                    detachFromForm: this.detachFromForm,
                    instantValidate: this.instantValidate
                }
            };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.childs = [];
            this.instantValidate = this.props.instantValidate !== undefined ? this.props.instantValidate : true;
        }
    }, {
        key: 'getValidator',
        value: function getValidator(validator, value, includeRequired) {
            var result = true;
            var name = validator;
            if (name !== 'required' || includeRequired) {
                var extra = void 0;
                if (validator.indexOf(':') !== -1) {
                    validator = validator.split(':');
                    name = validator[0];
                    extra = validator[1];
                }
                result = _ValidationRules2.default[name](value, extra);
            }
            return result;
        }
    }, {
        key: 'attachToForm',
        value: function attachToForm(component) {
            if (this.childs.indexOf(component) === -1) {
                this.childs.push(component);
            }
        }
    }, {
        key: 'detachFromForm',
        value: function detachFromForm(component) {
            var componentPos = this.childs.indexOf(component);
            if (componentPos !== -1) {
                this.childs = this.childs.slice(0, componentPos).concat(this.childs.slice(componentPos + 1));
            }
        }
    }, {
        key: 'submit',
        value: function submit(event) {
            if (event) {
                event.preventDefault();
            }
            var result = this.walk(this.childs);
            if (result) {
                this.props.onSubmit();
            }
            return false;
        }
    }, {
        key: 'walk',
        value: function walk(children) {
            var self = this;
            var result = true;
            if (Array.isArray(children)) {
                children.forEach(function (input) {
                    if (!self.checkInput(input, true)) {
                        result = false;
                    }
                    return input;
                });
            } else {
                result = self.walk([children]);
            }
            return result;
        }
    }, {
        key: 'checkInput',
        value: function checkInput(input) {
            var result = true;
            var validators = input.props.validators;
            if (validators && !this.validate(input, true)) {
                result = false;
            }
            return result;
        }
    }, {
        key: 'validate',
        value: function validate(input, includeRequired) {
            var _this2 = this;

            var value = input.props.value;
            var validators = input.props.validators;
            var result = [];
            var valid = true;
            var validateResult = false;
            var component = this.find(this.childs, function (component) {
                return component.props.name === input.props.name;
            });
            validators.map(function (validator) {
                validateResult = _this2.getValidator(validator, value, includeRequired);
                result.push(validateResult);
                component.validate(component.props.value, true);
                return validator;
            });
            result.map(function (item) {
                if (!item) {
                    valid = false;
                }
                return item;
            });
            return valid;
        }
    }, {
        key: 'find',
        value: function find(collection, fn) {
            for (var i = 0, l = collection.length; i < l; i++) {
                var item = collection[i];
                if (fn(item)) {
                    return item;
                }
            }
            return null;
        }
    }, {
        key: 'render',
        value: function render() {
            // eslint-disable-next-line
            var _props = this.props,
                onSubmit = _props.onSubmit,
                instantValidate = _props.instantValidate,
                rest = _objectWithoutProperties(_props, ['onSubmit', 'instantValidate']);

            return _react2.default.createElement(
                'form',
                _extends({}, rest, { onSubmit: this.submit }),
                this.props.children
            );
        }
    }]);

    return ValidatorForm;
}(_react2.default.Component);

ValidatorForm.addValidationRule = function (name, callback) {
    _ValidationRules2.default[name] = callback;
};

ValidatorForm.childContextTypes = {
    form: _react2.default.PropTypes.object
};

ValidatorForm.propTypes = {
    onSubmit: _react2.default.PropTypes.func.isRequired,
    instantValidate: _react2.default.PropTypes.bool,
    children: _react2.default.PropTypes.node
};

exports.default = ValidatorForm;