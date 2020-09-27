import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {SwipeableList} from '@sandstreamdev/react-swipeable-list';
import {Provider} from 'react-redux';
import {configureStore} from './service/store/config';
import { green } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#124433',
            light: green[700],
        },
        secondary: {
            main: '#D9BF3D'
        }
    }
});

ReactDOM.render(
    <React.Fragment>
        <BrowserRouter>
            <Provider store={configureStore()}>
                <MuiThemeProvider theme={theme}>
                    <SwipeableList>
                        <App />
                    </SwipeableList>
                </MuiThemeProvider>
            </Provider>   
        </BrowserRouter>
    </React.Fragment>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
