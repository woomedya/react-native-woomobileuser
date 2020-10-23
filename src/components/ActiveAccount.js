import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import i18n from '../locales';
import { Input, Button } from 'react-native-elements';
import * as tempuserStore from '../store/tempuser';
import * as userApi from '../apis/user';
import * as userAction from '../actions/user';

export default class ActiveAccount extends Component {
    constructor(props) {
        super(props)
        this.props = props;

        this.state = {
            i18n: i18n(),
            username: tempuserStore.getUsername(),
            usernameError: false,
            activationcode: '',
            activationcodeError: false,
            serverErrorMessage: '',
            loading: false
        };
    }

    activate = async () => {
        this.setLoading(true);
        this.formControl();
        if (this.state.username && this.state.activationcode) {
            try {
                var user = await userApi.activate(this.state.username, this.state.activationcode);
                if (user) {
                    this.setState({
                        serverErrorMessage: ""
                    }, () => userAction.login(user));
                } else {
                    this.setState({
                        serverErrorMessage: this.state.i18n.activeAccount.invalid
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

    setActivationcode = (activationcode) => {
        this.setState({
            activationcode: (activationcode || '').trim()
        }, this.formControl);
    }

    formControl = () => {
        this.setState({
            serverErrorMessage: '',
            usernameError: !this.state.username,
            activationcodeError: !this.state.activationcode
        });
    }

    render() {
        return <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <View style={{ padding: 30, paddingVertical: 10 }}>
                    <Text
                        style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', padding: 20, paddingBottom: 0 }}
                    >{this.state.i18n.activeAccount.title}</Text>
                    <Text
                        style={{ color: '#333333', textAlign: 'center', fontSize: 14, padding: 14, paddingTop: 10 }}
                    >{this.state.i18n.activeAccount.description}</Text>
                </View>

                <View style={{ padding: 16 }}>
                    <Input
                        containerStyle={{ paddingTop: 10 }}
                        inputStyle={{ left: 10, fontSize: 16, borderBottomWidth: 0 }}
                        inputContainerStyle={{ borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 10, paddingVertical: 5, backgroundColor: '#F6F6F6' }}
                        placeholder={this.state.i18n.login.username}
                        onChangeText={this.setUsername}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.usernameError ? this.state.i18n.login.enterUsername : ''}
                        defaultValue={this.state.username}
                    />

                    <Input
                        containerStyle={{ paddingTop: 10 }}
                        inputStyle={{ left: 10, fontSize: 16, borderBottomWidth: 0 }}
                        inputContainerStyle={{ borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 10, paddingVertical: 5, backgroundColor: '#F6F6F6' }}
                        placeholder={this.state.i18n.activeAccount.code}
                        onChangeText={this.setActivationcode}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.activationcodeError ? this.state.i18n.activeAccount.enterActivationCode : ''}
                    />

                    {
                        this.state.serverErrorMessage ? <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '300', padding: 14, paddingTop: 10, color: 'red' }}>{this.state.serverErrorMessage}</Text> : null
                    }

                    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                        <Button
                            buttonStyle={{ backgroundColor: '#2B388F', color: '#FFFFFF', borderRadius: 10, paddingVertical: 13 }}
                            titleStyle={{ color: '#FFFFFF', fontSize: 16 }}
                            containerStyle={{ paddingHorizontal: 10, flex: 1 }}
                            title={this.state.i18n.login.login}
                            type="outline"
                            onPress={this.activate}
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