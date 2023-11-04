import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Header } from '../../components'
import OptionButton from '../../components/OptionButton'
import style from './style'
import { getAllCategoriesProcess } from '../../api'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'

export const UrunSecenekleriScreen = () => {
    const navigation = useNavigation();

    const dispatch = useDispatch()

    useEffect(() => {
        console.log("ANANANANANNANANANANAN")
        dispatch(getAllCategoriesProcess())

    }, [])
    return (
        <View style={style.container}>

            <Header first={true} firstName={'arrow-left'} />

            <View style={style.innerContainer}>
                <View style={style.buttonContainer} >

                    <OptionButton text={"Ürünler"} onPress={() => navigation.navigate('stok-stack')} name={'widgets-outline'} />
                    <OptionButton text={"Kategori"} onPress={() => navigation.navigate('kategori-stack')} name={'clipboard-text-multiple-outline'} />

                </View>
                <View style={{ ...style.buttonContainer, justifyContent: 'center' }} >

                    <OptionButton text={"Ürün Ekle"} onPress={() => navigation.navigate('urunEkle-screen')} name={'archive-plus-outline'} />

                </View>

            </View>
        </View>
    )
}
