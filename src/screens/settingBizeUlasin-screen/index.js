import { View, Text, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'
import { Header } from '../../components'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export const SettingBizeUlasinScreen = () => {

    const openWebsite = () => {
        const url = 'https://pengona.com/';
        Linking.openURL(url);
    };

    return (
        <View style={style.container} >
            <Header first={true} firstName={'arrow-left'} second={true} text={'Bize Ulaşın'} color={'#000E36'} />
            <View style={style.innerContainer}>

                <Text style={style.header}>İletişim seçeneklerimiz</Text>
                <View style={style.iletisimContainer}>
                    <View style={style.iletisimInnerContainer} >
                        <Icon name={'email'} size={30} color={'#000E36'} />
                        <Text style={style.text}>info@pengona.com</Text>

                    </View>
                    <View style={style.iletisimInnerContainer} >

                        <Icon name={'phone'} size={30} color={'#000E36'} />
                        <Text style={style.text}>+90 543 352 42 56</Text>

                    </View>
                    <View style={style.iletisimInnerContainer} >
                        <Icon name={'web'} size={30} color={'#000E36'} />
                        <TouchableOpacity onPress={openWebsite} >
                            <Text style={{ ...style.text, color: 'blue', }}>
                                www.pengona.com

                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>

        </View>
    )
}
