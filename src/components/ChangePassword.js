import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import i18n from '../locales';
import { Input, Button } from 'react-native-elements';
import * as userApi from '../apis/user';
import * as userAction from '../actions/user';

export default class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.props = props;

        this.state = {
            i18n: i18n(),
            username: '',
            usernameError: false,
            recoverycode: '',
            recoverycodeError: false,
            password: '',
            passwordError: false,
            passwordagain: '',
            passwordagainError: false,
            passwordagainSameError: false,
            serverErrorMessage: '',
            loading: false
        };
    }

    recovery = async () => {
        this.setLoading(true);
        this.formControl();
        if (this.state.username && this.state.recoverycode && this.state.password && this.state.passwordagain && !this.state.passwordagainSameError) {
            try {
                var user = await userApi.recovery(this.state.username, this.state.recoverycode, this.state.password);
                if (user) {
                    this.setState({
                        serverErrorMessage: ""
                    }, () => userAction.login(user));
                } else {
                    this.setState({
                        serverErrorMessage: this.state.i18n.changePassword.invalid
                    });
                }
            } catch (error) {
                this.setState({
                    serverErrorMessage: this.state.i18n.login.error
                });
            }
        }
        this.setLoading(false);
    }

    setLoading = (value) => {
        this.setState({
            loading: value
        });
    }

    setUsername = (username) => {
        this.setState({
            username: (username || '').trim()
        }, this.formControl);
    }

    setRecoverycode = (recoverycode) => {
        this.setState({
            recoverycode: (recoverycode || '').trim()
        }, this.formControl);
    }

    setPassword = (password) => {
        this.setState({
            password: (password || '').trim()
        }, this.formControl);
    }

    setPasswordAgain = (passwordagain) => {
        this.setState({
            passwordagain: (passwordagain || '').trim()
        }, this.formControl);
    }

    formControl = () => {
        this.setState({
            serverErrorMessage: '',
            usernameError: !this.state.username,
            recoverycodeError: !this.state.recoverycode,
            passwordError: !this.state.password,
            passwordagainError: !this.state.passwordagain,
            passwordagainSameError: this.state.password != this.state.passwordagain
        });
    }

    render() {
        return <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <View style={{ padding: 30, paddingVertical: 10 }}>
                    <Text
                        style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', padding: 20, paddingBottom: 0 }}
                    >{this.state.i18n.changePassword.title}</Text>
                    <Text
                        style={{ color: '#333333', textAlign: 'center', fontSize: 14, padding: 14, paddingTop: 10 }}
                    >{this.state.i18n.changePassword.description}</Text>
                </View>

                <View style={{ padding: 16 }}>
                    <Input
                        containerStyle={{ paddingTop: 10 }}
                        inputStyle={{ left: 10, fontSize: 16, borderBottomWidth: 0 }}
                        inputContainerStyle={{ borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 10, paddingVertical: 5, backgroundColor: '#F6F6F6' }}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.usernameError ? this.state.i18n.login.enterUsername : ''}
                        onChangeText={this.setUsername}
                        placeholder={this.state.i18n.login.username}
                    />
                    <Input
                        containerStyle={{ paddingTop: 10 }}
                        inputStyle={{ left: 10, fontSize: 16, borderBottomWidth: 0 }}
                        inputContainerStyle={{ borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 10, paddingVertical: 5, backgroundColor: '#F6F6F6' }}
                        onChangeText={this.setRecoverycode}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.recoverycodeError ? this.state.i18n.changePassword.enterRecoveryCode : ''}
                        placeholder={this.state.i18n.changePassword.code}
                    />

                    <Input
                        containerStyle={{ paddingTop: 10 }}
                        inputStyle={{ left: 10, fontSize: 16, borderBottomWidth: 0 }}
                        inputContainerStyle={{ borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 10, paddingVertical: 5, backgroundColor: '#F6F6F6' }}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.passwordError ? this.state.i18n.login.enterPassword : ''}
                        onChangeText={this.setPassword}
                        placeholder={this.state.i18n.login.password}
                        secureTextEntry={true}
                    />

                    <Input
                        containerStyle={{ paddingTop: 10 }}
                        inputStyle={{ left: 10, fontSize: 16, borderBottomWidth: 0 }}
                        inputContainerStyle={{ borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 10, paddingVertical: 5, backgroundColor: '#F6F6F6' }}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.passwordagainError ? this.state.i18n.login.enterPassword :
                            this.state.passwordagainSameError ? this.state.i18n.register.passwordNotSame : ''}
                        onChangeText={this.setPasswordAgain}
                        placeholder={this.state.i18n.register.passwordagain}
                        secureTextEntry={true}
                    />

                    {
                        this.state.serverErrorMessage ? <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '300', padding: 14, paddingTop: 10, color: 'red' }}>{this.state.serverErrorMessage}</Text> : null
                    }

                    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                        <Button
                            buttonStyle={{ backgroundColor: '#2B388F', color: '#FFFFFF', borderRadius: 10, paddingVertical: 13 }}
                            titleStyle={{ color: '#FFFFFF', fontSize: 16 }}
                            containerStyle={{ paddingHorizontal: 10, flex: 1 }}
                            title={this.state.i18n.changePassword.change}
                            type="outline"
                            onPress={this.recovery}
                            loading={this.state.loading}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>;
    }
}

const styles = StyleSheet.create({

});