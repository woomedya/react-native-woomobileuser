import React, { Component } from 'react';
import { TouchableWithoutFeedback, Alert } from 'react-native';
import EntypoIcon from "react-native-vector-icons/Entypo";


import * as userAction from '../actions/user';
import i18n from '../locales';
import * as userStore from '../store/user';



export default class LogoutButton extends Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            i18n: i18n(),
            user: userStore.getUser()
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

    logout = () => {
        Alert.alert(this.state.i18n.logout.title,
            this.state.i18n.logout.desc,
            [
                { text: this.state.i18n.logout.ok, onPress: userAction.logout },
                { text: this.state.i18n.logout.cancel, style: "cancel" },
            ]);
    }

    render() {
        return this.state.user ? <TouchableWithoutFeedback
            onPress={this.logout}>
            <EntypoIcon
                name="log-out"
                style={{ color: this.props.color || "#4F4F4F", padding: this.props.padding || 5 }}
                size={this.props.size || 22}
            />
        </TouchableWithoutFeedback> : null
    }
}