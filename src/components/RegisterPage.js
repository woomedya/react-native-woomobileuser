import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import i18n from '../locales';
import { Input, Button } from 'react-native-elements';
import * as pageStore from '../store/page';
import * as tempuserStore from '../store/tempuser';
import * as userApi from '../apis/user';
import * as emailUtil from '../utilities/email';
import * as userAction from '../actions/user';

export default class RegisterPage extends Component {
    constructor(props) {
        super(props)
        this.props = props;

        this.data = pageStore.getData() || { type: 'register' };

        this.state = {
            i18n: i18n(),
            email: this.data.email || '',
            emailError: false,
            emailInValidError: false,
            username: '',
            usernameError: false,
            password: this.data.password || '',
            passwordError: false,
            passwordagain: this.data.password || '',
            passwordagainError: false,
            passwordagainSameError: false,
            serverErrorMessage: '',
            loading: false,
            social: this.data.type == 'social',
            token: this.data.token || ''
        };
    }

    register = async () => {
        this.setLoading(true);
        this.formControl();
        if (this.state.email && this.state.username && this.state.password && this.state.passwordagain && !this.state.emailInValidError && !this.state.passwordagainSameError) {
            try {
                var code = await userApi.register(this.state.email, this.state.username, this.state.password, this.state.token);
                if (code == 'ok') {
                    if (this.state.social) {
                        var res = await userApi.loginForFirebase(this.state.email, this.state.token);

                        if (res.user) {
                            this.setState({
                                serverErrorMessage: ""
                            }, () => userAction.login(res.user));
                        } else {
                            this.setState({
                                serverErrorMessage: this.state.i18n.login.socialerror
                            });
                        }
                    } else {
                        this.setState({
                            serverErrorMessage: ""
                        }, () => {
                            tempuserStore.setUsername(this.state.username);
                            pageStore.setPage(pageStore.PAGE_ACTIVE_ACCOUNT);
                        });
                    }
                } else if (code == 'usernameInUse') {
                    this.setState({
                        serverErrorMessage: this.state.i18n.register.usernameInUse
                    });
                } else if (code == 'mailInUse') {
                    this.setState({
                        serverErrorMessage: this.state.i18n.register.mailInUse
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

    setEmail = (email) => {
        this.setState({
            email: (email || '').trim().toLowerCase()
        }, this.formControl);
    }

    setUsername = (username) => {
        this.setState({
            username: (username || '').trim()
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
            emailError: !this.state.email,
            emailInValidError: emailUtil.regExp().test(this.state.email) == false,
            usernameError: !this.state.username,
            passwordError: !this.state.password,
            passwordagainError: !this.state.passwordagain,
            passwordagainSameError: this.state.password != this.state.passwordagain
        });
    }

    gotoLogin = () => {
        pageStore.setPage(pageStore.PAGE_LOGIN);
    }

    gotoActiveAccount = () => {
        pageStore.setPage(pageStore.PAGE_ACTIVE_ACCOUNT);
    }

    render() {
        return <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <View style={{ padding: 30, paddingVertical: 10 }}>
                    <Text
                        style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', padding: 20, paddingBottom: 0 }}
                    >{this.state.i18n.register.title}</Text>
                    {
                        this.state.social ? null : <Text
                            style={{ color: '#333333', textAlign: 'center', fontSize: 14, padding: 14, paddingTop: 10 }}
                        >{this.state.i18n.register.description}</Text>
                    }
                </View>

                <View style={{ padding: 16 }}>
                    <Input
                        disabled={this.state.social}
                        defaultValue={this.state.email}
                        containerStyle={{ paddingTop: 10 }}
                        inputStyle={{ left: 10, fontSize: 16, borderBottomWidth: 0 }}
                        inputContainerStyle={{ borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 10, paddingVertical: 5, backgroundColor: '#F6F6F6' }}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.emailError ? this.state.i18n.register.enterEmail :
                            this.state.emailInValidError ? this.state.i18n.register.invalidEmail : ''}
                        onChangeText={this.setEmail}
                        placeholder={this.state.i18n.register.email}
                        keyboardType="email-address"
                    />
                    <Input
                        containerStyle={{ paddingTop: 10 }}
                        inputStyle={{ left: 10, fontSize: 16, borderBottomWidth: 0 }}
                        inputContainerStyle={{ borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 10, paddingVertical: 5, backgroundColor: '#F6F6F6' }}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.usernameError ? this.state.i18n.login.enterUsername : ''}
                        onChangeText={this.setUsername}
                        placeholder={this.state.i18n.login.username}
                    />

                    {
                        this.state.social ? null : <Input
                            containerStyle={{ paddingTop: 10 }}
                            inputStyle={{ left: 10, fontSize: 16, borderBottomWidth: 0 }}
                            inputContainerStyle={{ borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 10, paddingVertical: 5, backgroundColor: '#F6F6F6' }}
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.passwordError ? this.state.i18n.login.enterPassword : ''}
                            onChangeText={this.setPassword}
                            placeholder={this.state.i18n.login.password}
                            secureTextEntry={true}
                        />
                    }

                    {
                        this.state.social ? null : <Input
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
                    }

                    {
                        this.state.serverErrorMessage ? <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '300', padding: 14, paddingTop: 10, color: 'red' }}>{this.state.serverErrorMessage}</Text> : null
                    }

                    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                        <Button
                            buttonStyle={{ backgroundColor: '#2B388F', color: '#FFFFFF', borderRadius: 10, paddingVertical: 13 }}
                            titleStyle={{ color: '#FFFFFF', fontSize: 16 }}
                            containerStyle={{ paddingHorizontal: 10, flex: 1 }}
                            title={this.state.i18n.register.register}
                            type="outline"
                            onPress={this.register}
                            loading={this.state.loading}
                        />
                    </View>

                    {
                        this.state.social ? null :
                            <View style={{}}>
                                <Button
                                    buttonStyle={{ borderColor: 'black', alignSelf: 'center' }}
                                    titleStyle={{ color: '#2B388F', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}
                                    containerStyle={{ paddingHorizontal: 10, paddingTop: 5, flex: 1 }} ß
                                    title={this.state.i18n.activeAccount.confirm}
                                    type="clear"
                                    onPress={this.gotoActiveAccount}
                                />
                            </View>
                    }
                </View>
            </ScrollView>
        </KeyboardAvoidingView>;
    }
}

const styles = StyleSheet.create({

});