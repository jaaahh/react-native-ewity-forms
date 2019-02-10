import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import _ from "lodash";

import InputWrapper from './InputWrapper';


export default class extends Component {
    state = {
        focus: false,
        selected: null,
    };

    componentWillMount(){
        //if initialValue passed
        if(this.props.value){
            let selected= _.find(this.props.values, {value:this.props.value});
            this.setState({selected: selected})
        }
    }

    onSelect = (radio) => {
        this.props.onChange(radio.value);
        this.setState({selected: radio})
    };

    render() {
        let borderSelectedColor = "#000";
        if(this.props.primaryColor){
            borderSelectedColor = this.props.primaryColor;
        }

        return (
            <InputWrapper {...this.props} label={this.props.label} error={this.props.error} focus={this.state.focus}>
                <View style={{flexDirection: 'row'}}>
                    {this.props.values.map((radio, i) => (
                        <TouchableOpacity
                            onPress={() => this.onSelect(radio)}
                            style={{backgroundColor: 'transparent', paddingLeft:0, paddingTop:10, paddingBottom:5, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
                            <View style={{
                                backgroundColor: _.isEqual(this.state.selected,radio) ? borderSelectedColor : '#fff',
                                height: 18,
                                width: 18,
                                borderRadius: 12,
                                borderWidth: 2,
                                borderColor: _.isEqual(this.state.selected,radio) ? borderSelectedColor : '#ccc',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            </View>
                            <Text style={{paddingLeft:5, paddingRight:5, color: _.isEqual(this.state.selected,radio) ? '#000' : '#ccc' }}>{radio.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </InputWrapper>
        )
    }

}