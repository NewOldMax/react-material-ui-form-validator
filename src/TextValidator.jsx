/* eslint-disable */
import React from 'react';
import TextField from '@material-ui/core/TextField';
/* eslint-enable */
import { ValidatorComponent } from 'react-form-validator-core';

export default class TextValidator extends ValidatorComponent {
    renderValidatorComponent() {
        /* eslint-disable no-unused-vars */
        const {
            error,
            errorMessages,
            validators,
            requiredError,
            helperText,
            validatorListener,
            withRequiredValidator,
            containerProps,
            ...rest
        } = this.props;
        const { isValid } = this.state;
        return (
            <TextField
                {...rest}
                error={!isValid || error}
                helperText={(!isValid && this.getErrorMessage()) || helperText}
            />
        );
    }
}
