import React from 'react';
import Paper from '@mui/material/Paper';
import SimpleFormExample from './examples/SimpleFormExample';
import CustomRulesFormExample from './examples/CustomRulesFormExample';
import OnBlurExample from './examples/OnBlurExample';
import StepByStepExample from './examples/StepByStepExample';
import DebouncedExample from './examples/DebouncedExample';
import Example from './Example';
import packageData from '../../package.json';

const version = packageData.dependencies['react-material-ui-form-validator'];

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
        <h1 style={style.title}>React material-ui form validator ({version}) examples</h1>
        <Paper style={style.example}>
            <Example className="language-javascript" component="pre">
                {require('./examples/SimpleFormExample.example')}
            </Example>
            <SimpleFormExample />
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
        <Paper style={style.example}>
            <Example className="language-javascript" component="pre">
                {require('./examples/DebouncedExample.example')}
            </Example>
            <DebouncedExample />
        </Paper>
    </div>
);

export default Home;
