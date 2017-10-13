/* eslint-disable */
import React from 'react';
import TextField from 'material-ui/TextField';
import Autosuggest from 'react-autosuggest';
/* eslint-enable */
import ValidatorComponent from './ValidatorComponent';

export default class AutoCompleteValidator extends ValidatorComponent {

    render() {
        // eslint-disable-next-line
        const { errorMessages, validators, requiredError, helperText, validatorListener, autosuggestProps,  ...rest } = this.props;
        const { isValid } = this.state;
        return (
            <Autosuggest
                renderInputComponent={(
                    <TextField
                        {...rest}
                        error={!isValid}
                        helperText={(!isValid && this.getErrorMessage()) || helperText}
                    />
                )}
                {...autosuggestProps}
            />
        );
    }
}
