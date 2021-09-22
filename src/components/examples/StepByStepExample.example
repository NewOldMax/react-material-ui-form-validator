import React from 'react';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default class StepByStepExample extends React.Component {
    state = {
        step: 1,
        data: {
            email1: '',
            email2: '',
            email3: '',
        },
        disabled: false,
        submitted: false,
    }

    onChange = (event) => {
        const { data } = this.state;
        data[event.target.name] = event.target.value;
        this.setState({ data });
    }

    submit = () => {
        this.form.submit();
    }

    handleSubmit = () => {
        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });
    }

    prevStep = () => {
        let { step } = this.state;
        if (step > 1) {
            step--;
        }
        this.setState({ step });
    }

    nextStep = () => {
        this.form.isFormValid(false).then((isValid) => {
            if (isValid) {
                let { step } = this.state;
                if (step < 3) {
                    step++;
                }
                this.setState({ step });
            }
        });
    }

    validatorListener = (result) => {
        this.setState({ disabled: !result });
    }

    renderStep = () => {
        const { step, data } = this.state;
        let content = null;
        switch (step) {
            case 1:
                content = (
                    <TextValidator
                        key={1}
                        name="email1"
                        label="email 1"
                        validators={['required', 'isEmail']}
                        errorMessages={['required field', 'invalid email']}
                        value={data.email1}
                        onChange={this.onChange}
                        validatorListener={this.validatorListener}
                    />
                );
                break;
            case 2:
                content = (
                    <TextValidator
                        key={2}
                        name="email2"
                        label="email 2"
                        validators={['required', 'isEmail']}
                        errorMessages={['required field', 'invalid email']}
                        value={data.email2}
                        onChange={this.onChange}
                        validatorListener={this.validatorListener}
                    />
                );
                break;
            case 3:
                content = (
                    <TextValidator
                        key={3}
                        name="email3"
                        label="email 3"
                        validators={['required', 'isEmail']}
                        errorMessages={['required field', 'invalid email']}
                        value={data.email3}
                        onChange={this.onChange}
                        validatorListener={this.validatorListener}
                    />
                );
                break;
        }
        return content;
    }

    render() {
        const { step, disabled, submitted } = this.state;
        return (
            <ValidatorForm
                ref={(r) => { this.form = r; }}
                onSubmit={this.handleSubmit}
                instantValidate
            >
                <h2>Step-by-step</h2>
                <br />
                {this.renderStep()}
                <br />
                <br />
                <br />
                <Button
                    onClick={this.prevStep}
                    style={{ marginRight: '16px' }}
                    disabled={step === 1}
                >
                    previous
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={step < 3 ? this.nextStep : this.submit}
                    disabled={disabled || submitted}
                >
                    {
                        (submitted && 'Your form is submitted!')
                        || (step < 3 ? 'Next' : 'Submit')
                    }
                </Button>
            </ValidatorForm>
        );
    }
}
