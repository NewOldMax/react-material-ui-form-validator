/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
/* eslint-enable */
import ValidatorForm from './ValidatorForm';

class ValidatorComponent extends React.Component {

    constructor(props) {
        super(props);

        this.invalid = [];

        this.form = new ValidatorForm();

        this.state = {
            isValid: true,
            errorMessages: props.errorMessages,
            validators: props.validators,
        };

        this.validate = this.validate.bind(this);
        this.getErrorMessage = this.getErrorMessage.bind(this);
        this.makeInvalid = this.makeInvalid.bind(this);
        this.instantValidate = true;
        this.configure = this.configure.bind(this);
    }

    componentWillMount() {
        this.configure();
    }

    componentWillReceiveProps(nextProps) {
        if (this.instantValidate) {
            this.validate(nextProps.value);
        }
        if (nextProps.validators && nextProps.errorMessages) {
            this.setState({ validators: nextProps.validators, errorMessages: nextProps.errorMessages });
        }
    }

    componentWillUnmount() {
        this.context.form.detachFromForm(this);
    }

    getErrorMessage() {
        const type = typeof this.state.errorMessages;

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

    configure() {
        this.context.form.attachToForm(this);
        this.instantValidate = this.context.form.instantValidate;
        if (!this.props.name) {
            throw new Error('Form field requires a name property when used');
        }
    }

    validate(value, includeRequired) {
        this.invalid = [];
        const result = [];
        let valid = true;
        this.state.validators.map((validator, i) => {
            const obj = {};
            obj[i] = this.form.getValidator(validator, value, includeRequired);
            return result.push(obj);
        });
        result.map(item =>
            Object.keys(item).map((key) => {
                if (!item[key]) {
                    valid = false;
                    this.invalid.push(key);
                }
                return key;
            }),
        );

        this.setState({ isValid: valid });
    }


    isValid() {
        return this.state.isValid;
    }

    makeInvalid() {
        this.setState({ isValid: false });
    }
}

ValidatorComponent.contextTypes = {
    form: PropTypes.object,
};

ValidatorComponent.propTypes = {
    errorMessages: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ]),
    validators: PropTypes.array,
    name: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.number,
    ]),
};

ValidatorComponent.defaultProps = {
    errorMessages: 'error',
    validators: [],
};

export default ValidatorComponent;
