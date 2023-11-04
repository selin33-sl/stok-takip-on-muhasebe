import { View, Image, ScrollView, Dimensions, Alert, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import style from './style'
import { Button, Header, TextinputContainer, ToastComp, ToastCompError } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addNewProductProcess, getAllCategoriesProcess, getAllProductsProcess, getProductsByCategoryProcess } from '../../api';
import { ImagePickerEmpty } from '../../components/ImagePickerEmpty';
import * as ImagePicker from 'react-native-image-picker';
import { ImagePickerModal } from '../../components/image-picker-modal';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RNFS from 'react-native-fs';
import { CategoryDropdown } from '../../components/CategoryDropdown';
import ImageResizer from '@bam.tech/react-native-image-resizer'
import { resetAddProduct } from '../../redux/slice/add-new-product-slice';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export const UrunEkleScreen = () => {

  // const data = [
  //   { kdv: '1' },
  //   { kdv: '8' },
  //   { kdv: '10' },
  //   { kdv: '18' },
  //   { kdv: '20' },
  // ]

  const dataBirim = [
    { categoryName: 'kg', _id: 'kg' },
    { categoryName: 'lt', _id: 'lt' },
    { categoryName: 'adet', _id: 'adet' },
    { categoryName: 'mm', _id: 'mm' },
  ]


  const [showAddProductToastError, setAddProductToastError] = useState(false)


  const [urunAdi, setUrunAdi] = useState('');
  const [sk, setSK] = useState('');
  const [fiyat, setFiyat] = useState();
  const [kdv, setKdv] = useState();
  const [categoryValue, setCategoryValue] = useState(null);
  const [birim, setBirim] = useState(null);

  const [aciklama, setAciklama] = useState('');
  const [rafAdresi, setRafAdresi] = useState('');
  const [pickerResponse, setPickerResponse] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [barcode, setBarcode] = useState(null);

  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { params: { page = 0, categoryId } = {} } = useRoute();


  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;


  useEffect(() => {
    if (pickerResponse?.imageBase64 != null) {
      setProductImage(`data:image/jpeg;base64,${pickerResponse?.imageBase64}`)
    } else {
      setProductImage('')
    }

  }, [pickerResponse?.imageBase64])


  const { data: AllCategoriesData } = useSelector(state => state.getCategories);
  const { status: addProductStatus, message: AddNewProductMessage } = useSelector((state) => state.addNewProduct);

  console.log(AllCategoriesData, "ÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇ");


  useEffect(() => {

    setAddProductToastError(false)

    if (addProductStatus === "error") {
      console.log(AddNewProductMessage, "eeeeeeeeeeeeeeeeeeeeeeeee");
      setAddProductToastError(true)

      // dispatch(resetAddProduct());

      setTimeout(() => {
        dispatch(resetAddProduct());
      }, 900); // 3 saniye sonra çalışacak
      console.log(AddNewProductMessage, "5000eeeeeeeeeeeeeeeeeeeeeeeee");

    } else if (addProductStatus === "success") {
      if (page === 2 || page === 3 || page === 4 || page === 5) {
        navigation.goBack()
      } else {
        navigation.navigate('stok-screen');

      }

      setSK("")
      setUrunAdi("")
      setFiyat()
      setCategoryValue(null)
      setBirim(null)
      setAciklama("")
      setRafAdresi("")
      setProductImage(null)
      setBarcode(null)
      dispatch(getAllProductsProcess());

    }
    else {
      console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
    }



  }, [addProductStatus,])


  console.log(productImage, "pppppppppppppppppppp");


  const addNewProduct = async () => {
    await dispatch(addNewProductProcess({
      category: categoryValue,
      productCode: sk,
      productName: urunAdi,
      productListPrice: fiyat,
      productDescription: aciklama,
      productPackageType: birim,
      productBarcode: barcode,
      productAddress: rafAdresi,
      productImage: productImage,
      // productKDVPercent: kdv
    }));

    dispatch(getProductsByCategoryProcess({
      categoryId: categoryId
    }))

    //   dispatch(getAllProductsProcess());

  }

  const handleUrunAdiChange = text => {
    const characterCount = text.length; // Boşlukları saymamak için trim kullanılıyor

    if (characterCount <= 75) {
      setUrunAdi(text);
    } else {
      Alert.alert('Uyarı', 'En fazla 75 karakter girebilirsiniz.');
    }
  };



  const onImageLibraryPress = async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    };
    const response = await ImagePicker.launchImageLibrary(options);

    if (response.assets && response.assets[0].uri) {
      const imageUri = response.assets[0].uri;
      try {
        // Resimi küçültmek için ImageResizer'ı kullan
        const resizedImageUri = await resizeImage(imageUri);
        const imageBase64 = await RNFS.readFile(resizedImageUri, 'base64');
        setPickerResponse({ ...response, imageBase64 });
      } catch (error) {
        console.error('Error reading image:', error);
      }
    }
  };

  const resizeImage = async (imageUri) => {
    try {
      const resizedImage = await ImageResizer.createResizedImage(
        imageUri,
        500, // Yeni genişlik
        500, // Yeni yükseklik
        'JPEG', // Format
        80, // Kalite (1-100)
        0, // Döndürme açısı
      );
      return resizedImage.uri;
    } catch (error) {
      console.error('Error resizing image:', error);
      return imageUri; // Hata durumunda orijinal resmi döndür
    }
  };

  const onCameraPress = React.useCallback(async () => {
    const cameraPermissionResult = await checkCameraPermission();

    if (cameraPermissionResult === RESULTS.GRANTED) {
      // Kamera izni zaten verilmişse burada kamera açılabilir
      // Kamera açma işlemini burada yapabilirsiniz
      const options = {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: true,
      };
      const response = await ImagePicker.launchCamera(options);

      if (response.assets && response.assets[0].uri) {
        const imageUri = response.assets[0].uri;
        try {
          // Resimi küçültmek için ImageResizer'ı kullan
          const resizedImageUri = await resizeImage(imageUri);
          const imageBase64 = await RNFS.readFile(resizedImageUri, 'base64');
          setPickerResponse({ ...response, imageBase64 });
        } catch (error) {
          console.error('Error reading image:', error);
        }
      }
    } else if (cameraPermissionResult === RESULTS.DENIED) {
      // Kullanıcı izin vermediyse izin talep et
      const permissionResult = await requestCameraPermission();

      if (permissionResult === RESULTS.GRANTED) {
        // Kullanıcı izin verdiyse burada kamera açılabilir
        // Kamera açma işlemini burada yapabilirsiniz
        const options = {
          saveToPhotos: true,
          mediaType: 'photo',
          includeBase64: true,
        };
        const response = await ImagePicker.launchCamera(options);

        if (response.assets && response.assets[0].uri) {
          const imageUri = response.assets[0].uri;
          try {
            // Resimi küçültmek için ImageResizer'ı kullan
            const resizedImageUri = await resizeImage(imageUri);
            const imageBase64 = await RNFS.readFile(resizedImageUri, 'base64');
            setPickerResponse({ ...response, imageBase64 });
          } catch (error) {
            console.error('Error reading image:', error);
          }
        }
      }
    }
  }, []);


  const checkCameraPermission = async () => {
    const result = await check(PERMISSIONS.ANDROID.CAMERA);
    return result;
  };

  const requestCameraPermission = async () => {
    const permissionResult = await request(PERMISSIONS.ANDROID.CAMERA);
    return permissionResult;
  };

  const handleBarcodeRead = (barcodes) => {
    if (barcodes.data.length > 0) {
      const scannedData = barcodes?.data;
      setBarcode(scannedData);
      setCameraOpen(false);
    }
  };

  const handleOpenCamera = () => {
    setBarcode(null);
    setCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setCameraOpen(false);
  };


  useEffect(() => {
    if (uri) {
      setVisible(false);
    }
  }, [uri]);


  const handleSKChange = text => {

    const characterCount = text.length; // Boşlukları saymamak için trim kullanılıyor

    if (characterCount <= 20) {
      setSK(text);
    } else {
      Alert.alert('Uyarı', 'En fazla 20 karakter girebilirsiniz.');
    }
  };

  console.log(birim, "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
  console.log(categoryValue, "categorvvvvvvvvvvvvvvvvv");

  return (

    <View style={style.container} >
      <ToastCompError show={showAddProductToastError} text1={'Ürün Eklenemedi'} text2={AddNewProductMessage} />

      {!cameraOpen ? (
        <>
          <Header first={true} firstName={'arrow-left'} second={true} text={'Ürün Oluştur'} color={'#000E36'} />
          <View style={style.innerContainer} >
            <ImagePickerEmpty uri={uri} onPress={() => setVisible(true)} />
            <ImagePickerModal
              isVisible={visible}
              onClose={() => setVisible(false)}
              onImageLibraryPress={onImageLibraryPress}
              onCameraPress={onCameraPress}
            />


            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }} >
              <ScrollView showsVerticalScrollIndicator={false}  >
                <TextinputContainer
                  required={true}
                  editable={true}
                  text={'Ürün Adı: '}
                  value={urunAdi}
                  onChangeText={handleUrunAdiChange} />
                <TextinputContainer
                  required={true}
                  editable={true}
                  text={'Stok Kodu: '}
                  value={sk}
                  onChangeText={handleSKChange} />


                <CategoryDropdown value={categoryValue} setValue={setCategoryValue} data={AllCategoriesData} text={'Kategori'} placeholder={'Kategori seç'} />

                <TextinputContainer
                  editable={true}
                  text={'Açıklama: '}
                  value={aciklama}
                  onChangeText={setAciklama}
                  numberOfLines={2}

                />

                <CategoryDropdown value={birim} setValue={setBirim} data={dataBirim} text={'Birim Türü'} placeholder={'Birim seç'} />

                <TextinputContainer
                  editable={true}
                  text={'Raf Adresi: '}
                  value={rafAdresi}
                  onChangeText={setRafAdresi}
                // numberOfLines={2}

                />


                <TextinputContainer
                  editable={true}
                  keyboardType={'numeric'}
                  text={'Barkod: '}
                  value={barcode}
                  onChangeText={setBarcode}
                  icon={true}
                  onPress={handleOpenCamera}
                />
                <TextinputContainer
                  required={true}
                  editable={true}
                  keyboardType={'numeric'}
                  text={'Liste Fiyatı: '}
                  value={fiyat}
                  onChangeText={setFiyat}
                />


                {/* <CategoryDropdown value={kdv} setValue={setKdv} data={data} text={'KDV'} placeholder={'kdv %'} kdv2={true} /> */}


                <Button text={'Kaydet'} width={windowWidth * 0.35} color={'white'}
                  height={windowHeight * 0.05} backgroundColor={'#000E36'} onPress={addNewProduct} />
              </ScrollView>
            </View>



          </View>
        </>

      ) : (
        <>
          <RNCamera
            style={style.camera}
            onBarCodeRead={handleBarcodeRead}
          />
          <TouchableOpacity style={style.closeContainer} onPress={handleCloseCamera}>
            <Icon name={'close'} size={45} color={'red'} />
          </TouchableOpacity>

        </>

      )}
    </View>
  )
}
