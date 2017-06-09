/* eslint-disable */
import React from 'react';
import TimePicker from 'material-ui/TimePicker';
/* eslint-enable */
import ValidatorComponent from './ValidatorComponent';

export default class TimeValidator extends ValidatorComponent {

    render() {
        // eslint-disable-next-line
        const { errorMessages, validators, requiredError, errorText, validatorListener, ...rest } = this.props;
        const { isValid } = this.state;
        return (
            <TimePicker
                {...rest}
                ref={(r) => { this.input = r; }}
                errorText={(!isValid && this.getErrorMessage()) || errorText}
            />
        );
    }
}
