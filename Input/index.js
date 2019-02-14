import React from 'react';
import TextInput from './TextInput';
import RadioInput from './RadioInput';
import SelectInput from './SelectInput';
import DateInput from './DateInput';
import ImageInput from './ImageInput';
import AutoCompleteInput from "./AutoCompleteInput";
import CheckBoxInput from "./CheckBoxInput";
import Header from "./Header";

export default function (type) {
    if (type === 'text') {
        return [TextInput, {}];
    }
    if (type === 'radio') {
        return [RadioInput, {}]
    }

    if (type === 'select') {
        return [SelectInput, {}];
    }

    if (type === 'date') {
        return [DateInput, {}];
    }

    if (type === 'image') {
        return [ImageInput, {ignoreLoading: true}];
    }

    if (type === 'checkbox') {
        return [CheckBoxInput, {}];
    }

    if (type === 'autocomplete') {
        return [AutoCompleteInput, {}];
    }

    if (type === 'header') {
        return [Header, {}];
    }

    console.error('Invalid input type ' + type);
    return null;

}