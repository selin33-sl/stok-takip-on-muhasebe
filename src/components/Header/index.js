import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

export const Header = ({ firstName, thirdName, text, first, second, third, color, button, backgroundColor, onPress, isAddProduct, onBackPress, textButton }) => {
    const navigation = useNavigation()
    return (
        <View style={style.container}>
            {first ?
                (

                    <TouchableOpacity style={style.iconContainerFirst} onPress={isAddProduct ? onBackPress : () => navigation.goBack()}>
                        <Icon name={firstName} style={style.firstIcon} size={30} />
                    </TouchableOpacity>


                ) : null}

            {second ? (<Text style={{ ...style.text, color: color }}>{text}</Text>
            ) : null}


            {third ? (

                <TouchableOpacity style={style.iconContainerSecond} onPress={onPress}  >{button ? (
                    <TouchableOpacity onPress={onPress} style={{ ...style.button, backgroundColor: backgroundColor }} >
                        <Icon name={'plus'} size={20} style={style.plusIcon} />
                        {/* <Text style={style.buttonText} >+</Text> */}
                    </TouchableOpacity>
                ) : textButton ?

                    <TouchableOpacity onPress={onPress} style={{ ...style.textButton, backgroundColor: backgroundColor }} >

                        <Text style={style.buttonText2} >Yeni Ürün</Text>
                    </TouchableOpacity>

                    : <Icon name={thirdName} size={30} style={style.secondIcon} />}</TouchableOpacity>
            ) : null}



        </View>
    )
}

