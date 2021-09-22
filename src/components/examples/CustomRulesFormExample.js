import React from 'react';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const style = {
    info: {
        float: 'right',
    },
};

export default class CustomRulesFormExample extends React.Component {
    constructor(props) {
        super(props);

        // custom rule will have name 'isPasswordMatch'
        if (!ValidatorForm.hasValidationRule('isPasswordMatch')) {
            ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
                const { formData } = this.state;
                if (value !== formData.password) {
                    return false;
                }
                return true;
            });
        }

        this.state = {
            formData: {
                password: '',
                repeatPassword: '',
            },
            submitted: false,
        };
    }

    componentWillUnmount() {
        if (ValidatorForm.hasValidationRule('isPasswordMatch')) {
            ValidatorForm.removeValidationRule('isPasswordMatch');
        }
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        if (event.target.name === 'password') {
            this.form.isFormValid(false);
        }
        this.setState({ formData });
    }

    handleSubmit = () => {
        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });
    }

    render() {
        const { formData, submitted } = this.state;
        return (
            <ValidatorForm
                ref={r => (this.form = r)}
                onSubmit={this.handleSubmit}
            >
                <h2>Custom rules</h2>
                <div style={style.info}>
                    isPasswordMatch rule enabled: {ValidatorForm.hasValidationRule('isPasswordMatch') ? 'true' : 'false'}
                </div>
                <TextValidator
                    label="Password"
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={formData.password}
                />
                <br />
                <TextValidator
                    label="Repeat password"
                    onChange={this.handleChange}
                    name="repeatPassword"
                    type="password"
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['password mismatch', 'this field is required']}
                    value={formData.repeatPassword}
                />
                <br />
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={submitted}
                >
                    {
                        (submitted && 'Your form is submitted!')
                        || (!submitted && 'Submit')
                    }
                </Button>
            </ValidatorForm>
        );
    }
}
