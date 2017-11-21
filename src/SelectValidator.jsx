/* eslint-disable */
import React from 'react';
import Select from 'material-ui/Select';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
/* eslint-enable */
import ValidatorComponent from './ValidatorComponent';

export default class SelectValidator extends ValidatorComponent {

    render() {
        /* eslint-disable no-unused-vars */
        const {
            errorMessages,
            validators,
            requiredError,
            helperText,
            validatorListener,
            formControl: FormControl,
            inputLabel: InputLabel,
            ...rest
        } = this.props;
        const { isValid } = this.state;
        return (
            <FormControl error={!isValid}>
                <InputLabel />
                <Select
                    {...rest}
                    ref={(r) => { this.input = r; }}
                />
                <FormHelperText>{(!isValid && this.getErrorMessage()) || helperText}</FormHelperText>
            </FormControl>
        );
    }
}
