import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import ValidatorComponent from './ValidatorComponent';

export default class DateValidator extends ValidatorComponent {

    render() {
        // eslint-disable-next-line
        const { errorMessages, validators, requiredError, ...rest } = this.props;
        const { isValid } = this.state;
        return (
            <DatePicker
                {...rest}
                errorText={!isValid && this.getErrorMessage()}
            />
        );
    }
}
