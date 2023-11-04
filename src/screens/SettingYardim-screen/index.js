import { View, Text } from 'react-native'
import React from 'react'
import { Header } from '../../components'
import { SettingComp } from '../../components/SettingComp'
import style from './style'
import { useNavigation } from '@react-navigation/native'

export const SettingYardimScreen = () => {
    const navigation = useNavigation()

    return (
        <View style={style.container} >
            <Header first={true} second={true} firstName={'arrow-left'} text={'Yardım'} color={'#000E36'} />
            <View style={style.innerContainer} >

                <SettingComp
                    name={'account-supervisor-outline'}
                    text={'Bize Ulaşın'}
                    backgroundColor={'#000E36'}
                    color={'white'}
                    onPress={() => navigation.navigate('settingBizeUlasin-screen')}



                />
                <SettingComp
                    name={'clipboard-text-outline'}
                    text={'Koşullar ve Gizlilik İlkesi'}
                    backgroundColor={'#B5C9FE'}
                    color={'#000E36'}
                    onPress={() => navigation.navigate('settingHakkımızda-screen')}



                />




            </View>
        </View>
    )
}
