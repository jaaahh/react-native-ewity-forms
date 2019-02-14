import React, {Component} from 'react';
import {Alert, TouchableOpacity, Text, TextInput, StyleSheet, View} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            isDateTimePickerVisible: false,
        };
    }

    _showDateTimePicker = () => {
        this.props.onFocus(true);
        this.setState({isDateTimePickerVisible: true,});
    }


    _hideDateTimePicker = () => {
        this.props.onFocus(false);
        this.setState({isDateTimePickerVisible: false});
    }

    _handleDatePicked = (date) => {
        this.props.onChange(date);
        this.setState({value: date});

        this._hideDateTimePicker();
    };

    render() {
        let dateProps = {};
        if (this.state.value) {
            dateProps.date = this.state.value;
        }
        return (
            <View>
                <TouchableOpacity onPress={() => this._showDateTimePicker()}
                                  style={{paddingTop: 8, paddingBottom: 8}}>
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
            </View>

        )
    }

}
