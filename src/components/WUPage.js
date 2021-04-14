import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import i18n from '../locales';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';
import ActiveAccount from './ActiveAccount';
import ResendActivation from './ResendActivation';
import * as pageStore from '../store/page';
import * as userStore from '../store/user';

export default class WUPage extends Component {
    constructor(props) {
        super(props)
        this.props = props;

        this.state = {
            i18n: i18n(),
            page: pageStore.getPage(),
            user: userStore.getUser()
        };
    }

    componentDidMount() {
        userStore.default.addListener(userStore.USER, this.userChanged);
        pageStore.default.addListener(pageStore.PAGE, this.pageChanged);
    }

    componentWillUnmount() {
        userStore.default.removeListener(userStore.USER, this.userChanged);
        pageStore.default.removeListener(pageStore.PAGE, this.pageChanged);
    }

    userChanged = () => {
        this.setState({
            user: userStore.getUser()
        });
    }

    pageChanged = () => {
        this.setState({
            page: pageStore.getPage()
        });
    }

    langChanged = () => {
        this.setState({
            i18n: i18n()
        });
    }

    render() {
        var page = this.state.page;
        return this.state.user != null ? null :
            (page == pageStore.PAGE_LOGIN ? <LoginPage wellcome={this.props.wellcome} description={this.props.description} /> :
                (page == pageStore.PAGE_REGISTER ? <RegisterPage /> :
                    (page == pageStore.PAGE_FORGOT_PASSWORD ? <ForgotPassword /> :
                        (page == pageStore.PAGE_CHANGE_PASSWORD ? <ChangePassword /> :
                            (page == pageStore.PAGE_ACTIVE_ACCOUNT ? <ActiveAccount /> :
                                (page == pageStore.PAGE_RESEND_ACTIVATION ? <ResendActivation /> :
                                    null))))));
    }
}

const styles = StyleSheet.create({

});