import React from 'react';
import TextField from 'material-ui/TextField';
import ValidatorComponent from './ValidatorComponent';

export default class TextValidator extends ValidatorComponent {

    render() {
        // eslint-disable-next-line
        const { errorMessage, validators, requiredError, ...rest } = this.props;
        const { isValid } = this.state;
        return (
            <TextField
                {...rest}
                errorText={!isValid && this.getErrorMessage()}
            />
        );
    }
}
