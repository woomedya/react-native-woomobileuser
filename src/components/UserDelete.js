import React, { Component } from 'react';
import { TouchableWithoutFeedback, Alert } from 'react-native';
import EntypoIcon from "react-native-vector-icons/Entypo";
import prompt from 'react-native-prompt-android';


import * as userAction from 'react-native-woomobileuser/src/actions/user';
import i18n from 'react-native-woomobileuser/src/locales';
import * as userStore from 'react-native-woomobileuser/src/store/user';
import * as userApi from '../apis/user';

export default class UserDelete extends Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            i18n: i18n(),
            user: userStore.getUser(),
            password: '',
            loading: false,
            serverErrorMessage: '',
        };
    }

    componentDidMount() {
        userStore.default.addListener(userStore.USER, this.userChanged);
    }

    componentWillUnmount() {
        userStore.default.removeListener(userStore.USER, this.userChanged);
    }

    userChanged = () => {
        this.setState({
            user: userStore.getUser()
        });
    }


    userDeleteFunc = async (password) => {
        if (this.state.user?.username) {

            try {
                var user = await userApi.userDelete(this.state.user.username, password);

                if (user) {
                    userAction.logout()
                } else {
                    this.alertMesagge(this.state.i18n.login.invalid)
                }
            } catch (error) {
                this.alertMesagge(this.state.i18n.login.error)

            }
        }
    }

    setLoading = (status) => {
        this.setState({
            loading: status,
        });
    }


    alertMesagge = (message) => {
        Alert.alert(
            message,
            "",
            [
                {
                    text: this.state.i18n.logout.cancel,
                    style: "cancel"
                },
            ],
            {
                cancelable: true,

            }
        );

    }

    deleteFunc = () => {

        prompt(
            this.state.i18n.delete.title,
            this.state.i18n.delete.desc,
            [
                {
                    text: this.state.i18n.delete.cancel,
                    style: "cancel"
                },
                {
                    text: this.state.i18n.delete.ok,
                    onPress: password => {
                        password.length > 1 &&
                            this.userDeleteFunc(password)
                    }
                }
            ],
            {
                type: 'secure-text',
            }
        );

    }

    render() {
        return this.state.user ? <TouchableWithoutFeedback
            onPress={this.deleteFunc}>

            <EntypoIcon
                name="trash"
                style={{ color: this.props.color || "#4F4F4F", padding: this.props.padding || 5 }}
                size={this.props.size || 22}
            />

        </TouchableWithoutFeedback> : null
    }
}