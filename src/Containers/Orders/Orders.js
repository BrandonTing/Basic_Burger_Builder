import React, {Component} from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../Components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Orders extends Component{
    componentDidMount(){
        this.props.onFetchOrder(this.props.token, this.props.userId);
    }

    render(){
        let orderList = null;
        if (this.props.loading) {
            orderList = <Spinner />
        } else if ( this.props.orders && this.props.token) {
            orderList = (
                this.props.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients = {order.ingredients}
                        price = {(+order.price).toFixed(1)}
                        />   
                ))
            )    
        } else {
            orderList = (
                <div style = {{textAlign: 'center'}}>
                    <p>No Existing Orders.</p>
                </div>
            );    
        }
        return(
            <div>
                {orderList}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder : (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));