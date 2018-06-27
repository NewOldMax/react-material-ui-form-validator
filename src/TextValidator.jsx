/* eslint-disable */
import React from 'react';
import TextField from '@material-ui/core/TextField';
/* eslint-enable */
import { ValidatorComponent } from 'react-form-validator-core';

export default class TextValidator extends ValidatorComponent {

    render() {
        // eslint-disable-next-line
        const { errorMessages, validators, requiredError, helperText, validatorListener, withRequiredValidator, ...rest } = this.props;
        const { isValid } = this.state;
        return (
            <TextField
                {...rest}
                error={!isValid}
                helperText={(!isValid && this.getErrorMessage()) || helperText}
            />
        );
    }
}
