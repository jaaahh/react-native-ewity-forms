import React, {Component} from 'react';
import {Alert, Text, TextInput, StyleSheet, View, ActivityIndicator} from 'react-native';
import Select from './Select';

export default class extends Component {
    state = {
        selected: this.props.value,
    };


    render() {
        const props = this.props;

        return (
            <Select
                placeholder={{
                    label: props.placeholder,
                    value: null,
                }}
                items={props.values || []}
                key={JSON.stringify(props.values)}
                onValueChange={props.onChange}
                onFocus={props.onFocus}
                style={{...pickerSelectStyles}}
                value={this.state.selected}
                disabled={props.disabled}
            />
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