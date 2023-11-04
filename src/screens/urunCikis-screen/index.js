import { View, Text, Dimensions, FlatList, BackHandler, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { Bilgi, Button, Cart, EmptyList, Header, MyModal, ToastComp, ToastCompError, ToastCompSuccess } from '../../components';
import style from './style';
import { addOutgoingProductProcess, addOutgoingProductWithProductsProcess, deleteProductFromOutgoingVirtualDocProcess, deleteVirtualOutgoingDocProcess, getNextDocumentNumberProcess, getOutgoingProductDetailProcess, getOutgoingProductsProcess, getVirtualOutgoingProductDetailProcess, updateIncomingVirtualDocProductsProcess, updateOutgoingDocProcess, updateOutgoingDocProductQuantityProcess, updateOutgoingVirtualDocProductsProcess } from '../../api';
import { resetOutgoingProductDetail } from '../../redux/slice/get-outgoing-product-detail-slice';
import { resetAddOutgoingProduct } from '../../redux/slice/add-outgoing-product-slice';
import { useDispatch, useSelector } from 'react-redux';
import { resetOutgoingProductQuantityUpdate } from '../../redux/slice/update-outgoing-doc-product-quantity-slice';
import { PriceArea } from '../../components/PriceArea';
import { removeProduct, resetProducts, updateProduct } from '../../redux/slice/local-products-slice';
import { resetAddOutgoingProductWithProducts } from '../../redux/slice/add-outgoing-product-with-products-slice';
import { resetUpdateOutgoingVirtualDocProducts } from '../../redux/slice/update-outgoing-virtual-doc-products-slice';
import { resetAddProductToOutgoingVirtualDoc } from '../../redux/slice/add-product-to-outgoing-virtual-doc-slice';
import { resetGetVirtualOutgoingProductDetail } from '../../redux/slice/get-virtual-outgoing-product-detail-process-slice';
import { resetDeleteVirtualOutgoingDoc } from '../../redux/slice/delete-virtual-outgoing-doc-slice';
import { resetAddVirtualOutgoingDoc } from '../../redux/slice/add-virtual-outgoing-doc-slice';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const UrunCikisScreen = () => {

  const date = new Date().toISOString().split("T")[0];

  const [showCreateToastSuccess, setShowCreateToastSuccess] = useState(false)
  const [showUpdateeToastSuccess, setShowUpdateeToastSuccess] = useState(false)

  const [showCreateToastError, setShowCreateToastError] = useState(false)
  const [showAddToastError, setShowAddToastError] = useState(false)
  const [showUpdateeToastError, setShowUpdateeToastError] = useState(false)


  const [productId, setProductId] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [description, setDescription] = useState(null)
  const [documentNo, setDocumentNo] = useState('000001')
  const [documentDate, setDocumentDate] = useState(date)
  const [miktar, setMiktar] = useState()
  const [kdvValue, setKdvValue] = useState(false);
  const [fiyatValue, setFiyatValue] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [rowId, setRowId] = useState("");


  const navigation = useNavigation();
  const dispatch = useDispatch();

  console.log(miktar, "şşşşşşşşşşşşşşşşşşşşş");


  const { status: deleteVirtualOutgoingDocStatuss } = useSelector((state) => state.deleteVirtualOutgoingDoc);
  const { status, data } = useSelector(state => state.addOutgoingProduct);
  const { data: OutgoingProductsDetailData } = useSelector(state => state?.outgoingProductdetail);
  const { data: DocumentNumberData } = useSelector(state => state?.getNextDocumentNumber);
  const { products: products } = useSelector(state => state?.localProducts);
  const { data: AddVirtualOutgoingDocData } = useSelector(state => state?.addVirtualOutgoingDoc);
  const { data: GetVirtualOutgoingProductDetailData } = useSelector(state => state.virtualOutgoingProductDetail);
  const { message: AddProductToOutgoingVirtualDocMessage, } = useSelector(state => state.addProductToOutgoingVirtualDoc);

  console.log(AddProductToOutgoingVirtualDocMessage, "mesajjjjjjjjjjjjjjjjjj");
  console.log(GetVirtualOutgoingProductDetailData?.products, "PPPPPRRROOOOOOOOOOOOOOOOOOOO");

  const showAlertDelete = () => {
    Alert.alert(
      'Uyarı',
      'Bu ürünü silmek istediğinize emin misiniz?',
      [
        { text: 'Vazgeç', style: 'cancel' },
        { text: 'Sil', onPress: handlerDelete, style: 'destructive' }
      ]
    );
  };

  const showAlertBack = () => {
    GetVirtualOutgoingProductDetailData?.products && GetVirtualOutgoingProductDetailData?.products.length > 0 ? (
      Alert.alert(
        'Uyarı',
        'Yapılan değişiklikleri kaydetmeden çıkmak istediğinize emin misiniz',
        [
          { text: 'Hayır', style: 'cancel' },
          {
            text: 'Evet', onPress: handleBackPress, style: 'destructive'
          }
        ]
      )
    ) : handleBackPress()



  };


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isModalVisible) {
          setIsModalVisible(false);
          return true; // Geri tuşunu tüketin
        } else {
          // Diğer sayfalara yönlendirebilirsiniz
          if (GetVirtualOutgoingProductDetailData?.products && GetVirtualOutgoingProductDetailData?.products.length > 0) {
            console.log("VAAAAAAAAAAARRRRRRRRRRRR")
            showAlertBack();
          } else {
            console.log("YOOOOOOOOOOOOOOOOOOOKKKKKKKKKKKKKKK")
            handleBackPress();
          }
          return true; // Geri tuşunu tüketin
        }
      };

      // Geri tuşuna basıldığında onBackPress işlevini çağırın
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        // Ekran odak dışı kaldığında olay dinleyicisini kaldırın
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [isModalVisible, navigation, products])
  );

  useEffect(() => {
    dispatch(getNextDocumentNumberProcess())
    dispatch(resetOutgoingProductDetail())
    // dispatch(getOutgoingProductDetailProcess({ outgoingProductId: data?._id }))


  }, []);
  useEffect(() => {
    dispatch(getVirtualOutgoingProductDetailProcess({ virtualDocId: AddVirtualOutgoingDocData?._id, }))
  }, [AddVirtualOutgoingDocData])



  const handlePressStokScreen = () => {
    navigation.navigate('stok-screen', { page: 3, outgoingProductId: AddVirtualOutgoingDocData?._id });
  };



  const handleNameSelection = (name, id) => {
    setSelectedName(name);
    setSelectedId(id)
  };




  const handleBackPress = async () => {
    await dispatch(deleteVirtualOutgoingDocProcess({ virtualDocId: AddVirtualOutgoingDocData?._id }))
    navigation.goBack();
  };


  const handlerDelete = async () => {
    console.log(productId, "dddddddddddddddddddddd");
    await dispatch(deleteProductFromOutgoingVirtualDocProcess({
      virtualDocId: AddVirtualOutgoingDocData._id,
      productId: rowId,
    }))
    setIsModalVisible(false)

    dispatch(getVirtualOutgoingProductDetailProcess({ virtualDocId: AddVirtualOutgoingDocData?._id, }))

  }

  useEffect(() => {

    if (deleteVirtualOutgoingDocStatuss === "success") {
      dispatch(resetGetVirtualOutgoingProductDetail())
      dispatch(resetDeleteVirtualOutgoingDoc())
      dispatch(resetAddVirtualOutgoingDoc())
    }
  }, [deleteVirtualOutgoingDocStatuss,]);

  const handleSaveDocument = async () => {


    await dispatch(addOutgoingProductWithProductsProcess({
      documentDate: documentDate,
      description: description,
      virtualDocId: AddVirtualOutgoingDocData?._id,
      order: selectedId

    })),

      navigation.goBack()

  };


  const renderItem = ({ item }) => {
    console.log(item, "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
    return (


      <Cart
        listeFiyati={item?.productSalesPrice}
        imageDefault={!item?.product?.productImage}

        image={item?.product?.productImage}
        name={item?.product?.productName}
        sk={item?.product?.productCode}
        adet={item?.quantity}
        onPress={() => {
          setSelectedProduct(item)
          setProductId(item?.product?._id)
          setIsModalVisible(true)
          setMiktar(item?.quantity?.toString())
          setFiyatValue(item?.productSalesPrice?.toString())
          setSelection(item?.includeKDV)
          setKdvValue(item?.kdvPercent?.toString())
          setRowId(item?._id)

        }

        }

      />
    )
  };

  const handleQuantityUpdate = async () => {


    await dispatch(updateOutgoingVirtualDocProductsProcess({

      virtualDocId: AddVirtualOutgoingDocData?._id,
      productSalesPrice: fiyatValue,
      kdvPercent: kdvValue,
      includeKdv: isSelected,
      productSelfId: productId,
      productId: rowId,
      quantity: miktar
    }))

    setIsModalVisible(false);
    dispatch(getVirtualOutgoingProductDetailProcess({ virtualDocId: AddVirtualOutgoingDocData?._id, }))



  };

  const updateDoc = async () => {
    await dispatch(updateOutgoingDocProcess({
      _id: data?._id,
      documentDate: documentDate,
      order: selectedId,
      description: description,

    }))
    navigation.goBack()
    await dispatch(resetAddOutgoingProduct());

  }

  const { status: addOutgoingProductStatus } = useSelector((state) => state.addOutgoingProduct);
  const { status: UpdateOutgoingProductStatuss } = useSelector((state) => state.updateOutgoingVirtualDocProducts);
  const { status: AddProductToOutgoingVirtualDocStatus } = useSelector(state => state.addProductToOutgoingVirtualDoc);

  console.log(AddProductToOutgoingVirtualDocStatus, "ne buu");



  useEffect(() => {
    setShowUpdateeToastError(false)
    setShowCreateToastError(false)
    setShowUpdateeToastSuccess(false)
    setShowAddToastError(false)


    if (addOutgoingProductStatus === "error") {
      setShowCreateToastError(true)
      dispatch(resetAddOutgoingProduct());
    }
    if (AddProductToOutgoingVirtualDocStatus === "error") {
      console.log("ooooooooooooooooooooooooooooooooooooooooo");

      setShowAddToastError(true)
      setFiyatValue("")
      setMiktar()
      setKdvValue("20")
      setTimeout(() => {
        dispatch(resetAddProductToOutgoingVirtualDoc());

      }, 900);
    }


    if (UpdateOutgoingProductStatuss === "success") {

      setShowUpdateeToastSuccess(true)
      dispatch(resetUpdateOutgoingVirtualDocProducts());
    } else if (UpdateOutgoingProductStatuss === "error") {
      setShowUpdateeToastError(true)
      dispatch(resetUpdateOutgoingVirtualDocProducts());
    }

  }, [UpdateOutgoingProductStatuss, addOutgoingProductStatus, AddProductToOutgoingVirtualDocStatus])

  return (
    <View style={style.container}>

      <ToastCompSuccess show={showCreateToastSuccess} text1={'Belge Oluşturuldu'} text2={'Belge başarıyla oluşturuldu.'} />
      <ToastCompSuccess show={showUpdateeToastSuccess} text1={'Ürün Güncellendi'} text2={'Ürün başarıyla güncellendi.'} />
      <ToastCompError show={showCreateToastError} text1={'Belgede ürün bulunamadı.'} />
      <ToastCompError show={showUpdateeToastError} text1={'Ürün Güncellenemedi'} text2={'Ürün güncellenemedi.'} />
      <ToastCompError show={showAddToastError} text1={AddProductToOutgoingVirtualDocMessage} />

      <Header
        isAddProduct
        first={true}
        second={true}
        text={'Ürün Çıkışı'}
        firstName={'arrow-left'}
        color={'#000E36'}
        third={true}
        button={true}
        backgroundColor={'#000E36'}
        onBackPress={showAlertBack}
        onPress={handlePressStokScreen}
      />

      <View style={style.innerContainer}>
        <Bilgi
          tarih={documentDate}
          setTarih={setDocumentDate}
          documentNo={DocumentNumberData}
          description={description}
          setDescription={setDescription}
          text={'Alıcı'}
          name={selectedName}
          setSelectedName={setSelectedName}
          onPress={() =>
            navigation.navigate(
              'cariler-screen',
              {
                typee: 'Giden',
                onSelect: handleNameSelection
              })} />




        {GetVirtualOutgoingProductDetailData?.products && GetVirtualOutgoingProductDetailData?.products.length > 0
          ?
          (
            <View style={{ flex: 1, marginBottom: windowHeight * 0.08 }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={GetVirtualOutgoingProductDetailData?.products}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )
          :
          (
            <EmptyList
              iconName={'inbox-arrow-down-outline'}
              text={'Ürünlerinizi Ekleyin'}
            />
          )
        }


        <View style={style.buttonContainer}>

          <Button
            color={'white'}
            text={'İptal'}
            backgroundColor={'red'}
            width={windowWidth * 0.4}
            height={windowHeight * 0.04}
            onPress={showAlertBack}
          />

          <Button
            color={'white'}
            text={'Belge Oluştur'}
            backgroundColor={'green'}
            width={windowWidth * 0.4}
            height={windowHeight * 0.04}
            onPress={handleSaveDocument}
          />

        </View>


      </View>

      <PriceArea
        kdv20={GetVirtualOutgoingProductDetailData?.kdvTotal20 != 0 ? true : false}
        kdv18={GetVirtualOutgoingProductDetailData?.kdvTotal18 != 0 ? true : false}
        kdv10={GetVirtualOutgoingProductDetailData?.kdvTotal10 != 0 ? true : false}
        kdv8={GetVirtualOutgoingProductDetailData?.kdvTotal8 != 0 ? true : false}
        kdv1={GetVirtualOutgoingProductDetailData?.kdvTotal1 != 0 ? true : false}
        degerkdv20={GetVirtualOutgoingProductDetailData?.kdvTotal20}
        degerkdv18={GetVirtualOutgoingProductDetailData?.kdvTotal18}
        degerkdv10={GetVirtualOutgoingProductDetailData?.kdvTotal10}
        degerkdv8={GetVirtualOutgoingProductDetailData?.kdvTotal8}
        degerkdv1={GetVirtualOutgoingProductDetailData?.kdvTotal1}

        toplamAdet={GetVirtualOutgoingProductDetailData ? GetVirtualOutgoingProductDetailData.quantityTotal : 0}
        araToplam={GetVirtualOutgoingProductDetailData ? GetVirtualOutgoingProductDetailData?.subTotal : 0}
        kdvToplam={GetVirtualOutgoingProductDetailData ? GetVirtualOutgoingProductDetailData?.taxTotal : 0}
        genelToplam={GetVirtualOutgoingProductDetailData ? GetVirtualOutgoingProductDetailData?.generalTotal : 0} />

      <MyModal
        fiyatValue={fiyatValue}
        setFiyatValue={setFiyatValue}
        isSelected={isSelected}
        setSelection={setSelection}
        kdvValue={kdvValue}
        setKdvValue={setKdvValue}
        FiyatText={'Satış Fiyatı:'}
        deleteIcon={true}
        handlerDelete={showAlertDelete}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleQuantityUpdate={handleQuantityUpdate}
        miktarValue={miktar}
        setMiktarValue={setMiktar}
        item={selectedProduct.product}
      />
    </View>
  );
}
