// SettingBildirimScreen.js

import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './style';
import { CariKategoriCart } from '../../components/Cari-KategoriCart';
import { Header } from '../../components';

export const SettingBildirimScreen = ({ navigation }) => {
    const [notifications, setNotifications] = useState([]);

    console.log(notifications, "NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN");

    useEffect(() => {
        // AsyncStorage'den bildirimleri al ve setNotifications ile state'i güncelle
        const getNotifications = async () => {
            try {
                const notificationsData = await AsyncStorage.getItem('Notifications');

                if (notificationsData) {
                    const notificationsArray = JSON.parse(notificationsData);
                    setNotifications(notificationsArray);
                }
            } catch (error) {
                console.error('Bildirimleri alma hatası:', error);
            }
        };

        // Her seferinde bileşen yeniden açıldığında bildirimleri güncelle
        const unsubscribe = navigation.addListener('focus', () => {
            getNotifications();
        });

        return unsubscribe; // Abonelikten çıkış yap
    }, [navigation]);

    console.log(notifications, "üüüüüüüüüüüüüüüüüüüüüüü");

    const renderItem = ({ item }) => {
        console.log(item, "İİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİ");
        return (
            <CariKategoriCart
                name={item.title}
                onPress={() => {
                    navigation.navigate('settingBildirimDetay-screen', { body: item.body, id: item.id, image: item?.image }),
                        console.log(item, "SSSSSSSSSSSSSSSSSSSSSSSSS")
                }}
            // Diğer özellikleri buraya ekleyebilirsiniz.
            />
        );
    };

    return (
        <View style={style.container}>
            {/* Burada Header ve diğer bileşenleriniz olabilir */}
            <Header first={true} firstName={'arrow-left'} second={true} text={'Bildirimler'} color={'#000E36'} />
            <View style={style.innerContainer}>
                <View style={style.listContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={notifications}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </View>
    );
};


