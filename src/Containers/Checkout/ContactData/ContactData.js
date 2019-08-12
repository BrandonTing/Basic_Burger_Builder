import React, {Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import ContactDataStyle from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

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
                valid: false,
                touched: false,
            },
        },
        formIsValid: false,
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm ) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.totalprice,
            orderData: formData,
        }
        axios.post('/orders.json', order)
            .then(response=> {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error=> {
                this.setState({loading: false});
            });
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid; 
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
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
        if (this.state.loading) {
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

export default ContactData;
