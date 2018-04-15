import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import Home from './Home';
import ChannelEnter from './ChannelEnter';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route path='/channel/:channel' component={ChannelEnter}/>
      <Route component={Home}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
