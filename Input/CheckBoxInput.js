import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, Animated, Easing} from 'react-native';
import _ from "lodash";
import Item from "./Components/Item";


export default class extends Component {
    state = {
        selected: [],
    };
    scaleValue =  new Animated.Value(0.01);

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
            Animated.timing(this.scaleValue, {
                toValue: 1,
                duration: 225,
                easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            }).start();



        } else {
            Animated.timing(this.scaleValue, {
                toValue: 0,
            }).start(() => {

            });
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

        let values = this.props.values || [];


        return (
            <View>
                {values.length > 0 && values.map((radio, i) => {
                    const selected = this.checkifExists(radio.value);
                    return (
                     <Item key={i} item={radio} selected={selected} onPress={(item) => this.onSelect(item)} primaryColor={borderSelectedColor} />
                    )
                })
                }



            </View>
        )
    };

}