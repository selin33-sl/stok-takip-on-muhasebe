import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import style from './style';
import { Header } from '../Header';
import { SearchBar } from '../SearchBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Cart } from '../Cart';
import { getAllProductsProcess } from '../../api';
import { resetAllProducts } from '../../redux/slice/get-all-products-slice';

export const StokScreenn = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProductsProcess());
        return () => {
            dispatch(resetAllProducts());
        };
    }, []);

    const { data } = useSelector(state => state.getAllProducts);

    const renderItem = ({ item }) => {
        return (
            <Cart
                name={item.productName}
                image={item.image}
                sk={item.productImage}
                adet={item.productQuantity}
                onPress={
                    () => {
                        // Conditionally navigate based on the value of the route prop
                        if (route === 1) {
                            navigation.navigate('urunDetay-screen');
                        } else if (route === 2) {
                            navigation.navigate('urunDetay-screen2');
                        } else {
                            navigation.navigate('urunDetay-screen3');
                        }
                    }
                }
            />
        );
    };

    return (
        <View style={style.container}>
            <Header
                second={true}
                text={'STOK'}
                color={'#000E36'}
                button={true}
                backgroundColor={'#000E36'}
                third={true}
                onPress={() => navigation.navigate('urunEkle-screen')}
            />
            <View style={style.innerContainer}>
                <SearchBar
                // onClear={handleOnClear}
                // value={searchQuery}
                // onChangeText={setSearchQuery}
                />

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={renderItem}
                    // keyExtractor={item => item.id}
                    keyExtractor={(item, index) => index}
                />
            </View>
        </View>
    );
}
