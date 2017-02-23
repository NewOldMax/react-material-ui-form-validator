## Validation component for material-ui forms

Simple form validation component for material-ui library inspired by [formsy-react](https://github.com/christianalfoni/formsy-react)

Supported types:
+ Text
+ Select
+ AutoComplete
+ Date
+ Time

Default validation rules:
+ matchRegexp
+ isEmail
+ isEmpty
+ required
+ trim
+ isNumber
+ isFloat
+ isPositive


### Example

[example.gif](../examples/example.gif)

### Usage

You can pass any props of field components except ``errorText``, use ``errorMessages`` instead.
Your component must [provide a theme](http://www.material-ui.com/#/get-started/usage).

````javascript

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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
import Checkbox from 'material-ui/Checkbox';
import { ValidatorComponent } from 'react-material-ui-form-validator';

export default class CustomCheckboxValidator extends ValidatorComponent {

    render() {
        const { errorMessage, validators, requiredError, ...rest } = this.props;
        const { isValid } = this.state;
        const errorMessage = !isValid && this.getErrorMessage();
        return (
            <div>
                <Checkbox {...rest} />
                {errorMessage}
            </div>
        );
    }
}

````

### API

#### ValidatorForm

| Prop            | Required | Type     | Default value | Description                                                                                                                  |
|-----------------|----------|----------|---------------|------------------------------------------------------------------------------------------------------------------------------|
| onSubmit        | true     | function |               | Callback for form that fires when all validations are passed                                                                 |
| instantValidate | false    | bool     | false         | If true, form will be validated after each field change. If false, form will be validated only after clicking submit button. |

#### All validated fields (ValidatorComponent)

| Prop            | Required | Type     | Default value | Description                                                                            |
|-----------------|----------|----------|---------------|----------------------------------------------------------------------------------------|
| validators      | false    | array    |               | Array of validators. See list of default validators above.                             |
| errorMessages   | false    | array    |               | Array of error messages. Order of messages should be the same as `validators` prop.    |
| name            | true     | string   |               | Name of input                                                                          |

### Contributing

This component covers all my needs, but feel free to contribute.