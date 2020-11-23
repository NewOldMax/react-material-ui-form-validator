## Validation component for material-ui forms

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/react-material-ui-form-validator.svg)](https://badge.fury.io/js/react-material-ui-form-validator)
[![Build Status](https://travis-ci.org/NewOldMax/react-material-ui-form-validator.svg?branch=master)](https://travis-ci.org/NewOldMax/react-material-ui-form-validator)

### [Demo](https://newoldmax.github.io/react-material-ui-form-validator/)

### Installation

````
npm install react-material-ui-form-validator
````

### Versions
+ 0.x, 1.x - supports material-ui <= 0.x
+ ^2.0.0 - supports material-ui >= 1.x || 3.x || 4.x

Implementation of [react-form-validator-core](https://www.npmjs.com/package/react-form-validator-core) for [material-ui](https://material-ui.com/)

### Migration guide

#### From <2.1.1 to >=2.1.1

Breaking changes was introduced to react-form-validator-core in order to avoid legacy context. If you have custom validator components then you should change `render` method of your input components to `renderValidatorComponent`.

Before:
````javascript
import React from 'react';
import { ValidatorComponent } from 'react-material-ui-form-validator';

class SomeValidator extends ValidatorComponent {
    render() {
        // return your validated component
    }
}

export default TextValidator;
````

After:
````javascript
import React from 'react';
import { ValidatorComponent } from 'react-material-ui-form-validator';

class SomeValidator extends ValidatorComponent {
    renderValidatorComponent() {
        // return your validated component
    }
}

export default TextValidator;
````
### Info

Supported types:
+ Text ([TextValidator](https://github.com/NewOldMax/react-material-ui-form-validator/blob/master/src/TextValidator.jsx))
+ Select ([SelectValidator](https://github.com/NewOldMax/react-material-ui-form-validator/blob/master/src/SelectValidator.jsx))

Some rules can accept extra parameter, example:
````javascript
<TextValidator
   {...someProps}
   validators={['minNumber:0', 'maxNumber:255', 'matchRegexp:^[0-9]$']}
/>
````


### Example

<img src="https://raw.githubusercontent.com/NewOldMax/react-material-ui-form-validator/master/examples/example.gif" width="285">

### Usage

You can pass any props of field components, but note that ``errorText`` prop will be replaced when validation errors occurred.
Your component must [provide a theme](http://www.material-ui.com/#/get-started/usage).

````javascript

import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class MyForm extends React.Component {

    state = {
        email: '',
    }

    handleChange = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }

    handleSubmit = () => {
        // your submit logic
    }

    render() {
        const { email } = this.state;
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <TextValidator
                    label="Email"
                    onChange={this.handleChange}
                    name="email"
                    value={email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                <Button type="submit">Submit</Button>
            </ValidatorForm>
        );
    }
}

````

You can add your custom rules:
````javascript

import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class ResetPasswordForm extends React.Component {

    state = {
        user: {
            password: '',
            repeatPassword: '',
        },
    };

    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.user.password) {
                return false;
            }
            return true;
        });
    }

    componentWillUnmount() {
        // remove rule when it is not needed
        ValidatorForm.removeValidationRule('isPasswordMatch');
    }

    handleChange = (event) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    handleSubmit = () => {
        // your submit logic
    }

    render() {
        const { user } = this.state;

        return (
            <ValidatorForm
                onSubmit={this.handleSubmit}
            >
                <TextValidator
                    label="Password"
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={user.password}
                />
                <TextValidator
                    label="Repeat password"
                    onChange={this.handleChange}
                    name="repeatPassword"
                    type="password"
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['password mismatch', 'this field is required']}
                    value={user.repeatPassword}
                />
                <Button type="submit">Submit</Button>
            </ValidatorForm>
        );
    }

````

Currently material-ui [doesn't support](https://github.com/callemall/material-ui/issues/3771) error messages for switches, but you can easily add your own:
````javascript
import React from 'react';
import red from '@material-ui/core/colors/red';
import Checkbox from '@material-ui/core/Checkbox';
import { ValidatorComponent } from 'react-material-ui-form-validator';

const red300 = red['500'];

const style = {
    right: 0,
    fontSize: '12px',
    color: red300,
    position: 'absolute',
    marginTop: '-25px',
};

class CheckboxValidatorElement extends ValidatorComponent {

    renderValidatorComponent() {
        const { errorMessages, validators, requiredError, value, ...rest } = this.props;

        return (
            <div>
                <Checkbox
                    {...rest}
                    ref={(r) => { this.input = r; }}
                />
                {this.errorText()}
            </div>
        );
    }

    errorText() {
        const { isValid } = this.state;

        if (isValid) {
            return null;
        }

        return (
            <div style={style}>
                {this.getErrorMessage()}
            </div>
        );
    }
}

export default CheckboxValidatorElement;
````
````javascript
    componentDidMount() {
        ValidatorForm.addValidationRule('isTruthy', value => value);
    }
...
    <CheckboxValidatorElement
        ...
        validators=['isTruthy']
        errorMessages=['this field is required']
        checked={value}
        value={value} // <---- you must provide this prop, it will be used only for validation
    />
````

##### [Advanced usage](https://github.com/NewOldMax/react-material-ui-form-validator/wiki)

### Contributing

This component covers all my needs, but feel free to contribute.
