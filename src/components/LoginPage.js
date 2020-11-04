import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import i18n from '../locales';
import * as langStore from '../store/language';
import { Input, Button } from 'react-native-elements';
import * as pageStore from '../store/page';
import * as userApi from '../apis/user';
import * as userAction from '../actions/user';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            i18n: i18n(),
            username: '',
            usernameError: false,
            password: '',
            passwordError: false,
            serverErrorMessage: '',
            loading: false
        };
    }

    componentDidMount() {
        langStore.default.addListener(langStore.LANG, this.langChanged);
    }

    componentWillUnmount() {
        langStore.default.removeListener(langStore.LANG, this.langChanged);
    }

    langChanged = () => {
        this.setState({
            i18n: i18n()
        });
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

    login = async () => {
        this.setLoading(true);
        this.formControl();
        if (this.state.username && this.state.password) {
            try {
                var user = await userApi.login(this.state.username, this.state.password);
                if (user) {
                    this.setState({
                        serverErrorMessage: ""
                    }, () => userAction.login(user));
                } else {
                    this.setState({
                        serverErrorMessage: this.state.i18n.login.invalid
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

    formControl = () => {
        this.setState({
            serverErrorMessage: '',
            usernameError: !this.state.username,
            passwordError: !this.state.password,
        });
    }

    gotoRegister = () => {
        pageStore.setPage(pageStore.PAGE_REGISTER);
    }

    gotoForgotPass = () => {
        pageStore.setPage(pageStore.PAGE_FORGOT_PASSWORD);
    }

    gotoResendActivation = () => {
        pageStore.setPage(pageStore.PAGE_RESEND_ACTIVATION);
    }

    gotoActiveAccount = () => {
        pageStore.setPage(pageStore.PAGE_ACTIVE_ACCOUNT);
    }

    render() {
        return <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                {
                    this.props.wellcome ?
                        <View style={{ backgroundColor: '#F6F6F6', padding: 30, paddingVertical: 10 }}>
                            <Text
                                style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', padding: 20, paddingBottom: 0 }}
                            >{this.props.wellcome}</Text>

                            {this.props.description ? <Text
                                style={{ color: '#333333', textAlign: 'center', fontSize: 14, padding: 14, paddingTop: 10 }}
                            >{this.props.description}</Text> : null}
                        </View>
                        : null
                }

                {
                    this.props.wellcome ? <View style={{}}>
                        <Text
                            style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', padding: 20, paddingBottom: 0 }}
                        >{this.state.i18n.login.title}</Text>
                    </View> : <View style={{ padding: 30, paddingVertical: 10 }}>
                            <Text
                                style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', padding: 20, paddingBottom: 0 }}
                            >{this.state.i18n.login.title}</Text>
                        </View>
                }

                <View style={{ padding: 16 }}>
                    <Input
                        containerStyle={{ paddingTop: 10 }}
                        inputStyle={{ left: 10, fontSize: 16, borderBottomWidth: 0 }}
                        inputContainerStyle={{ borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 10, paddingVertical: 5, backgroundColor: '#F6F6F6' }}
                        placeholder={this.state.i18n.login.username}
                        onChangeText={this.setUsername}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.usernameError ? this.state.i18n.login.enterUsername : ''}
                    />
                    <Input
                        containerStyle={{ paddingTop: 10 }}
                        inputStyle={{ left: 10, fontSize: 16, borderBottomWidth: 0 }}
                        inputContainerStyle={{ borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 10, paddingVertical: 5, backgroundColor: '#F6F6F6' }}
                        placeholder={this.state.i18n.login.password}
                        secureTextEntry={true}
                        onChangeText={this.setPassword}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.passwordError ? this.state.i18n.login.enterPassword : ''}
                    />

                    {
                        this.state.serverErrorMessage ? <Text
                            style={{ textAlign: 'center', fontSize: 14, fontWeight: '300', padding: 14, paddingTop: 10, color: 'red' }}
                        >{this.state.serverErrorMessage}</Text> : null
                    }

                    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                        <Button
                            buttonStyle={{ backgroundColor: '#2B388F', color: '#FFFFFF', borderRadius: 10, paddingVertical: 13 }}
                            titleStyle={{ color: '#FFFFFF', fontSize: 16 }}
                            containerStyle={{ paddingHorizontal: 10, flex: 1 }}
                            title={this.state.i18n.login.login}
                            type="outline"
                            onPress={this.login}
                            loading={this.state.loading}
                        />

                        <View style={{}}>
                            <Button
                                buttonStyle={{ borderColor: 'black', padding: 0 }}
                                titleStyle={{ color: 'black', fontSize: 14 }}
                                containerStyle={{ paddingHorizontal: 12, alignSelf: 'flex-end' }}
                                title={this.state.i18n.login.forgotpass}
                                type="clear"
                                onPress={this.gotoForgotPass}
                            />

                            <Button
                                buttonStyle={{ borderColor: 'black', padding: 0 }}
                                titleStyle={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}
                                containerStyle={{ paddingHorizontal: 12, paddingTop: 5, alignSelf: 'flex-end' }}
                                title={this.state.i18n.login.register}
                                type="clear"
                                onPress={this.gotoRegister}
                            />
                        </View>
                    </View>

                    <View style={{ paddingTop: 30 }}>
                        <Text
                            style={{ color: '#333333', textAlign: 'center', fontSize: 14, paddingHorizontal: 14 }}
                        >{this.state.i18n.activeAccount.loginDescription}</Text>
                    </View>

                    <View style={{}}>
                        <Button
                            buttonStyle={{ borderColor: 'black', alignSelf: 'center' }}
                            titleStyle={{ color: '#2B388F', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}
                            containerStyle={{ paddingHorizontal: 10, paddingTop: 5, flex: 1 }} ß
                            title={this.state.i18n.activeAccount.confirm}
                            type="clear"
                            onPress={this.gotoActiveAccount}
                        />

                        <Button
                            buttonStyle={{ borderColor: 'black', alignSelf: 'center', paddingTop: 0 }}
                            titleStyle={{ color: 'black', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}
                            containerStyle={{ paddingHorizontal: 10, flex: 1 }}
                            title={this.state.i18n.activeAccount.noconfirm}
                            type="clear"
                            onPress={this.gotoResendActivation}
                        />
                    </View>
                </View>
            </ScrollView>

        </KeyboardAvoidingView>;
    }
}

const styles = StyleSheet.create({

});