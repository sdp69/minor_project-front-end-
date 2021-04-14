import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';
import Root from "./Components/root";
import{BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
      <Root/>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
