import React, {Component} from 'react';
import {Alert, TouchableOpacity, Text, TextInput, StyleSheet, View} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

import InputWrapper from './InputWrapper';


export default class extends Component {

    constructor(props) {
        super(props);

        this.state = {
            focus: false,
            value: this.props.value,
            isDateTimePickerVisible: false,
        };
    }

    _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true, focus: true});

    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false, focus: false,});

    _handleDatePicked = (date) => {
        this.props.onChange(date);
        this.setState({value: date});

        this._hideDateTimePicker();
    };

    render() {
        let dateProps = {};
        if(this.state.value){
            dateProps.date = this.state.value;
        }
        return (
            <InputWrapper  {...this.props}  label={this.props.label} error={this.props.error} focus={this.state.focus}>

                <TouchableOpacity onPress={() => this._showDateTimePicker()} style={{paddingTop: 8, paddingBottom: 8}}>
                    {this.state.value
                        ? <Text>{this.state.value.toLocaleDateString()}</Text>
                        : <Text style={{color: '#ddd'}}>{this.props.placeholder}</Text>}
                </TouchableOpacity>

                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    {...dateProps}
                />
            </InputWrapper>
        )
    }

}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 13,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});