/* eslint-disable */
import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
/* eslint-enable */
import { ValidatorComponent } from 'react-form-validator-core';

export default class AutoCompleteValidator extends ValidatorComponent {

    render() {
        // eslint-disable-next-line
        const { errorMessages, validators, requiredError, errorText, validatorListener, ...rest } = this.props;
        const { isValid } = this.state;
        return (
            <AutoComplete
                {...rest}
                ref={(r) => { this.input = r; }}
                errorText={(!isValid && this.getErrorMessage()) || errorText}
            />
        );
    }
}
