import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Header, Options, SearchBar } from '../../components'
import style from './style'
import { BelgelerCart } from '../../components/BelgelerCart'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllDocumentsProcess,
  getIncomingProductsProcess,
  getOutgoingProductsProcess
} from '../../api'
import { resetAllDocuments } from '../../redux/slice/get-all-documents-slice'
import { resetOutgoingProducts } from '../../redux/slice/get-outgoing-products-slice'
import { resetIncomingProducts } from '../../redux/slice/get-incoming-products-slice'
import { Loading } from '../../components/Loading'


export const BelgelerScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch();


  const [isGelen, setIsGelen] = useState(false);
  const [isGiden, setIsGiden] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');





  useEffect(() => {
    dispatch(getAllDocumentsProcess());

  }, []);


  const handleAllDocuments = () => {
    dispatch(getAllDocumentsProcess());
    setIsGelen(false);
    setIsGiden(false);

  }
  const handleGelenDocuments = () => {
    dispatch(getIncomingProductsProcess());
    setIsGelen(true);
    setIsGiden(false);

  }



  const handleGidenDocuments = () => {
    dispatch(getOutgoingProductsProcess());
    setIsGiden(true);
    setIsGelen(false);
  }


  const { data: AllDocumentsData, isLoading: LoadingAll } = useSelector(state => state.allDocuments);
  const { data: GelenDocumentsData, isLoading: LoadingGelen } = useSelector(state => state.getIncomingProducts);
  const { data: GidenDocumentsData, isLoading: LoadingGiden } = useSelector(state => state.getOutgoingProducts);


  const documentsData = isGelen ? GelenDocumentsData : isGiden ? GidenDocumentsData : AllDocumentsData;


  const filteredDocumentsData = documentsData?.filter(item => {
    // if (item.order && item.order['isim']) {
    //   const isim = item.order['isim'].toLowerCase();
    //   const searchTermLower = searchTerm.toLowerCase();
    //   return isim.includes(searchTermLower);
    // }
    if (item.documentDate) {
      const date = item.documentDate.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();
      return date.includes(searchTermLower);
    }
    return false; // veya true, bu duruma göre değişebilir
  });




  const renderItem = ({ item }) => {
    // let isim = '';

    // if (item.order && item.order['isim']) {
    //   isim = item.order['isim'];
    // }


    return <BelgelerCart
      tarih={item.documentDate}
      type={item.ozellik == 0 ? 'Giden' : 'Gelen'}
      isim={item?.order?.isim}
      description={item.ozellik == 1 ? 'Tedarikçi' : 'Müşteri'}
      backgroundColor={item.ozellik == 0 ? 'green' : 'red'}
      onPress={() => {
        const _id = item._id

        navigation.navigate('belgelerDetay-screen', { _id: _id, item: item })

      }
      }
    />
  }


  return (
    <View style={style.container} >



      <Header second={true} text={'Belgeler'} color={'#000E36'} first={true} firstName={'arrow-left'} />
      <View style={style.innerContainer} >
        <View style={style.optionsContainer} >

          <Options text={'Her şey'} onPress={handleAllDocuments} backgroundColor={isGelen || isGiden ? 'transparent' : '#BAC3DC'} />
          <Options text={'Giden'} onPress={handleGidenDocuments} backgroundColor={isGiden ? '#BAC3DC' : 'transparent'} />
          <Options text={'Gelen'} onPress={handleGelenDocuments} backgroundColor={isGelen ? '#BAC3DC' : 'transparent'} />

        </View>
        <SearchBar
          value={searchTerm}
          onChangeText={setSearchTerm}
          onClear={() => setSearchTerm('')}
        />

        <View style={style.listContainer} >
          {LoadingGelen.getIncomingProductsProcess || LoadingGiden.getOutgoingProductsProcess || LoadingAll.getAllDocumentsProcess ? (
            <Loading />
          ) : null}
          {filteredDocumentsData && filteredDocumentsData.length ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filteredDocumentsData}
              // data={documentsData}

              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View style={style.listEmpty}>
              <Text style={style.listEmptyText}>Herhangi bir belge bulunmamaktadır..</Text>
            </View>
          )}



        </View>

      </View>


    </View>
  )
}
