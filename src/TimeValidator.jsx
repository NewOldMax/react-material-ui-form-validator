import React from 'react';
import TimePicker from 'material-ui/TimePicker';
import ValidatorComponent from './ValidatorComponent';

export default class TimeValidator extends ValidatorComponent {

    render() {
        // eslint-disable-next-line
        const { errorMessages, validators, requiredError, ...rest } = this.props;
        const { isValid } = this.state;
        return (
            <TimePicker
                {...rest}
                errorText={!isValid && this.getErrorMessage()}
            />
        );
    }
}
