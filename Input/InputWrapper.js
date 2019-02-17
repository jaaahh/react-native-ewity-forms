import React, {Component} from 'react';
import {
    Text,
    View,
    Animated,
    Dimensions,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import _ from "lodash";
export default class InputWrapper extends Component {
    static propTypes = {
        label: 'string|null',
        error: 'string|array|null',
    };

    static defaultProps = {
        label: '',
        error: null,
    };

    width = new Animated.Value(0);
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            values: this.props.values,

        };
    }

    animateSelected = (selected) => {
        Animated.spring(
            // Animate value over time
            this.width, // The value to drive
            {
                toValue: selected ? this.state.layoutWidth : 0, // Animate to final value of 1
                bounciness:10
            },
        ).start(); // Start the animation
    }


    componentDidMount() {
        this.resolveValues();
    }

    componentDidUpdate(prevProps) {
        if (this.shouldResolveValues(prevProps)) {
            this.resolveValues();
        }
    }

    resolveValues = () => {
        const values = this.props.values;

        if (!values) {
            this.setState({values: null})
            return;
        }

        if (!_.isFunction(values)) {
            this.setState({values, loading: false})
            return;
        }

        const result = values();

        if (!(result instanceof Promise)) {
            this.setState({values: result, loading: false})
            return;
        }

        this.setState({values: null, loading: true});
        result
            .then(data => this.setState({values: data}))
            .catch(e => {
                console.error(e);
            })
            .finally(() => {
                this.setState({loading: false});
            })

    }

    shouldResolveValues = (prevProps) => {
        if (!this.props.values) {
            return false;
        }

        if (_.isFunction(this.props.values) && !this.props.valuesDependencies) {
            return false;
        }

        if (this.props.valuesDependencies) {
            return !_.isEqual(prevProps.valuesDependencies, this.props.valuesDependencies);

        }

        return !_.isEqual(prevProps.values, this.props.values);
    }

    onChange = (value) => {

        if (!this.props.transformer) {
            console.log("calling transformer")
            this.props.onChange(value);
            return
        }

        value = this.props.transformer(value);
        if (!(value instanceof Promise)) {
            this.props.onChange(value);
            return
        }
        this.setState({loading: true});

        value.then(data => {
            this.props.onChange(data);
        }).catch(e => {
            console.error(e);
        }).finally(() => {
            this.setState({loading: false})
        });

    }

    renderLoading() {
        return (
            <View style={{flexDirection: 'row', paddingTop: 8}}>
                <ActivityIndicator color={this.props.primaryColor || '#999'}/>
                <Text style={{paddingLeft: 10, color: '#999'}}>Loading</Text>
            </View>
        )
    }

    onFocus(focus){
        this.animateSelected(focus);
        this.setState({focus});


    }

    renderChildren() {
        const {error, onChange, label, required, name, children, ...rest} = this.props;

        const childrenProps = {
            ...rest,
            onChange: this.onChange,
            values: this.state.values,
            loading: this.state.loading,
            onFocus: (focus) => this.onFocus(focus)
        };

        return (
            <View>
                {children(childrenProps)}
            </View>
        )
    }

    onLayout = (event) => {
        var {x, y, width, height} = event.nativeEvent.layout;
        this.setState({layoutWidth: width})
    }

    render() {


        let {label, required, error} = this.props;
        let color = '#eee';
        let focus = this.state.focus;

        if (error) {
            color = 'red';
        }

        if(this.props.ignoreWrapper){
            return this.renderChildren();
        }

        return (
            <View onLayout={this.onLayout}  ref="welcome" style={{
                backgroundColor: focus ? '#fff' : 'transparent',
                width: null,
                borderRadius: 0,
                marginBottom:30,

            }}>
                <Text style={{
                    fontWeight: '200',
                    color: '#999',
                }}>
                    {label}
                    {required ? <Text style={{color: 'red'}}>*</Text> : ""}</Text>
                {this.state.loading && !this.props.ignoreLoading ? this.renderLoading() : this.renderChildren(this.props)}

                {
                    error ? <Text style={{paddingTop: 5, color: 'red', textAlign: 'left', fontSize:12}}>{error}</Text> : null
                }

                {!this.props.hideLine && (
                    <View style={{height:1.5,  width:null, backgroundColor:color, marginTop:5,}}>
                        <Animated.View style={{height:1.5, position:'absolute',  width: this.width, backgroundColor:this.props.primaryColor ? this.props.primaryColor : '#005BAA', }}>
                        </Animated.View>

                    </View>
                )}

            </View>
        )
    }
}
