import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

import Input from '../../utils/forms/inputs';
import ValidationRules from '../../utils/forms/validationRules';

import { connect } from 'react-redux';
import { signUp, signIn } from '../../store/actions/user_actions'
import { bindActionCreators } from 'redux';
import { setTokens } from '../../utils/misc';

class LogInForm extends Component {

    state = {
        type: 'Login',
        action: 'Login',
        actionMode: 'Not a user, Register',
        hasErrors: false,
        form: {
            email: {
                value: '',
                valid: false,
                type: 'textinput',
                rules: {
                    isRequired: true,
                    isEmail: true
                }
            },
            password: {
                value: '',
                valid: false,
                type: 'textinput',
                rules: {
                    isRequired: true,
                    minLength: 6
                }
            },
            confirmPassword: {
                value: '',
                valid: false,
                type: 'textinput',
                rules: {
                    confirmPass: 'password'
                }
            }
        }
    }

    updateInput = (name, value) => {
        this.setState({
            hasErrors: false
        })

        let formCopy = this.state.form;
        formCopy[name].value = value;
        
        let rules = formCopy[name].rules;
        let valid = ValidationRules(value, rules, formCopy);

        formCopy[name].valid = valid;

        this.setState({
            form: formCopy
        })
    }

    confirmPassword = () => (
        this.state.type != 'Login' ? 
            <Input
                placeholder= 'Confirm your password'
                type={this.state.form.confirmPassword.type}
                value={this.state.form.confirmPassword.value}
                onChangeText={value => this.updateInput('confirmPassword', value)}
                secureTextEntry
            />
        : null
    )

    changeFormType = () => {
        const type = this.state.type;
        this.setState({
            type: type === 'Login' ? 'Register' : 'Login',
            action: type === 'Login' ? 'Register' : 'Login',
            actionMode: type === 'Login' ? 'Registered? Login' : 'Not a user, Register'
        })
    }

    formHasErrors = () => (
        this.state.hasErrors ?
            <View style={styles.errorContainer}>
                <Text style={styles.errorLabel}>Opps, check your info</Text>
            </View>
        : null
    )

    manageAccess = () => {
        if (!this.props.User.userData.uid) {
            this.setState({hasErrors: true});
        } else {
            setTokens(this.props.User.userData, () => {
                this.setState({hasErrors: false});
                this.props.nextScreen();
            })
        }
    }

    submitUser = () => {
        let isFormValid = true;
        let formToSubmit = {};
        const formCopy = this.state.form;

        for (let key in formCopy) {
            if (key !== 'confirmPassword') {
                isFormValid = formCopy[key].valid;
                formToSubmit[key] = formCopy[key].value;
            }
        }

        if (isFormValid) {
            if (this.state.type === 'Login') {
                this.props.signIn(formToSubmit).then(() => {
                    this.manageAccess();
                })
            } else {
                this.props.signUp(formToSubmit).then(() => {
                    this.manageAccess();
                });
            }
        } else {
            this.setState({
                hasErrors: true
            })
        }
    }

    render(){
        return(
            <View style={styles.formInputContainer}>
                <Input 
                    placeholder='Enter your email'
                    type={this.state.form.email.type}
                    value={this.state.form.email.value}
                    onChangeText={value => this.updateInput('email', value)}
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                />

                <Input 
                    placeholder='Enter your password'
                    type={this.state.form.password.type}
                    value={this.state.form.password.value}
                    onChangeText={value => this.updateInput('password', value)}
                    autoCapitalize={'none'}
                    secureTextEntry
                />

                {this.confirmPassword()}
                {this.formHasErrors()}

                <View style={
                    this.props.isAndroid
                    ? styles.androidButton 
                    : styles.iosButton
                }> 
                    <Button
                        title= {this.state.action}
                        color='#fd9727'
                        onPress={() => this.submitUser()}
                    />
                </View>

                
                <View style={
                    this.props.isAndroid
                    ? styles.androidButton 
                    : styles.iosButton
                }>
                    <Button
                        title= {this.state.actionMode}
                        color='lightgrey'
                        onPress={() => this.changeFormType()}
                    />
                </View>

                <View>
                    <Button
                        title= "I'll do itt later"
                        color='lightgrey'
                        onPress={() => this.props.nextScreen()}
                    />
                </View> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formInputContainer:{
        minWidth: '100%',
        marginTop: 10,
        marginBottom: 10
    },
    androidButton: {
        marginBottom: 10,
        marginTop: 10,
    },
    iosButton: {
        marginBottom: 0
    },
    errorContainer: {
        marginBottom: 20,
        marginTop: 10
    },
    errorLabel: {
        color: 'red',
        fontFamily: 'Roboto-Black'
    }
})

function mapStateToProps(state) {
    console.log(state);
    return {
        User: state.User
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({signUp, signIn}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);