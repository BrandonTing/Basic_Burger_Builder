import React, {Component} from 'react';
import { connect } from 'react-redux';

import LayoutStyle from './Layout.module.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false,});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }
    
    render () {
        return (
            <React.Fragment>
                <Toolbar 
                    isAuth = {this.props.isAuth}
                    clicked = {this.sideDrawerToggleHandler} />
                <SideDrawer 
                    isAuth = {this.props.isAuth}
                    closed = {this.sideDrawerClosedHandler}
                    open = {this.state.showSideDrawer} />
                <main className = {LayoutStyle.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>    
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null, 
    };
}

export default connect(mapStateToProps)(Layout);