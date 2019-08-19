import React, {Component} from 'react';
import  { Route, Switch, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './Containers/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount(){
    this.props.onAuthCheckState();
  }

  render(){
    let routes = (
      <Switch>
        <Route path = "/login" component = {Auth} />
        <Route path = "/" component = {BurgerBuilder} />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path = "/login" component = {Auth} />
          <Route path = "/checkout" component = {Checkout} />
          <Route path = "/orders" component = {Orders} />
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

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(App) );
