import React, {Component} from 'react';
import {View} from 'react-native';
import ResolveInput from './Input';
import InputWrapper from './Input/InputWrapper';

export default class Form extends Component {
    // static propTypes = {
    //     fields: 'array',
    //     onChange: 'optional|function',
    //     error: 'optional|Err',
    //     initialValues: 'object',
    // };

    constructor(props) {
        super(props);

        const data = {};

        const initial = props.initialValues || {};
        props.fields.forEach(field => {
            if(!field){
                return;
            }
            data[field.name] = field.initialValue || initial[field.name] || null;
        });

        this.state = {data};
    }

    onFieldChange(field, value) {
        const {onChange} = this.props;

        if (field.disabled) {
            return;
        }

        this.setState(state => {
            state.data[field.name] = value;

            return state;

        }, () => {

            // field on change
            if (field.onChange) {
                field.onChange(value);
            }

            // form on change
            if (onChange) {
                onChange(this.state.data);
            }
        });
    }

    getFieldError(field) {
        const {error, errorPrefix} = this.props;

        if (error && error.code === 'VALIDATION_ERROR' && error.formErrors) {

            let errorName = errorPrefix ? errorPrefix + field.name : field.name;

            if(field.errorName){
                errorName = field.errorName;
            }

            return error.formErrors[errorName];
        }

        return null;
    }

    render() {
        const {fields, } = this.props;

        const fieldEls = fields.map(field => {
            if (!field) {
                return null;
            }

            const [Input, inputProps] = ResolveInput(field.type || 'text');

            if(!Input){
                return null;
            }

            return (
                <InputWrapper
                    {...field}
                    {...inputProps}
                    key={field.name}
                    onChange={(value) => this.onFieldChange(field, value)}
                    primaryColor={this.props.primaryColor}
                    type={field.type || 'text'}
                    error={this.getFieldError(field)}
                    value={this.state.data[field.name]}>
                    {props => (
                        <Input
                            {...props}
                        />
                    )}

                </InputWrapper>
            )
        });

        return (
            <View>
                {fieldEls}
            </View>
        )
    }
}