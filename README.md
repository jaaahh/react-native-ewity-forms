# React Native Ewity Forms
React Native Ewity Forms is a form builder to easily build forms using a array.
  - Helps you to build forms easily
  - Consistany across all your screens
  - Updated regularly
  
### Installation

Install react native ewity forms 
```sh
yarn add react-native-ewity-forms
```
### Usage
Installation successful? Great!
```sh
import Form from 'react-native-ewity-forms';
const fields = [
                                {
                                    name: 'country',
                                    type: 'select',
                                    placeholder: "Please select Country",
                                    initialValue: "mv",
                                    values: () => AppService.countries,
                                    //values: [{label: "Maldives", value: "mv"}]
                                    label: 'Country',
                                    onChange: this.resetUuid,
                                },
                                 {
                                    name: 'gender',
                                    type: 'text',
                                    label: 'Gender',
                                    type: 'radio',
                                    values: [
                                                {label: "Female", value: "f"},
                                                {label: "Male", value: "m"}
                                            ]
                                                                    },
                                {
                                    name: 'card_number',
                                    type: 'text',
                                    label: 'Number',
                                },
                                {
                                    name: 'mobile',
                                    type: 'text',
                                    keyboardType: 'phone-pad',
                                    label: 'Mobile Number',
                                    onChange: this.resetUuid,
                                },
                                this.state.uuid && {
                                    name: 'otp',
                                    type: 'text',
                                    keyboardType: 'number-pad',
                                    label: 'OTP'
                                }
                            ];
    <Form
        onChange={formData => this.setState({formData: formData})}
        fields={fields}/>
```
