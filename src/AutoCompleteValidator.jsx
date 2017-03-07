/* eslint-disable */
import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
/* eslint-enable */
import ValidatorComponent from './ValidatorComponent';

export default class AutoCompleteValidator extends ValidatorComponent {

    render() {
        // eslint-disable-next-line
        const { errorMessages, validators, requiredError, ...rest } = this.props;
        const { isValid } = this.state;
        return (
            <AutoComplete
                {...rest}
                ref={(r) => { this.input = r; }}
                errorText={!isValid && this.getErrorMessage()}
            />
        );
    }
}
