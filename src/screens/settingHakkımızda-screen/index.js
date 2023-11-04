import { View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import { Header } from '../../components'
import style from './style'

export const SettingHakkımızdaScreen = () => {

    const openWebsite = () => {
        const url = 'https://pengona.com/';
        Linking.openURL(url);
    };


    return (
        <View style={style.container} >
            <Header first={true} firstName={'arrow-left'} second={true} text={'Hakkımızda'} color={'#000E36'} />
            <View style={style.innerContainer}>
                <ScrollView>
                    <Text style={style.text}>Pengona Yazılım ailesi olarak, profesyonel ve yenilikçi çözümler sunarak müşteri memnuniyetini ön planda tutuyoruz. Hosting, Domain, Web tasarım yazılımı, Android/IOS mobil uygulama tasarım yazılımı ve portal gibi geniş bir hizmet yelpazesiyle müşterilerimize kapsamlı çözümler sunuyoruz.

                        Pengona Yazılım olarak, müşterilerimizin ihtiyaçlarını anlamak ve onlara en iyi hizmeti sunmak için uzman bir ekip ile çalışıyoruz. İşimizi tutkuyla yapıyor ve en son teknolojik gelişmeleri takip ederek projelerimize yansıtıyoruz.</Text>

                    <TouchableOpacity onPress={openWebsite} style={style.linkContainer}>
                        <Text style={style.linkText}>
                            PENGONA YAZILIM
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}
