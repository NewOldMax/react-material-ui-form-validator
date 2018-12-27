/* eslint-disable */
import React, { Fragment } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
/* eslint-enable */
import { ValidatorComponent } from 'react-form-validator-core';

export default class CheckboxValidator extends ValidatorComponent {

    render() {
        /* eslint-disable no-unused-vars */
        const {
            label,
            errorMessages,
            validators,
            requiredError,
            value,
            ...rest
        } = this.props;
        const { isValid } = this.state;
        return (
            <Fragment>
                <FormControlLabel
                    label={label}
                    control={<Checkbox {...rest} />}
                />
                {!isValid && <FormHelperText error>{this.getErrorMessage()}</FormHelperText>}
            </Fragment>
        );
    }
}
