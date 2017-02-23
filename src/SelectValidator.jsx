import React from 'react';
import SelectField from 'material-ui/SelectField';
import ValidatorComponent from './ValidatorComponent';

export default class SelectValidator extends ValidatorComponent {

    render() {
        // eslint-disable-next-line
        const { errorMessage, validators, requiredError, ...rest } = this.props;
        const { isValid } = this.state;
        return (
            <SelectField
                {...rest}
                errorText={!isValid && this.getErrorMessage()}
            />
        );
    }
}
