import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login'
import Tasklist from './components/Tasklist'
import store from './redux/store'
import { Provider } from 'react-redux'
import "./style/main.css"

const App = () => {
    return (
      <Router>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/tasklist' component={Tasklist} />
        </Switch>
    </Router>
    );
}

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>
, document.getElementById("root"));