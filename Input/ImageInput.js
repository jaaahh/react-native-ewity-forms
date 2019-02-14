import React, {Component} from 'react';
import {Platform, Image, ActivityIndicator, View, Text, TextInput, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class extends Component {
    state = {
        uri: null,
    }


    selectImage = () => {
        this.props.onFocus(true);

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
                this.props.onFocus(false);
                console.log('User cancelled photo picker');
                return;

            } else if (response.error) {
                this.props.onFocus(false);
                console.log('ImagePicker Error: ', response.error);
                return;

            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                return;
            }

            let uri;

            if (Platform.OS === 'android') {
                uri = response.uri;
            }else{
                uri = 'data:image/jpeg;base64,' + response.data;

            }

            this.setState({uri});

            this.props.onChange(uri);


            // if (xhr.upload) {
            //     xhr.upload.onprogress = (event) => {
            //         console.log('upload onprogress', event);
            //         if (event.lengthComputable) {
            //             this.setState({uploadProgress: Math.round(event.loaded / event.total)});
            //         }
            //     };
            // }


        });
    };


    render() {

        let inner = (
            <Text>{this.props.placeholder}</Text>
        );

        if (this.state.uri) {
            inner = (
                <Image source={{uri: this.state.uri}}
                       style={{height: 40, width: 40, borderRadius: 20, backgroundColor: '#000'}}/>
            )
        }
        // if (this.state.loading) {
        //     inner = (
        //         <View style={{flexDirection: 'row'}}>
        //             <ActivityIndicator color={this.props.primaryColor || '#999'}/>
        //             <Text style={{paddingLeft: 10, color: '#999'}}>{this.state.uploadProgress * 100}% Uploaded</Text>
        //
        //         </View>
        //     )
        // }

        return (
            <TouchableOpacity onPress={() => this.selectImage()}>
                <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', height: 50}}>
                    <View style={{width: '100%'}}>
                        {inner}
                    </View>
                </View>
            </TouchableOpacity>

        )
    }

}