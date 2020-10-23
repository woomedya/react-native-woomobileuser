import React, { Component } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as pageStore from '../store/page';


export default class WUBackButton extends Component {
    goBack = () => {
        var page = pageStore.backPage();
        if (page == null)
            this.props.navigation.goBack();
    }

    render() {
        return <MaterialIcon
            name="keyboard-backspace"
            size={this.props.size || 30}
            color={this.props.color || 'white'}
            height={30}
            onPress={this.goBack}
        />;
    }
}