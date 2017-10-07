## Validation component for material-ui forms

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/react-material-ui-form-validator.svg)](https://badge.fury.io/js/react-material-ui-form-validator)
[![Build Status](https://travis-ci.org/NewOldMax/react-material-ui-form-validator.svg?branch=master)](https://travis-ci.org/NewOldMax/react-material-ui-form-validator)

## Breaking change

Core validation was moved to [react-form-validator-core](https://www.npmjs.com/package/react-form-validator-core) package. You need install it in order to use this package

### [Demo](https://newoldmax.github.io/react-material-ui-form-validator/)

### Versions
+ <= 1.x - supports material-ui <= 0.x
+ => 2.x - supports material-ui >= 1.x (experimental support, you can install it by ``npm i react-material-ui-form-validator@next``)
+ => 1.0.1 - supports React 16

Implementation of [react-form-validator-core](https://www.npmjs.com/package/react-form-validator-core) for [material-ui](http://www.material-ui.com)

Supported types:
+ Text ([TextValidator](https://github.com/NewOldMax/react-material-ui-form-validator/blob/master/src/TextValidator.jsx))
+ Select ([SelectValidator](https://github.com/NewOldMax/react-material-ui-form-validator/blob/master/src/SelectValidator.jsx))
+ AutoComplete ([AutoCompleteValidator](https://github.com/NewOldMax/react-material-ui-form-validator/blob/master/src/AutoCompleteValidator.jsx))
+ Date ([DateValidator](https://github.com/NewOldMax/react-material-ui-form-validator/blob/master/src/DateValidator.jsx))
+ Time ([TimeValidator](https://github.com/NewOldMax/react-material-ui-form-validator/blob/master/src/TimeValidator.jsx))

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
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';

class MyForm extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const email = event.target.value;
        this.setState({ email });
    }

    handleSubmit() {
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
                    floatingLabelText="Email"
                    onChange={this.handleChange}
                    name="email"
                    value={email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                <RaisedButton type="submit" />
            </ValidatorForm>
        );
    }
}

````

You can add your custom rules:
````javascript

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';

class ResetPasswordForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.user.password) {
                return false;
            }
            return true;
        });
    }

    handleChange(event) {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    handleSubmit() {
        // your submit logic
    }

    render() {
        const { user } = this.state;

        return (
            <ValidatorForm
                onSubmit={this.handleSubmit}
            >
                <TextValidator
                    floatingLabelText="Password"
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={user.password}
                />
                <TextValidator
                    floatingLabelText="Repeat password"
                    onChange={this.handleChange}
                    name="repeatPassword"
                    type="password"
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['password mismatch', 'this field is required']}
                    value={user.repeatPassword}
                />
                <RaisedButton type="submit" />
            </ValidatorForm>
        );
    }

````

Currently material-ui [doesn't support](https://github.com/callemall/material-ui/issues/3771) error messages for switches, but you can easily add your own:
````javascript
import React from 'react';
import { red300 } from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import { ValidatorComponent } from 'react-form-validator-core';

class CheckboxValidatorElement extends ValidatorComponent {

    render() {
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

        const style = {
            right: 0,
            fontSize: '12px',
            color: red300,
            position: 'absolute',
            marginTop: '-25px',
        };

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
    componentWillMount() {
        ValidatorForm.addValidationRule('isTruthy', value => value);
    }
...
    <CheckboxValidatorElement
        ...
        validators=['isTruthy']
        errorMessages=['this field is required']
        checked={value}
        value={value} <---- you must provide this prop, it will be used only for validation
    />
````

##### [Advanced usage](https://github.com/NewOldMax/react-material-ui-form-validator/wiki)

### Contributing

This component covers all my needs, but feel free to contribute.