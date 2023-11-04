import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { Header, SearchBar } from '../../components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getIncomingTransactionsProcess } from '../../api'
import style from './style'
import { BelgelerCart } from '../../components/BelgelerCart'
import { Loading } from '../../components/Loading'

export const CariGecmisIslemlerScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const route = useRoute()
  const { _id } = route.params


  useEffect(() => {
    dispatch(getIncomingTransactionsProcess({ _id: _id }))
  }, [])

  const { data: ListData, isLoading } = useSelector(state => state.listTransactions)

  const renderItem = ({ item }) => {
    return (
      <BelgelerCart
        tarih={item.documentDate}
        type={item.ozellik == 0 ? 'Giden' : 'Gelen'}
        isim={item.order['isim']}
        description={item.ozellik == 1 ? 'Tedarikçi' : 'Müşteri'}
        backgroundColor={item.ozellik == 0 ? 'red' : 'green'}
        onPress={() =>
          navigation.navigate('belgelerDetay-screen', { item: item, _id: item._id, button: true, okButton: true, })
        }
      />
    )
  }


  return (
    <View style={style.container}>
      <Header
        second={true}
        text={'Geçmiş İşlemler '}
        color={'#000E36'}
        first={true}
        firstName={'arrow-left'}
      />
      <View style={style.innerContainer}>
        <SearchBar />

        {ListData && ListData.length ? (
          <View style={style.listContainer}>


            {isLoading.getIncomingTransactionsProcess && (
              <Loading />
            )}


            <FlatList
              showsVerticalScrollIndicator={false}
              data={ListData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : (
          <View style={style.listEmpty}>
            <Text style={style.listEmptyText}>Cariye ait işlem bulunmamaktadır..</Text>
          </View>
        )}
      </View>
    </View>
  )

}
