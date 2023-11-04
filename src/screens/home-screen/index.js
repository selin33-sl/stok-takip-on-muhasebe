import { View, BackHandler, Alert, ScrollView, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addVirtualIncomingDocProcess, addVirtualOutgoingDocProcess, authLogOut, logoutProcess } from '../../api';
import style from './style';
import OptionButton from '../../components/OptionButton';
import { Header } from '../../components/Header';
import { resetAuth } from '../../redux/slice/auth-slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ToastCompError, ToastCompSuccess } from '../../components';
import { resetUpdateIncomingDoc } from '../../redux/slice/update-incoming-doc-slice';
import { resetUpdateOutgoingDoc } from '../../redux/slice/update-outgoing-doc-slice';
import VersionCheck from 'react-native-version-check';
import { resetAddIncomingProductWithProducts, resetProducts } from '../../redux/slice/add-incoming-product-with-products-slice';
import { resetAddOutgoingProduct } from '../../redux/slice/add-outgoing-product-slice';
import { resetAddOutgoingProductWithProducts } from '../../redux/slice/add-outgoing-product-with-products-slice';


export const HomeScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch();

  const [showIncomingUpdateToastError, setShowIncomingUpdateToastError] = useState(false)
  const [showOutgoingUpdateToastError, setShowOutgoingUpdateToastError] = useState(false)
  const [showIncomingUpdateToastSuccess, setShowIncomingUpdateToastSuccess] = useState(false)
  const [showOutgoingUpdateToastSuccess, setShowOutgoingUpdateToastSuccess] = useState(false)
  const [showCreateToastSuccess, setShowCreateToastSuccess] = useState(false)
  const [showCreateToastError, setShowCreateToastError] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation])
  );



  const logOut = () => {
    Alert.alert('Uyarı', 'Çıkış yapmak istedğinize emin misiniz?', [
      {
        text: 'İptal',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Evet',
        onPress: () => {
          navigation.navigate('login-screen');
          dispatch(authLogOut());
          // AsyncStorage.removeItem('@USERDATA');
          dispatch(resetAuth());
        },
      },
    ]);
  };

  const { status: UpdateIncomingDocStatuss } = useSelector((state) => state.updateIncomingDoc);
  const { status: UpdateOutgoingDocStatuss } = useSelector((state) => state.updateOutgoingDoc);
  const { status: AddIncomingProductWithProductsStatus, message: AddIncomingProductWithProductsMesssage } = useSelector(state => state?.addIncomingProductWithProducts);
  const { status: AddOutgoingProductWithProductsStatus, message: AddOutgoingProductWithProductsStatusMesssage } = useSelector(state => state?.addOutgoingProductWithProducts);

  console.log(AddIncomingProductWithProductsMesssage, "ccccccccccccccccccccccccccccccccc");

  useEffect(() => {
    console.log(AddOutgoingProductWithProductsStatus, "STATUUUUUUUUUUUUUUUUUUUUUUSSSSSSSSSSSSSSSSSSSS");
    setShowCreateToastSuccess(false)
    setShowIncomingUpdateToastSuccess(false)
    setShowIncomingUpdateToastError(false)
    setShowOutgoingUpdateToastSuccess(false)
    setShowOutgoingUpdateToastError(false)
    setShowCreateToastError(false)
    if (AddOutgoingProductWithProductsStatus === "success") {
      setShowCreateToastSuccess(true)

      dispatch(resetAddOutgoingProductWithProducts());

    } else if (AddOutgoingProductWithProductsStatus === "error") {
      setShowCreateToastError(true)
      setTimeout(() => {
        dispatch(resetAddOutgoingProductWithProducts());

      }, 900);

    }


    if (AddIncomingProductWithProductsStatus === "success") {
      setShowCreateToastSuccess(true)
      dispatch(resetAddIncomingProductWithProducts());
    }
    // } else if (AddIncomingProductWithProductsStatus === "error") {
    //   setShowCreateToastError(true)
    //   setTimeout(() => {
    //     dispatch(resetAddIncomingProductWithProducts());

    //   }, 900);

    // }

    if (UpdateIncomingDocStatuss === "success") {
      console.log("SUCCESSSSSSSSSSSSSSSSSSSSSSSSSS");
      setShowIncomingUpdateToastSuccess(true)
      dispatch(resetUpdateIncomingDoc());
    } else if (UpdateIncomingDocStatuss === "error") {
      console.log("ERRRORRRRRRRRRRRRRRRRRRR");

      setShowIncomingUpdateToastError(true)
      dispatch(resetUpdateIncomingDoc());
    }

    if (UpdateOutgoingDocStatuss === "success") {
      setShowOutgoingUpdateToastSuccess(true)
      dispatch(resetUpdateOutgoingDoc());
    } else if (UpdateOutgoingDocStatuss === "error") {
      setShowOutgoingUpdateToastError(true)
      dispatch(resetUpdateOutgoingDoc());
    }



  }, [UpdateIncomingDocStatuss, UpdateOutgoingDocStatuss, AddIncomingProductWithProductsStatus, AddOutgoingProductWithProductsStatus])

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

  const checkForUpdates = async () => {
    try {
      const update = await VersionCheck.needUpdate();
      if (update.isNeeded) {
        console.log(update.currentVersion, "vvvvvvvvvvvvvvvvvvvvvvvvvvvv ");
        // Güncelleme mevcutsa, kullanıcıya bildirin
        update.currentVersion //mevcut uygulama sürümü
        update.latestVersion // en son sürüm
        showCancelAlert()
      } else {
        console.log(update.currentVersion, "vvvvvvvvvvvvvvvvvvvvvvvvvvvv ");
      }
    } catch (error) {
      // Hata kontrolü
      console.error('Güncelleme kontrolü sırasında hata oluştu:', error);
    }
  };
  checkForUpdates()


  return (
    <View style={style.container}>
      <ToastCompSuccess show={showCreateToastSuccess} text1={'Belge Oluşturuldu'} text2={'Belge başarıyla oluşturuldu.'} />
      <ToastCompError show={showCreateToastError} text1={AddOutgoingProductWithProductsStatusMesssage} />
      {/* <ToastCompError show={showCreateToastError} text1={AddIncomingProductWithProductsMesssage} /> */}

      <ToastCompSuccess show={showIncomingUpdateToastSuccess} text1={'Değişiklikler Kaydedildi'} text2={'Değişiklikler başarıyla kaydedildi.'} />
      <ToastCompError show={showIncomingUpdateToastError} text1={'Değişiklikler Kaydedilmedi'} text2={'Değişiklikler kaydedilmedi.'} />
      <ToastCompSuccess show={showOutgoingUpdateToastSuccess} text1={'Değişiklikler Kaydedildi'} text2={'Değişiklikler başarıyla kaydedildi.'} />
      <ToastCompError show={showOutgoingUpdateToastError} text1={'Değişiklikler Kaydedilmedi'} text2={'Değişiklikler kaydedilmedi.'} />

      <Header third={true} thirdName={'logout'} onPress={logOut} />

      <ScrollView style={style.innerContainer}>
        <View style={style.buttonContainer} >

          <OptionButton text={"Ürün Stoğu"} onPress={() => navigation.navigate('urunSecenekleri-stack')} name={'widgets-outline'} />
          <OptionButton text={"Belgeler"} onPress={() => navigation.navigate('belgeler-stack')} name={'clipboard-text-multiple-outline'} />

        </View>
        <View style={style.buttonContainer} >

          <OptionButton text={"Ürün Girişi"} onPress={() => {
            navigation.navigate('urunGiris-stack');
            dispatch(addVirtualIncomingDocProcess());

          }} name={'archive-plus-outline'} />
          <OptionButton text={"Ürün Çıkışı"} onPress={() => {
            navigation.navigate('urunCikis-stack');
            dispatch(addVirtualOutgoingDocProcess());

          }} name={'archive-remove-outline'} />
        </View>
        <View style={{ ...style.buttonContainer, justifyContent: 'center' }} >
          <OptionButton text={"Cariler"} onPress={() => navigation.navigate('cari-stack')} name={'account-supervisor-circle-outline'} />

        </View>




      </ScrollView>
    </View>

  )
}