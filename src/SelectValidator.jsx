/* eslint-disable */
import React from 'react';
import SelectField from 'material-ui/SelectField';
/* eslint-enable */
import ValidatorComponent from './ValidatorComponent';

export default class SelectValidator extends ValidatorComponent {

    render() {
        // eslint-disable-next-line
        const { errorMessages, validators, requiredError, errorText, validatorListener, ...rest } = this.props;
        const { isValid } = this.state;
        return (
            <SelectField
                {...rest}
                ref={(r) => { this.input = r; }}
                errorText={(!isValid && this.getErrorMessage()) || errorText}
            />
        );
    }
}
