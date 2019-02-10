import React, {Component} from 'react';
import {
    Text,
    View,
    Animated,
} from 'react-native';


export default class InputWrapper extends Component {
    static propTypes = {
        label: 'string|null',
        error: 'string|array|null',
    };

    static defaultProps = {
        label: '',
        error: null,
    };

    state = {
        lineOpacity: new Animated.Value(0),
        borderBottomColor: 'rgba(200,200,200,1)',
    };

    componentDidMount() {
        Animated.timing(
            this.state.lineOpacity,
            {
                toValue: 1,
                duration: 1000,
            }
        ).start();
    }

    render() {
        const {label, required, error, focus, children} = this.props;
        let color = '#eee';
        if(focus){
            color = this.props.primaryColor ? this.props.primaryColor : '#005BAA';
        }
        if(error){
            color = 'red';
        }



        return (
            <View style={{backgroundColor: focus ? '#fff' : 'transparent', borderColor: color, borderWidth:1, width: null, borderRadius: 5, padding:10, marginTop: 10,
            }}>
                <Text style={{
                    fontWeight: '400',
                    color: '#999',

                }}>{label} {required ? <Text style={{color:'red'}}>*</Text> : ""}</Text>
                {children}
                {error ? <Text style={{paddingTop: 5, color: 'red', textAlign:'left'}}>{error}</Text> : null}
            </View>
        )
    }
}
