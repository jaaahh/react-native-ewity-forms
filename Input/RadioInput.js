import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import _ from "lodash";
import Item from "./Components/Item";


export default class extends Component {
    state = {
        selected: null,
    };

    componentWillMount() {
        //if initialValue passed
        if (this.props.value !== null) {
            let selected = _.find(this.props.values, {value: this.props.value});
            this.setState({selected: selected})
        }
    }

    onSelect = (radio) => {
        this.props.onChange(radio.value);
        this.setState({selected: radio})
    };

    render() {
        let borderSelectedColor = "#000";
        if (this.props.primaryColor) {
            borderSelectedColor = this.props.primaryColor;
        }

        const values = this.props.values || [];

        return (
            <View>
                {values.length > 0 && values.map((radio, i) => {
                    const selected = _.isEqual(this.state.selected, radio);
                    return (
                        <Item key={i} selected={selected} item={radio} onPress={this.onSelect} primaryColor={borderSelectedColor}/>
                    )
                })}
            </View>
        )
    }

}

