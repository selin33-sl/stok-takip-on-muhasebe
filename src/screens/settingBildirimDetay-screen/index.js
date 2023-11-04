import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './style';
import { CariKategoriCart } from '../../components/Cari-KategoriCart';
import { Header } from '../../components';
import { useNavigation, useRoute } from '@react-navigation/native';

export const SettingBildirimDetayScreen = () => {
    const route = useRoute();
    const body = route.params.body;
    const id = route.params.id;
    const image = route.params.image;
    const navigation = useNavigation()


    console.log(image, "aaaaaaaaaaaaaaaaaaaaaa");

    const [notifications, setNotifications] = useState([]);

    // Bildirimleri alma işlevi
    const getNotifications = async () => {
        try {
            const notificationsData = await AsyncStorage.getItem('notifications');
            if (notificationsData) {
                const notificationsArray = JSON.parse(notificationsData);
                setNotifications(notificationsArray);
            }
        } catch (error) {
            console.error('Bildirimleri alma hatası:', error);
        }
    };

    // Bildirimi silen işlev
    const deleteNotification = async () => {
        try {
            const notificationsData = await AsyncStorage.getItem('Notifications');
            if (notificationsData) {
                const notificationsArray = JSON.parse(notificationsData);
                // İlgili bildirimi sil
                const updatedNotifications = notificationsArray.filter(
                    (notification) => notification.id !== id
                );
                console.log(updatedNotifications, "ĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞ");
                // Güncellenmiş bildirim listesini AsyncStorage'e kaydet
                await AsyncStorage.setItem('Notifications', JSON.stringify(updatedNotifications));
                setNotifications(updatedNotifications);
                // Listeyi yeniden yükle
                getNotifications();
                await AsyncStorage.getItem('Notifications');

                navigation.goBack()

            }
        } catch (error) {
            console.error('Bildirim silme hatası:', error);
        }
    };

    useEffect(() => {
        // Sayfa yüklendiğinde bildirimleri alma işlemini çağır
        getNotifications();
    }, []);

    return (
        <View style={style.container}>
            <Header first={true} firstName={'arrow-left'} second={true} text={'Bildirim Detay'} color={'#000E36'} third={true} thirdName={'delete-outline'} onPress={deleteNotification} />
            <View style={style.innerContainer}>
                <Text style={style.text}>{body}</Text>
                {image && image.length ? (<View style={style.imageContainer} >
                    <Image source={{ uri: image }} size={50} style={style.image} />

                </View>) : null
                }


            </View>
        </View>
    );
};
