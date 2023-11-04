import { View, FlatList, } from 'react-native'
import React, { useEffect, useState } from 'react'
import style from './style'
import { useRoute, useNavigation } from '@react-navigation/native';
import { EmptyList, Header, SearchBar } from '../../components'
import { CariKategoriCart } from '../../components/Cari-KategoriCart';
import { useDispatch, useSelector } from 'react-redux';
import { getMusteriOrdersProcess, getTedarikciOrdersProcess } from '../../api';
import { resetMusteriOrders } from '../../redux/slice/get-musteri-orders-slice';
import { resetTedarikciOrders } from '../../redux/slice/get-tedarikci-orders-slice';

export const CarilerScreen = () => {


  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const { item, onSelect, typee } = route.params;



  useEffect(() => {
    dispatch(getTedarikciOrdersProcess());
    dispatch(getMusteriOrdersProcess());

    dispatch(resetTedarikciOrders());
    dispatch(resetMusteriOrders())

  }, []);

  const { data: TedarikciOrdersData } = useSelector(state => state.getTedarikciOrders);
  const { data: MusteriOrdersData } = useSelector(state => state.getMusteriOrders);


  const ordersData = item?.ozellik || typee == 'Gelen' ? TedarikciOrdersData : MusteriOrdersData;

  const handleSelection = (name, id) => {
    onSelect(name, id);
    navigation.goBack();
  };

  const handleSearch = (text) => {
    setSearchQuery(text);

    // Filter the data based on the search query
    const filtered = ordersData.filter((item) =>
      item.isim.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredData(filtered);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredData([]);
  }


  const renderItem = ({ item }) => {
    return <CariKategoriCart name={item.isim} onPress={() => handleSelection(item.isim, item._id)} />;

  };
  console.log(item?.ozellik, "111111111111111111111111111");
  return (
    <View style={style.container}>
      <Header first={true} firstName={'arrow-left'} second={true} text={item?.ozellik || typee == 'Gelen' ? 'Tedarikçiler' : 'Müşteriler'} color={'#000E36'} third={true} button={true} backgroundColor={'#000E36'} onPress={() => navigation.navigate('cariEkle-screen')} />
      <View style={style.innerContainer}>
        <SearchBar value={searchQuery} onChangeText={handleSearch} onClear={handleClearSearch} />


        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredData.length > 0 ? filteredData : ordersData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <EmptyList iconName={'account-supervisor'} text={'Tedarikçi Ekle'} />
          )}
        />


        {/* {ordersData?.length === 0 ? (
          <EmptyList iconName={'account-supervisor'} text={'Tedarikçi Ekle'} />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={ordersData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )} */}


      </View>
    </View>
  );
};