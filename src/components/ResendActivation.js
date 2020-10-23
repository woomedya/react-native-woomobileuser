import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import i18n from '../locales';
import { Input, Button } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as pageStore from '../store/page';
import * as emailUtil from '../utilities/email';
import * as userApi from '../apis/user';

export default class ResendActivation extends Component {
    constructor(props) {
        super(props)
        this.props = props;

        this.state = {
            i18n: i18n(),
            email: '',
            emailError: false,
            emailInValidError: false,
            serverErrorMessage: '',
            loading: false
        };
    }

    gotoActiveAccount = () => {
        pageStore.setPage(pageStore.PAGE_ACTIVE_ACCOUNT);
    }

    sendActivation = async () => {
        this.setLoading(true);
        this.formControl();
        if (this.state.email && !this.state.emailInValidError) {
            try {
                var code = await userApi.sendActivation(this.state.email);
                if (code == 'ok') {
                    this.setState({
                        serverErrorMessage: ""
                    }, () => {
                        pageStore.setPage(pageStore.PAGE_ACTIVE_ACCOUNT);
                    });
                } else {
                    this.setState({
                        serverErrorMessage: this.state.i18n.resendActivation.invalid
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

    formControl = () => {
        this.setState({
            serverErrorMessage: '',
            emailError: !this.state.email,
            emailInValidError: emailUtil.regExp().test(this.state.email) == false,
        });
    }

    render() {
        return <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <View style={{ padding: 30, paddingVertical: 10 }}>
                    <Text
                        style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', padding: 20, paddingBottom: 0 }}
                    >{this.state.i18n.resendActivation.title}</Text>
                    <Text
                        style={{ color: '#333333', textAlign: 'center', fontSize: 14, padding: 14, paddingTop: 10 }}
                    >{this.state.i18n.resendActivation.description}</Text>
                </View>

                <View style={{ padding: 16 }}>
                    <Input
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

                    {
                        this.state.serverErrorMessage ? <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '300', padding: 14, paddingTop: 10, color: 'red' }}>{this.state.serverErrorMessage}</Text> : null
                    }

                    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                        <Button
                            buttonStyle={{ backgroundColor: '#2B388F', color: '#FFFFFF', borderRadius: 10, paddingVertical: 13 }}
                            titleStyle={{ color: '#FFFFFF', fontSize: 16 }}
                            containerStyle={{ paddingHorizontal: 10, flex: 1 }}
                            title={this.state.i18n.resendActivation.send}
                            type="outline"
                            onPress={this.sendActivation}
                            loading={this.state.loading}
                        />
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
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>;
    }
}

const styles = StyleSheet.create({

});