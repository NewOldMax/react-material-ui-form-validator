import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import ValidatorComponent from './ValidatorComponent';

export default class AutoCompleteValidator extends ValidatorComponent {

    render() {
        // eslint-disable-next-line
        const { errorMessage, validators, requiredError, ...rest } = this.props;
        const { isValid } = this.state;
        return (
            <AutoComplete
                {...rest}
                errorText={!isValid && this.getErrorMessage()}
            />
        );
    }
}
