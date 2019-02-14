import React from 'react';
import {Text} from 'react-native';

const Header = props => <Text style={{marginTop: 20, fontSize: 22, fontWeight: '700'}}>{props.text}</Text>;

export default Header;
