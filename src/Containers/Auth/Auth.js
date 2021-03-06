import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import AuthStyle from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component{
    state = {
        controls: {
            email: {
                elementType : 'input',
                elementConfig : {
                    type: 'email', 
                    placeholder: 'Mail Address',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType : 'input',
                elementConfig : {
                    type: 'password', 
                    placeholder: 'password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            }
        },
        isSignUp: true,
    }

    componentDidMount(){
        if(!this.props.building && this.props.authRedirectPath !== '/' ) {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName] : updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true, 
            })
        });
        this.setState({controls:updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    SwitchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        };

        let inputForm = formElementArray.map(formElement => (
            <Input 
                key = {formElement.id}
                elementtype = {formElement.config.elementType}
                elementconfig = {formElement.config.elementConfig}
                value = {formElement.config.value}
                changed = {(event) => {this.inputChangedHandler(event, formElement.id)}}
                invalid = {!formElement.config.valid}
                shouldValidate = {formElement.config.validation}
                touched = {formElement.config.touched} />
        ))

        if (this.props.loading) {
            inputForm = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )

        }

        let authRedirect = null;
        if (this.props.isAuth) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }


        return (
            <div className = {AuthStyle.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit = {this.submitHandler}>
                    {inputForm}
                    <Button btnType = "Success">Submit</Button>
                </form>
                <Button 
                    btnType = "Danger"
                    clicked = {this.SwitchAuthModeHandler}
                    >SWITCH TO {this.state.isSignUp ? 'SIGN IN': 'SIGN UP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        token: state.auth.token,
        authRedirectPath: state.auth.authRedirectPath,
        building: state.burgerBuilder.building,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email, password, isSignUp) => dispatch(actions.auth(email,password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);