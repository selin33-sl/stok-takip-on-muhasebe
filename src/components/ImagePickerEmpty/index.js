import React from 'react';
import {
    Text,
    TouchableOpacity,
    Image,
    View,
} from 'react-native';

import { images } from '../../assets';
import style from './style';

export function ImagePickerEmpty({ uri, onPress }) {

    return (
        <View style={style.container}>
            <Image
                style={style.imageStyle}
                source={uri ? { uri } : images.default}
            />
            <View style={style.addButtonContainer}>
                <TouchableOpacity style={style.addButton} onPress={onPress}>
                    <Text style={style.addButtonText} >+</Text>
                </TouchableOpacity>
            </View>
        </View>



    );
}


