import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/css/App.css';
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter} from "react-router-dom";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
                    <App/>
                </DevSupport>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);


