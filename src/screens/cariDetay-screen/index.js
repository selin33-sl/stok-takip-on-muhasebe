import { View, ScrollView, Dimensions, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import style from './style'
import { Button, Header, TextinputContainer, ToastComp, ToastCompError, ToastCompSuccess } from '../../components'
import { useRoute, useNavigation } from '@react-navigation/native';
import { deleteOrderProcess, getAllOrdersProcess, getOrderDetailProcess, updateOrderProcess } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { resetOrderDetail } from '../../redux/slice/get-order-detail-slice';
import { resetDeleteOrder } from '../../redux/slice/delete-order-slice';
import { resetUpdateOrder } from '../../redux/slice/update-order-slice';
import { Loading } from '../../components/Loading';
import { CategoryDropdown } from '../../components/CategoryDropdown';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export const turkishCities = [
  { cityName: 'Adana', _id: 1 },
  { cityName: 'Adıyaman', _id: 2 },
  { cityName: 'Afyonkarahisar', _id: 3 },
  { cityName: 'Ağrı', _id: 4 },
  { cityName: 'Amasya', _id: 5 },
  { cityName: 'Ankara', _id: 6 },
  { cityName: 'Antalya', _id: 7 },
  { cityName: 'Artvin', _id: 8 },
  { cityName: 'Aydın', _id: 9 },
  { cityName: 'Balıkesir', _id: 10 },
  { cityName: 'Bilecik', _id: 11 },
  { cityName: 'Bingöl', _id: 12 },
  { cityName: 'Bitlis', _id: 13 },
  { cityName: 'Bolu', _id: 14 },
  { cityName: 'Burdur', _id: 15 },
  { cityName: 'Bursa', _id: 16 },
  { cityName: 'Çanakkale', _id: 17 },
  { cityName: 'Çankırı', _id: 18 },
  { cityName: 'Çorum', _id: 19 },
  { cityName: 'Denizli', _id: 20 },
  { cityName: 'Diyarbakır', _id: 21 },
  { cityName: 'Edirne', _id: 22 },
  { cityName: 'Elazığ', _id: 23 },
  { cityName: 'Erzincan', _id: 24 },
  { cityName: 'Erzurum', _id: 25 },
  { cityName: 'Eskişehir', _id: 26 },
  { cityName: 'Gaziantep', _id: 27 },
  { cityName: 'Giresun', _id: 28 },
  { cityName: 'Gümüşhane', _id: 29 },
  { cityName: 'Hakkari', _id: 30 },
  { cityName: 'Hatay', _id: 31 },
  { cityName: 'Isparta', _id: 32 },
  { cityName: 'Mersin', _id: 33 },
  { cityName: 'İstanbul', _id: 34 },
  { cityName: 'İzmir', _id: 35 },
  { cityName: 'Kars', _id: 36 },
  { cityName: 'Kastamonu', _id: 37 },
  { cityName: 'Kayseri', _id: 38 },
  { cityName: 'Kırklareli', _id: 39 },
  { cityName: 'Kırşehir', _id: 40 },
  { cityName: 'Kocaeli', _id: 41 },
  { cityName: 'Konya', _id: 42 },
  { cityName: 'Kütahya', _id: 43 },
  { cityName: 'Malatya', _id: 44 },
  { cityName: 'Manisa', _id: 45 },
  { cityName: 'Kahramanmaraş', _id: 46 },
  { cityName: 'Mardin', _id: 47 },
  { cityName: 'Muğla', _id: 48 },
  { cityName: 'Muş', _id: 49 },
  { cityName: 'Nevşehir', _id: 50 },
  { cityName: 'Niğde', _id: 51 },
  { cityName: 'Ordu', _id: 52 },
  { cityName: 'Rize', _id: 53 },
  { cityName: 'Sakarya', _id: 54 },
  { cityName: 'Samsun', _id: 55 },
  { cityName: 'Siirt', _id: 56 },
  { cityName: 'Sinop', _id: 57 },
  { cityName: 'Sivas', _id: 58 },
  { cityName: 'Tekirdağ', _id: 59 },
  { cityName: 'Tokat', _id: 60 },
  { cityName: 'Trabzon', _id: 61 },
  { cityName: 'Tunceli', _id: 62 },
  { cityName: 'Şanlıurfa', _id: 63 },
  { cityName: 'Uşak', _id: 64 },
  { cityName: 'Van', _id: 65 },
  { cityName: 'Yozgat', _id: 66 },
  { cityName: 'Zonguldak', _id: 67 },
  { cityName: 'Aksaray', _id: 68 },
  { cityName: 'Bayburt', _id: 69 },
  { cityName: 'Karaman', _id: 70 },
  { cityName: 'Kırıkkale', _id: 71 },
  { cityName: 'Batman', _id: 72 },
  { cityName: 'Şırnak', _id: 73 },
  { cityName: 'Bartın', _id: 74 },
  { cityName: 'Ardahan', _id: 75 },
  { cityName: 'Iğdır', _id: 76 },
  { cityName: 'Yalova', _id: 77 },
  { cityName: 'Karabük', _id: 78 },
  { cityName: 'Kilis', _id: 79 },
  { cityName: 'Osmaniye', _id: 80 },
  { cityName: 'Düzce', _id: 81 }
];

export const CariDetayScreen = () => {
  const route = useRoute()
  const { _id } = route.params
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [showDeleteToastSuccess, setShowDeleteToastSuccess] = useState(false)
  const [showDeleteToastError, setShowDeleteToastError] = useState(false)
  const [showUpdateToastError, setShowUpdateToastError] = useState(false)

  const [name, setName] = useState('');
  const [tc, setTC] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [adres, setAdres] = useState('');
  const [ozellik, setOzellik] = useState('');
  const [cityValue, setCityValue] = useState(null);
  const [ilce, setIlce] = useState('')



  useEffect(() => {
    dispatch(getOrderDetailProcess({ _id }));
    return () => {
      dispatch(resetOrderDetail());
    };
  }, []);


  const { data: OrderDetailData, isLoading } = useSelector(state => state.orderDetail);
  console.log(OrderDetailData, "ooooooooooooooooo");
  console.log(OrderDetailData?.il, "ccccccccccccc");
  console.log(cityValue, "iiiii");

  useEffect(() => {
    if (OrderDetailData) {
      setName(OrderDetailData.isim || '');
      setTC((OrderDetailData.tcNumber || '').toString());
      setEmail(OrderDetailData.email || '');
      setTel((OrderDetailData.telefon || '').toString());
      setAdres(OrderDetailData.adres || '');
      setOzellik((OrderDetailData.ozellik || '').toString());
      setCityValue(OrderDetailData.il || '');
      setIlce(OrderDetailData.ilce || '');
    }
  }, [OrderDetailData]);


  const confirmDeleteOrder = () => {
    Alert.alert(
      'Cariyi Sil',
      'Bu cariyi silmek istediğinize emin misiniz?',
      [
        { text: 'Vazgeç', style: 'cancel' },
        { text: 'Sil', onPress: deleteOrder, style: 'destructive' }
      ]
    );
  };

  const deleteOrder = async () => {
    await dispatch(deleteOrderProcess({
      _id: _id,

    }));
    await dispatch(getAllOrdersProcess())
    navigation.goBack()
  };

  const updateOrder = async () => {
    await dispatch(updateOrderProcess({
      _id: _id,
      tcNumber: tc,
      isim: name,
      email: email,
      telefon: tel,
      adres: adres,
      ozellik: ozellik,
      il: cityValue,
      ilce: ilce

    }));

  }

  const handleTcChange = text => {
    const characterCount = text.length;

    if (characterCount <= 11) {
      setTC(text);


    } else {
      Alert.alert('Uyarı', 'En fazla 11 karakter girebilirsiniz.');
    }
  };

  const handlePhoneChange = text => {
    const characterCount = text.length; // Boşlukları saymamak için trim kullanılıyor

    if (characterCount <= 11) {
      setTel(text);
    } else {
      Alert.alert('Uyarı', 'En fazla 11 karakter girebilirsiniz.');
    }
  };




  const { status: DeleteOrderStatus } = useSelector(state => state.deleteOrder);
  const { status: UpdateOrderStatus, message: UpdateOrderMessage } = useSelector(state => state.updateOrder);


  console.log(UpdateOrderStatus, "messageeeeeeeeeeeeeeeee");
  useEffect(() => {
    setShowUpdateToastError(false)

    if (DeleteOrderStatus.deleteOrderProcess === "success") {

      setShowDeleteToastSuccess(true)
      dispatch(resetDeleteOrder());

    } else if (DeleteOrderStatus.deleteOrderProcess === "error") {


      setShowDeleteToastError(true)
      dispatch(resetDeleteOrder());

    }

    if (UpdateOrderStatus === "success") {


      dispatch(getAllOrdersProcess())
      navigation.goBack()
    } else if (UpdateOrderStatus === "error") {

      setShowUpdateToastError(true)

      setTimeout(() => {
        dispatch(resetUpdateOrder());

      }, 900);
    }
  }, [DeleteOrderStatus.deleteOrderProcess, UpdateOrderStatus])


  return (
    <View style={style.container}>
      <ToastCompSuccess show={showDeleteToastSuccess} text1={'Cari Silindi'} text2={'Cari başarıyla silindi.'} />

      <ToastCompError show={showDeleteToastError} text1={'Cari Silinemedi'} text2={'Cari başarıyla silinemedi.'} />
      <ToastCompError show={showUpdateToastError} text1={'Cari Güncellenemedi'} text2={UpdateOrderMessage} />

      <Header first={true} firstName={'arrow-left'} second={true} color={'#FF8A00'} text={'CARİ'} third={true} thirdName={'delete-outline'} onPress={confirmDeleteOrder} />
      <View style={style.innerContainer} >


        {isLoading.getOrderDetailProcess && (
          <Loading />
        )}


        <ScrollView>
          <TextinputContainer
            editable
            text={'Ad Soyad: '}
            value={name}
            onChangeText={setName}
          />
          <TextinputContainer
            editable
            text={'TC: '}
            value={tc}
            onChangeText={handleTcChange}
          />
          <TextinputContainer
            editable
            text={'Email: '}
            value={email}
            onChangeText={setEmail}
          />
          <TextinputContainer
            editable
            text={'Tel: '}
            value={tel}
            onChangeText={handlePhoneChange}
          />
          <TextinputContainer
            editable
            text={'Adres: '}
            value={adres}
            onChangeText={setAdres}
          />
          <TextinputContainer
            editable={false}
            text={'Özellik: '}
            value={ozellik}
            onChangeText={setOzellik}
          />
          <CategoryDropdown value={cityValue} setValue={setCityValue} data={turkishCities} text={'Şehir'} placeholder={'Şehir seç'} city2={true} />

          <TextinputContainer
            text={'İlçe: '}
            value={ilce}
            onChangeText={setIlce}
          />
          <View style={style.buttonContainer}>
            <Button
              color={'white'}

              text={'Geçmiş İşlemleri Görüntüleyin'}
              backgroundColor={'#FF8A00'}
              width={windowWidth * 0.5}
              height={windowHeight * 0.07}
              onPress={() => {


                navigation.navigate('cariGecmisIslemler-screen', { _id })
              }}
            />
            <Button
              color={'white'}

              text={'Değişiklikleri Kaydet'}
              backgroundColor={'green'}
              width={windowWidth * 0.5}
              height={windowHeight * 0.07}
              onPress={updateOrder}
            />
          </View>
        </ScrollView>

      </View>
    </View>
  )
}
