import { View, Text, Image, Alert, Linking } from 'react-native'
import React, { useState } from 'react'
import style from './style'
import VersionCheck from 'react-native-version-check';


export const SettingUygulamaBilgileriScreen = () => {

    const [surum, setSurum] = useState('')

    const handleUpdatePress = () => {
        // Uygulamanızın Play Store URL'sini buraya ekleyin
        const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.pengona.stoktakip';

        // Play Store'u açmak için Linking kullanın
        Linking.openURL(playStoreUrl).then(() => {
            console.log('Play Store açıldı');
        }).catch((error) => {
            console.error('Play Store açılamadı', error);
        });
    };


    const showCancelAlert = () => {
        Alert.alert(
            'Yeni Güncelleme Mevcut',
            'Lütfen uygulamanızı güncelleyin.',
            [
                {
                    text: 'İptal',
                    onPress: () => console.log('Güncelleme iptal edildi'),
                    style: 'cancel',
                },
                {
                    text: 'Şimdi Yükle',
                    onPress: handleUpdatePress,
                },
            ],
            { cancelable: true }
        );
    };
    console.log(surum, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
    const checkForUpdates = async () => {
        try {
            const update = await VersionCheck.needUpdate();
            if (update.isNeeded) {


                // Güncelleme mevcutsa, kullanıcıya bildirin
                update.currentVersion //ile mevcut uygulama sürümünü alabilirsiniz
                update.latestVersion // ile en son sürümü alabilirsiniz
                update.storeUrl  //ile güncellemeyi indirebileceği mağaza bağlantısını alabilirsiniz
                showCancelAlert()
                setSurum(update.currentVersion)
            } else {
                console.log(update.currentVersion, "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii ");
                setSurum(update.currentVersion)
            }
        } catch (error) {
            // Hata kontrolü
            console.error('Güncelleme kontrolü sırasında hata oluştu:', error);
        }
    };
    checkForUpdates()



    return (
        <View style={style.container}>

            {/* <Image source={require('../../assets/blue.jpg')} style={style.image} /> */}

            <View style={style.innerContainer} >

                <Text style={style.header} >Cepte Stok</Text>
                <Text  >Sürüm {surum}</Text>
                <Image source={require('../../assets/app-icon.png')} style={style.appIcon} />
                <Text style={style.surum} >© 2006 - 2023 Pengona Software.Tüm Hakları Saklıdır.Pengona Software tarafından yapılmıştır.</Text>
                <Image source={require('../../assets/logo.jpeg')} style={style.logo} />


            </View>
        </View>
    )
}
