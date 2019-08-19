import React, {Component} from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import Button from '../../../Components/UI/Button/Button';
import ContactDataStyle from './ContactData.module.css';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component{
    state = {
        orderForm : {
            name: {
                elementType : 'input',
                elementConfig : {
                    type: 'text', 
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                },
                valid: false,
                touched: false,
            },
            street:  {
                elementType : 'input',
                elementConfig : {
                    type: 'text', 
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email:  {
                elementType : 'input',
                elementConfig : {
                    type: 'email', 
                    placeholder: 'Your E-mail',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod:  {
                elementType : 'select',
                elementConfig : {
                    options: [
                        {value:'fastest', displayValue: 'Fastest'},
                        {value:'cheapest', displayValue: 'Chepeast'},
                    ]
                },
                value: 'fastest',
                validation: {
                },
                valid: true,
            },
        },
        formIsValid: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm ) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients : this.props.ing,
            price : this.props.price,
            orderData: formData,
            userId: this.props.userId,
        }
        this.props.onOrderBurger(order, this.props.token);
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid; 
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm,
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm:updatedOrderForm, formIsValid: formIsValid});
    };

    render(){
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form 
                onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input 
                        key = {formElement.id}
                        elementtype = {formElement.config.elementType}
                        elementconfig = {formElement.config.elementConfig}
                        value = {formElement.config.value}
                        changed = {(event) => {this.inputChangedHandler(event, formElement.id)}}
                        invalid = {!formElement.config.valid}
                        shouldValidate = {formElement.config.validation}
                        touched = {formElement.config.touched} />
                ))}
                <Button 
                    btnType = 'Success'
                    disabled = {!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className = {ContactDataStyle.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        ing : state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice, 
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));