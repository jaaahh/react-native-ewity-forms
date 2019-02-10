import React from 'react';

import TextInput from './TextInput';
import RadioInput from './RadioInput';
import SelectInput from './SelectInput';
import DateInput from './DateInput';
import ImageInput from './ImageInput';
import {Text} from "react-native";
import AutoCompleteInput from "./AutoCompleteInput";


export default function ({type, ...rest}) {
    if (type === 'text') {
        return <TextInput {...rest} />

    }
    if (type === 'radio') {
        return <RadioInput {...rest} />

    }
    if (type === 'select') {
        return <SelectInput {...rest} />

    }
    if (type === 'date') {
        return <DateInput {...rest} />

    }
    if (type === 'image') {
        return <ImageInput {...rest} />

    }

    if (type === 'autocomplete') {
        return <AutoCompleteInput {...rest} />

    }
    if (type === 'header') {
        return <Text style={{marginTop:20, fontSize: 22, fontWeight:'700' }}>{rest.text}</Text>

    }
    else {
        console.error('Invalid input type ' + type);
    }
}