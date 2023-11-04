import { View, FlatList, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import style from './style';
import { Header, Options, SearchBar, ToastCompError, ToastCompSuccess } from '../../components';
import { CariKategoriCart } from '../../components/Cari-KategoriCart';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersProcess, getMusteriOrdersProcess, getOrderDetailProcess, getTedarikciOrdersProcess } from '../../api';
import { resetAllOrders } from '../../redux/slice/get-all-orders-slice';
import { Loading } from '../../components/Loading';
import { resetAddOrder } from '../../redux/slice/add-new-order-slice';
import { resetUpdateOrder } from '../../redux/slice/update-order-slice';


export const CariScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showUpdateToastSuccess, setShowUpdateToastSuccess] = useState(false)
  const [showAddToastSuccess, setShowAddToastSuccess] = useState(false)
  const [isTedarikci, setIsTedarikci] = useState(false);
  const [isMusteri, setIsMusteri] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  const { status: addNewOrderStatus, message: addNewOrderMessage } = useSelector(state => state.newOrder);
  const { status: UpdateOrderStatus, message: UpdateOrderMessage } = useSelector(state => state.updateOrder);
  const { products: products } = useSelector(state => state?.localProducts);

  console.log(products, "İİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİ")
  useEffect(() => {
    setShowUpdateToastSuccess(false)
    setShowAddToastSuccess(false);

    if (addNewOrderStatus === "success") {
      setShowAddToastSuccess(true);
      dispatch(resetAddOrder());
    }
    if (UpdateOrderStatus === "success") {
      setShowUpdateToastSuccess(true)
      dispatch(resetUpdateOrder());
    }

  }, [addNewOrderStatus, UpdateOrderStatus]);

  useEffect(() => {
    dispatch(getAllOrdersProcess());

    return () => {
      dispatch(resetAllOrders());
    };
  }, []);

  const handleTedarikciOrders = () => {
    dispatch(getTedarikciOrdersProcess());
    setIsTedarikci(true);
    setIsMusteri(false);
  };

  const handleAllOrders = () => {
    dispatch(getAllOrdersProcess());
    setIsTedarikci(false);
    setIsMusteri(false);
  };

  const handleMusteriOrders = () => {
    dispatch(getMusteriOrdersProcess());
    setIsMusteri(true);
    setIsTedarikci(false);
  };

  const { data: AllOrdersData, isLoading: LoadingAll } = useSelector(state => state.getAllOrders);
  const { data: TedarikciOrdersData, isLoading: LoadingTedarikci } = useSelector(state => state.getTedarikciOrders);
  const { data: MusteriOrdersData, isLoading: LoadingMusteri } = useSelector(state => state.getMusteriOrders);

  const ordersData = isTedarikci ? TedarikciOrdersData : isMusteri ? MusteriOrdersData : AllOrdersData;

  const filteredOrdersData = ordersData?.filter(item => {
    const isim = item.isim ? item.isim.toLowerCase() : '';
    const searchTermLower = searchTerm.toLowerCase();
    return isim.includes(searchTermLower);
  });


  const renderItem = ({ item }) => {
    return <CariKategoriCart name={item.isim} onPress={() => {
      const _id = item._id
      dispatch(getOrderDetailProcess({ _id }));
      navigation.navigate('cariDetay-screen', { _id: _id })

    }

    } />;
  };



  return (
    <View style={style.container}>
      <ToastCompSuccess show={showAddToastSuccess} text1={'Cari Eklendi'} text2={'Cari başarıyla eklendi.'} />
      <ToastCompSuccess show={showUpdateToastSuccess} text1={'Cari Güncellendi'} text2={'Cari başarıyla güncellendi.'} />

      <Header
        first={true}
        firstName={'arrow-left'}
        second={true}
        third={true}
        text={'CARİ'}
        color={'#000E36'}
        button={true}
        backgroundColor={'#000E36'}
        onPress={() => navigation.navigate('cariEkle-screen')}
      />
      <View style={style.innerContainer}>
        <View style={style.optionsContainer}>
          <Options text={'Hepsi'} onPress={handleAllOrders} backgroundColor={isMusteri || isTedarikci ? 'transparent' : '#BAC3DC'} />
          <Options text={'Tedarikçi'} onPress={handleTedarikciOrders} backgroundColor={isTedarikci ? '#BAC3DC' : 'transparent'} />
          <Options text={'Müşteri'} onPress={handleMusteriOrders} backgroundColor={isMusteri ? '#BAC3DC' : 'transparent'} />
        </View>
        <SearchBar
          value={searchTerm}
          onChangeText={setSearchTerm}
          onClear={() => setSearchTerm('')}
        />

        <View style={style.listContainer}>

          {LoadingMusteri.getMusteriOrdersProcess || LoadingTedarikci.getTedarikciOrdersProcess || LoadingAll.getAllOrdersProcess ? (
            <Loading />
          ) : null}


          {filteredOrdersData && filteredOrdersData.length ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filteredOrdersData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
            />
          ) : (
            <View style={style.listEmpty}>
              <Text style={style.listEmptyText}>Herhangi bir cari bulunmamaktadır..</Text>
            </View>
          )}

        </View>
      </View>
    </View>
  );
};
