'use strict';

// Load NPM modules
import React from 'react';
import ReactDOM from 'react-dom';

// Load antDesign components
import { LocaleProvider } from 'antd';
import enGb from 'antd/lib/locale-provider/en_GB';

// Load application
import Application from './../src/App.jsx';

// Render to body
ReactDOM.render(
  <LocaleProvider locale={enGb}>
    <Application />
  </LocaleProvider>,
  document.getElementById('app')
);
