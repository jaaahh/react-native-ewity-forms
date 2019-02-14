import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import _ from "lodash";


export default class extends Component {
    state = {
        selected: [],
    };

    componentWillMount() {
        //if initialValue passed
        const initialValue = this.props.value;
        if (initialValue) {
            let selected = this.state.selected;
            selected.push(initialValue);
            this.setState({selected: selected})
        }
    }


    checkifExists = (value) => {

        const selected = this.state.selected;

        let foundObject = _.find(selected, function (e) {
            return e === value;
        });

        if (foundObject) {
            return foundObject;
        }
        return false;

    }

    onSelect = (radio) => {
        let selected = this.state.selected;
        const value = radio.value;

        if (!this.checkifExists(value)) {
            selected.push(value);
        } else {
            selected = _.pull(selected, value);
        }

        this.props.onChange(selected);
        this.setState({selected})
    };


    render() {
        let borderSelectedColor = "#000";
        if (this.props.primaryColor) {
            borderSelectedColor = this.props.primaryColor;
        }

        return (
            <View style={{flexDirection: 'row'}}>
                {this.props.values.map((radio, i) => (
                    <TouchableOpacity
                        onPress={() => this.onSelect(radio)}
                        style={{
                            backgroundColor: 'transparent',
                            paddingLeft: 0,
                            paddingTop: 10,
                            paddingBottom: 5,
                            flexDirection: 'row',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}>
                        <View style={{
                            backgroundColor: this.checkifExists(radio.value) ? borderSelectedColor : '#fff',
                            height: 18,
                            width: 18,
                            borderRadius: 12,
                            borderWidth: 2,
                            borderColor: _.has(this.state.selected, radio.value) ? borderSelectedColor : '#ccc',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        </View>
                        <Text style={{
                            paddingLeft: 5,
                            paddingRight: 5,
                            color: _.isEqual(this.state.selected, radio) ? '#000' : '#ccc'
                        }}>{radio.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

        )
    }

}