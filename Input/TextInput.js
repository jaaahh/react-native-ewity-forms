import React, {Component} from 'react';
import {TextInput} from 'react-native';
import InputWrapper from './InputWrapper';

export default class extends Component{
    state = {
        focus: false,
    }

    render(){
        return (
            <InputWrapper {...this.props} label={this.props.label} error={this.props.error} focus={this.state.focus}>
                <TextInput {...this.props} style={{paddingBottom: 6, paddingTop: 6,}}
                           onChangeText={this.props.onChange}
                           onFocus={() => this.setState({focus: true})}
                           onBlur={() => this.setState({focus: false})}
                           placeholder=""
                           selectionColor={this.props.primaryColor}
                           underlineColorAndroid='transparent'
                />
            </InputWrapper>
        )
    }

}