import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

const errorStyle = {
    position: 'absolute',
    marginBottom: '-22px',
    color: 'red',
};

export default class StepByStepExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            data: {},
            disabled: false,
            submitted: false,
        };
        this.renderStep = this.renderStep.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submit = this.submit.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.validatorListener = this.validatorListener.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        const { data } = this.state;
        data[event.target.name] = event.target.value;
        this.setState({ data });
    }

    submit() {
        this.refs.form.submit();
    }

    handleSubmit() {
        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });
    }

    prevStep() {
        let step = this.state.step;
        if (step > 1) {
            step--;
        }
        this.setState({ step }, () => this.refs.form.walk(this.refs.form.childs));
    }

    nextStep() {
        if (this.refs.form.walk(this.refs.form.childs)) {
            let step = this.state.step;
            if (step < 3) {
                step++;
            }
            this.setState({ step }, () => this.refs.form.walk(this.refs.form.childs));
        }
    }

    validatorListener(result) {
        this.setState({ disabled: !result });
    }

    renderStep() {
        const { step, data } = this.state;
        let content = null;
        switch (step) {
            case 1:
                content = (
                    <TextValidator
                        key={1}
                        name="email1"
                        floatingLabelText="email 1"
                        validators={['required', 'isEmail']}
                        errorMessages={['required field', 'invalid email']}
                        value={data.email1}
                        onChange={this.onChange}
                        validatorListener={this.validatorListener}
                        errorStyle={errorStyle}
                    />);
                break;
            case 2:
                content = (
                    <TextValidator
                        key={2}
                        name="email2"
                        floatingLabelText="email 2"
                        validators={['required', 'isEmail']}
                        errorMessages={['required field', 'invalid email']}
                        value={data.email2}
                        onChange={this.onChange}
                        validatorListener={this.validatorListener}
                        errorStyle={errorStyle}
                    />);
                break;
            case 3:
                content = (
                    <TextValidator
                        key={3}
                        name="email3"
                        floatingLabelText="email 3"
                        validators={['required', 'isEmail']}
                        errorMessages={['required field', 'invalid email']}
                        value={data.email3}
                        onChange={this.onChange}
                        validatorListener={this.validatorListener}
                        errorStyle={errorStyle}
                    />);
                break;
        }
        return content;
    }

    render() {
        const { step, disabled, submitted } = this.state;
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                instantValidate
            >
                <h2>Step-by-step</h2>
                <br />
                {this.renderStep()}
                <br />
                <br />
                <br />
                <RaisedButton
                    label="previous"
                    onClick={this.prevStep}
                    style={{ marginRight: '16px' }}
                    primary
                    disabled={step === 1}
                />
                <RaisedButton
                    label={
                        (submitted && 'Your form is submitted!') ||
                        (step < 3 ? 'Next' : 'Submit')
                    }
                    onClick={step < 3 ? this.nextStep : this.submit}
                    primary
                    disabled={disabled || submitted}
                />
            </ValidatorForm>
        );
    }
}
