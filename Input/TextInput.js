import React, {Component} from 'react';
import {TextInput} from 'react-native';

export default class extends Component {

    render() {
        return (
            <TextInput {...this.props} style={{paddingBottom: 6, paddingTop: 6,}}
                       onChangeText={this.props.onChange}
                       onFocus={() => this.props.onFocus(true)}
                       onBlur={() => this.props.onFocus(false)}
                       placeholder=""
                       selectionColor={this.props.primaryColor}
                       underlineColorAndroid='transparent'
            />
        )
    }

}