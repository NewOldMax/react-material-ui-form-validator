import React from 'react';
import Paper from 'material-ui/Paper';
import SimpleFormExample from './examples/SimpleFormExample';
import ResetFormExample from './examples/ResetFormExample';
import CustomRulesFormExample from './examples/CustomRulesFormExample';
import OnBlurExample from './examples/OnBlurExample';
import StepByStepExample from './examples/StepByStepExample';
import Example from './Example';

const style = {
    container: {
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
    },
    example: {
        padding: '16px',
        marginBottom: '20px',
    },
    title: {
        margin: '20px 0 40px',
        fontSize: '24px',
    },
    link: {
        float: 'right',
        marginTop: '20px',
    },
};

const Home = () => (
    <div style={style.container}>
        <a href="https://github.com/NewOldMax/react-material-ui-form-validator" style={style.link}>
            <img src="build/logo.png" alt="GitHub" />
        </a>
        <h1 style={style.title}>React material-ui form validator examples</h1>
        <Paper style={style.example}>
            <Example className="language-javascript" component="pre">
                {require('./examples/SimpleFormExample.example')}
            </Example>
            <SimpleFormExample />
        </Paper>
        <Paper style={style.example}>
            <Example className="language-javascript" component="pre">
                {require('./examples/ResetFormExample.example')}
            </Example>
            <ResetFormExample />
        </Paper>
        <Paper style={style.example}>
            <Example className="language-javascript" component="pre">
                {require('./examples/CustomRulesFormExample.example')}
            </Example>
            <CustomRulesFormExample />
        </Paper>
        <Paper style={style.example}>
            <Example className="language-javascript" component="pre">
                {require('./examples/OnBlurExample.example')}
            </Example>
            <OnBlurExample />
        </Paper>
        <Paper style={style.example}>
            <Example className="language-javascript" component="pre">
                {require('./examples/StepByStepExample.example')}
            </Example>
            <StepByStepExample />
        </Paper>
    </div>
);

export default Home;
