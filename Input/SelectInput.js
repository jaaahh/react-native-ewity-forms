import React, {Component} from 'react';
import {Alert, Text, TextInput, StyleSheet, View, ActivityIndicator} from 'react-native';
import Select from './Select';
import isEqual from 'lodash.isequal';

import InputWrapper from './InputWrapper';


const defaultTransformer = (data) => data.data.map(o => ({label: o.value, value: o.key}));


export default class extends Component {

    state = {
        focus: false,
        selected: this.props.value,
    };

    componentDidMount() {
        this.fetchFromApi();
        }

    componentDidUpdate(prevProps) {
        if (prevProps.api !== this.props.api) {
            this.fetchFromApi();
        }

        if (prevProps.apiArgs && !isEqual(prevProps.apiArgs, this.props.apiArgs)) {
            // api did not change, but args changed
            this.fetchFromApi();
        }


    }

    fetchFromApi() {
        let api =  this.props.api;
        let apiArgs = this.props.apiArgs;


        if (!api) {
            return;
        }


        if (typeof api === 'string') {


        }else{

            // if api args passed and args is empty don't render
            if (apiArgs && apiArgs.filter(o => !!o).length === 0) {
                return;
            }
            this.setState({loading: true});
            api.call(null, apiArgs)
                .then(data => {
                    this.setState({
                        data: this.props.transformer ? this.props.transformer(data) : defaultTransformer(data),
                        loading: false
                    });
                })
                .catch(e => {
                    this.setState({
                        e,
                        loading: false,
                    })
                });
        }

    }

    renderSelect() {
        let items = this.state.data || this.props.values;

        return (
            <Select
                placeholder={{
                    label: this.props.placeholder,
                    value: null,
                }}
                items={items || []}
                key={JSON.stringify(items)}
                onValueChange={this.props.onChange}
                onFocus={(focus) => this.setState({focus})}
                style={{...pickerSelectStyles}}
                value={this.state.selected}
                disabled={this.props.disabled}
            />
        )
    }

    renderLoading() {
        return (
            <View style={{flexDirection: 'row', paddingTop:8}}>
                <ActivityIndicator color={this.props.primaryColor || '#999'}/>
                <Text style={{paddingLeft: 10, color: '#999'}}>Loading</Text>

            </View>
        )
    }

    render() {
        const {loading, focus, e} = this.state;

        let error = e ? e.message : this.props.error;

        return (
            <InputWrapper {...this.props} label={this.props.label} error={error} focus={focus}>
                {loading ? this.renderLoading() : this.renderSelect()}
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