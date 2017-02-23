import React from 'react';
import Rules from './ValidationRules';

class ValidatorForm extends React.Component {

    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
        this.walk = this.walk.bind(this);
        this.attachToForm = this.attachToForm.bind(this);
        this.detachFromForm = this.detachFromForm.bind(this);
        this.childs = [];
    }

    getChildContext() {
        return {
            form: {
                attachToForm: this.attachToForm,
                detachFromForm: this.detachFromForm,
                instantValidate: this.instantValidate,
            },
        };
    }

    componentWillMount() {
        this.childs = [];
        this.instantValidate = this.props.instantValidate !== undefined ? this.props.instantValidate : true;
    }

    getValidator(validator, value, includeRequired) {
        let result = true;
        let name = validator;
        if (name !== 'required' || includeRequired) {
            let extra;
            if (validator.indexOf(':') !== -1) {
                validator = validator.split(':');
                name = validator[0];
                extra = validator[1];
            }
            result = Rules[name](value, extra);
        }
        return result;
    }

    attachToForm(component) {
        if (this.childs.indexOf(component) === -1) {
            this.childs.push(component);
        }
    }

    detachFromForm(component) {
        const componentPos = this.childs.indexOf(component);
        if (componentPos !== -1) {
            this.childs = this.childs.slice(0, componentPos)
                .concat(this.childs.slice(componentPos + 1));
        }
    }

    submit(event) {
        if (event) {
            event.preventDefault();
        }
        const result = this.walk(this.childs);
        if (result) {
            this.props.onSubmit();
        }
        return false;
    }

    walk(children) {
        const self = this;
        let result = true;
        if (Array.isArray(children)) {
            children.forEach((input) => {
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

    checkInput(input) {
        let result = true;
        const validators = input.props.validators;
        if (validators && !this.validate(input, true)) {
            result = false;
        }
        return result;
    }

    validate(input, includeRequired) {
        const value = input.props.value;
        const validators = input.props.validators;
        const result = [];
        let valid = true;
        let validateResult = false;
        const component = this.find(this.childs, component => component.props.name === input.props.name);
        validators.map((validator) => {
            validateResult = this.getValidator(validator, value, includeRequired);
            result.push(validateResult);
            component.validate(component.props.value, true);
            return validator;
        });
        result.map((item) => {
            if (!item) {
                valid = false;
            }
            return item;
        });
        return valid;
    }

    find(collection, fn) {
        for (let i = 0, l = collection.length; i < l; i++) {
            const item = collection[i];
            if (fn(item)) {
                return item;
            }
        }
        return null;
    }

    render() {
        // eslint-disable-next-line
        const { onSubmit, instantValidate, ...rest } = this.props;
        return (
            <form {...rest} onSubmit={this.submit}>
                {this.props.children}
            </form>
        );
    }
}

ValidatorForm.addValidationRule = (name, callback) => {
    Rules[name] = callback;
};

ValidatorForm.childContextTypes = {
    form: React.PropTypes.object,
};

ValidatorForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    instantValidate: React.PropTypes.bool,
    children: React.PropTypes.node,
};

export default ValidatorForm;