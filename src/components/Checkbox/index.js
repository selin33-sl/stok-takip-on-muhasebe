import { View, Text } from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import style from './style';

export const Checkbox = ({ value, onValueChange, label, kdv }) => {
  return (
    <View style={kdv ? { ...style.checkboxContainer, margin: 0, marginTop: 25 } : style.checkboxContainer}>
      <CheckBox
        value={value}
        onValueChange={onValueChange}
        style={kdv ? { ...style.checkbox, padding: 0, color: "white" } : style.checkbox}
        tintColors={kdv ? { false: 'white' } : { false: '#000E36' }}
      />
      <Text style={kdv ? { ...style.label, color: "white" } : style.label}>{label}</Text>
    </View>
  );
};
