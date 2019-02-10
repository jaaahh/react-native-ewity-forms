import React, {Component} from 'react';
import {Platform, Image, ActivityIndicator, View, Text, TextInput, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import InputWrapper from './InputWrapper';


export default class extends Component {
    state = {
        loading: false,
        focus: false,
        image: null,
    };


    selectImage = () => {
        this.setState({focus: true})
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                this.setState({focus: false});
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                this.setState({focus: false});
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                var source;

                // You can display the image using either:
                source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                // Or:
                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true};
                }
                // else {
                //   source = {uri: response.uri.replace('file://', ''), isStatic: true};
                // }

                this.setState({
                    image: source.uri
                });


                var json = JSON.parse(xhr.responseText);

                let token = json.data.token;

                if (this.props.rawData) {
                    let data = {
                        uri: this.state.image,
                        token: token
                    };

                    this.props.onChange(data);

                } else {
                    this.props.onChange(token);
                }


                this.setState({loading: false, focus: false})


                this.setState({focus: false})


            }
        });
    };


    render() {

        let inner = (
            <Text>{this.props.placeholder}</Text>
        );

        if (this.state.image) {
            inner = (
                <Image source={{uri: this.state.image}} style={{height: 40, width: 40, borderRadius: 20, backgroundColor: '#ccc'}}/>
            )
        }
        if (this.state.loading) {
            inner = (
                <View style={{flexDirection: 'row'}}>
                    <ActivityIndicator color={this.props.primaryColor || '#999'}/>
                    <Text style={{paddingLeft: 10, color: '#999'}}>{this.state.uploadProgress * 100}% Uploaded</Text>

                </View>
            )
        }

        return (
            <InputWrapper {...this.props} label={this.props.label} error={this.props.error} focus={this.state.focus}>
                <TouchableOpacity onPress={() => this.selectImage()}>
                    <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', height: 50}}>
                        <View style={{width: '100%'}}>
                            {inner}
                        </View>

                    </View>
                </TouchableOpacity>

            </InputWrapper>
        )
    }

}