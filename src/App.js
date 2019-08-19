import React, {Component} from 'react';
import  { Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/AsyncComponent/asyncComponent';

import Layout from './Containers/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Logout from './Containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
  return import('./Containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./Containers/Orders/Orders');
});

const asyncLogin = asyncComponent(() => {
  return import('./Containers/Auth/Auth');
});

class App extends Component {
  componentDidMount(){
    this.props.onAuthCheckState();
  }

  render(){
    let routes = (
      <Switch>
        <Route path = "/login" component = {asyncLogin} />
        <Route path = "/" component = {BurgerBuilder} />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path = "/login" component = {asyncLogin} />
          <Route path = "/checkout" component = {asyncCheckout} />
          <Route path = "/orders" component = {asyncOrders} />
          <Route path = "/logout" component = {Logout} />
          <Route path = "/" component = {BurgerBuilder} />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );  
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
    token: state.auth.token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState : () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
