import { View, Text, Image, ScrollView, Dimensions, Alert, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Header, TextinputContainer, ToastCompError, ToastCompSuccess } from '../../components'
import style from './style'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProductsProcess, getProductDetailProcess, productDeleteProcess, updateProductProcess } from '../../api';
import { resetUpdateProduct } from '../../redux/slice/update-product-slice';
import { resetDeleteProduct } from '../../redux/slice/delete-product-slice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Loading } from '../../components/Loading';
import { ImagePickerModal } from '../../components/image-picker-modal';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { RNCamera } from 'react-native-camera';
import { CategoryDropdown } from '../../components/CategoryDropdown';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const UrunDetayScreen = () => {

  const data = [
    { categoryName: 'kg' },
    { categoryName: 'lt' },
    { categoryName: 'adet' },
    { categoryName: 'mm' },
  ]
  const dispatch = useDispatch();
  const route = useRoute()
  const navigation = useNavigation();

  const { _id, } = route.params

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  const [showDeleteToastSuccess, setShowDeleteToastSuccess] = useState(false)
  const [showUpdateToastSuccess, setShowUpdateToastSuccess] = useState(false)
  const [showDeleteToastError, setShowDeleteToastError] = useState(false)
  const [showUpdateToastError, setShowUpdateToastError] = useState(false)

  const [visible, setVisible] = useState(false);
  const [urunAdi, setUrunAdi] = useState('');
  const [sk, setSK] = useState('');
  const [adet, setAdet] = useState();
  const [fiyat, setFiyat] = useState('');
  const [kdv, setKdv] = useState();

  const [birim, setBirim] = useState('');
  const [rafAdresi, setRafAdresi] = useState('');
  const [aciklama, setAciklama] = useState('');
  const [image, setImage] = useState(null)
  const [pickerResponse, setPickerResponse] = useState(null);
  const [imageDefault, setImageDefault] = useState()
  const [cameraOpen, setCameraOpen] = useState(false);
  const [barcode, setBarcode] = useState(null);
  const [categoryValue, setCategoryValue] = useState(null);


  useEffect(() => {
    dispatch(getProductDetailProcess({ _id }));

  }, []);




  useEffect(() => {
    if (image) {
      setVisible(false);
    }
  }, [image]);



  const { data: ProductDetailData, isLoading, message } = useSelector(state => state.productDetail);


  console.log(ProductDetailData, "detayyyyyyyyyyyyyyyyyyy");

  console.log(adet, "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");


  useEffect(() => {
    if (ProductDetailData) {
      setUrunAdi(ProductDetailData?.productName || '');
      setSK(ProductDetailData?.productCode || '');
      setAdet(ProductDetailData?.productQuantity.toString() || '');
      setFiyat((ProductDetailData?.productListPrice || '').toString());
      setBarcode(ProductDetailData?.productBarcode || '');
      setAciklama(ProductDetailData?.productDescription || '');
      setImage(ProductDetailData?.productImage || '');
      setCategoryValue(ProductDetailData?.category?._id || '')
      setKdv((ProductDetailData?.productKDVPercent || '').toString())
      setRafAdresi(ProductDetailData?.productAddress || '')
      setBirim(ProductDetailData?.productPackageType)
    }
  }, [ProductDetailData]);
  console.log((ProductDetailData?.productQuantity.toString()), "ADETTTTTTTTTTTTTTTTTTTT");

  const { status: UpdateProductStatus, message: UpdateProductMessage } = useSelector(state => state.updateProduct);
  const { status: DeleteProductStatus } = useSelector(state => state.productDelete);


  console.log(UpdateProductMessage, "ERRRRRRRRRRRRORRRRRRRRRRRRR")

  useEffect(() => {
    setShowUpdateToastError(false)
    setShowUpdateToastSuccess(false)
    setShowDeleteToastSuccess(false)
    setShowDeleteToastError(false)

    console.log(UpdateProductStatus, "SSSSSSSSSSSSSSSSSSSSSSSSS")
    if (UpdateProductStatus === "success") {

      setShowUpdateToastSuccess(true)
      dispatch(resetUpdateProduct());
      navigation.goBack()
      dispatch(getAllProductsProcess())

    } else if (UpdateProductStatus === "error") {

      setShowUpdateToastError(true)
      setTimeout(() => {
        dispatch(resetUpdateProduct());
      }, 900);

    }
    if (DeleteProductStatus.productDeleteProcess === "success") {
      setShowDeleteToastSuccess(true)
      dispatch(resetDeleteProduct());
    } else if (DeleteProductStatus.productDeleteProcess === "error") {
      setShowDeleteToastError(true)
      dispatch(resetDeleteProduct());
    }
  }, [UpdateProductStatus, DeleteProductStatus.productDeleteProcess])


  const { status: productUpdateStatus, message: productUpdateMessage } = useSelector(state => state.updateProduct);

  console.log(productUpdateStatus, "updatestatussssssssssssssssss");
  useEffect(() => {

    setShowUpdateToastError(false)

    if (productUpdateStatus === "error") {
      console.log(productUpdateMessage, "eeeeeeeeeeeeeeeeeeeeeeeee");
      setShowUpdateToastError(true)

      // dispatch(resetAddProduct());

      setTimeout(() => {
        dispatch(resetUpdateProduct());
      }, 900); // 3 saniye sonra çalışacak
      console.log(productUpdateMessage, "5000eeeeeeeeeeeeeeeeeeeeeeeee");

    }
    // } else if (productUpdateStatus === "success") {
    //   // if (page === 2 || page === 3 || page === 4 || page === 5) {
    //   //   navigation.goBack()
    //   // } else {
    //   //   navigation.navigate('stok-screen');

    //   // }

    //   setSK("")
    //   setUrunAdi("")
    //   setFiyat()
    //   setCategoryValue(null)
    //   setAciklama("")
    //   setProductImage(null)
    //   setBarcode(null)
    //   dispatch(getAllProductsProcess());

    // }
    // else {
    //   console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
    // }



  }, [productUpdateStatus,])

  const updateProduct = async () => {
    console.log(image, "ğğğğğğğğğğğğğğğğğğğğğğğğğğğğğğğğğ");
    console.log(_id, "İDDDDDDDDDDDDDDDDDDDDDDDDD")

    await dispatch(updateProductProcess({
      _id: _id,
      productCode: sk,
      productName: urunAdi,
      productListPrice: fiyat,
      productDescription: aciklama,
      productPackageType: 'dkfsd',
      productBarcode: barcode,
      productAddress: rafAdresi,
      productImage: image,
      category: categoryValue
    }));




  }


  const confirmDeleteProduct = () => {
    Alert.alert(
      'Ürünü Sil',
      'Bu ürünü silmek istediğinize emin misiniz?',
      [
        { text: 'Vazgeç', style: 'cancel' },
        { text: 'Sil', onPress: deleteProduct, style: 'destructive' }
      ]
    );
  };


  const deleteProduct = async () => {
    await dispatch(productDeleteProcess({
      _id: _id,
    }));

    dispatch(getAllProductsProcess());

    navigation.goBack();

  };



  useEffect(() => {
    if (pickerResponse?.imageBase64 != null) {
      setImage(`data:image/jpeg;base64,${pickerResponse?.imageBase64}`)
    } else {
      setImage("")
    }

  }, [pickerResponse?.imageBase64])



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

  // Resim seçildikten sonra bu fonksiyonu çağırabilirsiniz
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

  let imageSource;
  if (!imageDefault) {
    imageSource = require('../../assets/default-image.jpg');
  } else {

    imageSource = { uri: image };
  }

  const handlerImageDelete = () => {
    setImage("")
    setImageDefault(false)

  }

  const handlerImageUpdate = () => {
    setVisible(true)
  }


  useEffect(() => {
    setImageDefault(image == '' ? (false) : (true))
  }, [image])





  const handleBarcodeRead = (barcodes) => {
    console.log(barcodes?.data);
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

  const { data: AllCategoriesData } = useSelector(state => state.getCategories);


  console.log(imageDefault, "EEEEEEEEEEEEEEEE");

  return (
    <View style={style.container} >


      <ToastCompSuccess show={showDeleteToastSuccess} text1={'Ürün Silindi'} text2={'Ürün başarıyla silindi.'} />
      <ToastCompSuccess show={showUpdateToastSuccess} text1={'Ürün Güncellendi'} text2={'Ürün bilgileri başarıyla güncellendi.'} />
      <ToastCompError show={showDeleteToastError} text1={'Ürün Silinemedi'} text2={'Ürün silinemedi.'} />
      <ToastCompError show={showUpdateToastError} text1={'Ürün Güncellenemedi'} text2={UpdateProductMessage} />


      {!cameraOpen ? (
        <>

          <Header first={true} firstName={'arrow-left'} second={true} text={'Ürünü Düzenle'} color={'#000E36'} />


          <View style={style.innerContainer} >


            {isLoading.getProductDetailProcess && (
              <Loading />
            )}


            <View style={style.imageContainer}>
              <Image source={imageSource} style={style.imageStyle} size={30} />
            </View>
            <ImagePickerModal
              isVisible={visible}
              onClose={() => setVisible(false)}
              onImageLibraryPress={onImageLibraryPress}
              onCameraPress={onCameraPress}
            />
            <View style={style.deleteContainer}>

              <TouchableOpacity onPress={handlerImageDelete} >
                <Icon name={'delete'} size={22} color={'red'} />
              </TouchableOpacity>

              <TouchableOpacity onPress={handlerImageUpdate} >
                <Icon name={'pencil'} size={22} color={'green'} />
              </TouchableOpacity>

            </View>

            <ScrollView style={style.scroll}  >
              <TextinputContainer
                required={true}
                editable={true}
                text={'Ürün Adı: '}
                value={urunAdi}
                onChangeText={setUrunAdi} />
              <TextinputContainer
                required={true}
                editable={true}
                keyboardType='numeric'
                text={'Stok Kodu: '}
                value={sk}
                onChangeText={setSK} />

              <CategoryDropdown value={categoryValue} setValue={setCategoryValue} data={AllCategoriesData} text={'Kategori'} placeholder={'Kategori seç'} />

              <TextinputContainer
                editable={true}
                text={'Açıklama: '}
                value={aciklama}
                onChangeText={setAciklama}
              // numberOfLines={4}
              />
              {/* <CategoryDropdown value={birim} setValue={setBirim} data={data} text={'Birim Türü'} placeholder={'Birim seç'} /> */}
              <TextinputContainer
                editable={false}
                text={'Birim Türü: '}
                value={birim}
                onChangeText={setBirim}
              // numberOfLines={4}
              />
              <TextinputContainer
                editable={true}
                text={'Raf Adresi: '}
                value={rafAdresi}
                onChangeText={setRafAdresi}
              // numberOfLines={4}
              />
              <TextinputContainer
                editable={false}
                keyboardType='numeric'
                text={birim + ':'}
                value={adet}
                onChangeText={setAdet}
              />
              <TextinputContainer
                editable={true}
                keyboardType='numeric'
                text={'Barkod: '}
                value={barcode}
                onChangeText={setBarcode}
                icon={true}
                onPress={handleOpenCamera}
              />
              <TextinputContainer
                required={true}
                editable={true}
                keyboardType='numeric'
                text={'Liste Fiyatı: '}
                value={fiyat}
                onChangeText={setFiyat}
              />
              {/* <CategoryDropdown value={kdv} setValue={setKdv} data={data} text={'KDV'} placeholder={'kdv %'} kdv2={true} /> */}


              <View style={style.buttonContainer}>
                <Button text={'Sil'} width={windowWidth * 0.25} color={'white'}
                  height={windowHeight * 0.05} backgroundColor={'red'} onPress={confirmDeleteProduct} />
                <Button text={'Kaydet'} width={windowWidth * 0.35} color={'white'}
                  height={windowHeight * 0.05} backgroundColor={'#000E36'} onPress={updateProduct} />
              </View>


              {/* <Text style={{ color: 'red' }}> {message ? JSON.stringify(message) : 'YOK'}</Text> */}


            </ScrollView>

          </View></>
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
