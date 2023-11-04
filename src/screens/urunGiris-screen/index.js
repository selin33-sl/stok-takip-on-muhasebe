import { View, Dimensions, FlatList, BackHandler, Alert } from 'react-native';
import React, { useEffect, useState, } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import style from './style';
import { Bilgi, Button, Cart, EmptyList, Header, MyModal, ToastComp, ToastCompError, ToastCompSuccess } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addIncomingProductProcess, addIncomingProductWithProductsProcess, deleteProductFromIncomingVirtualDocProcess, deleteVirtualIncomingDocProcess, getIncomingProductDetailProcess, getNextDocumentNumberProcess, getVirtualIncomingProductDetailProcess, updateIncomingDocProcess, updateIncomingVirtualDocProductsProcess, updateVirtualDocProductsProcess, } from '../../api';
import { resetAddIncomingProduct } from '../../redux/slice/add-incoming-product-slice';
import { resetIncomingProductDetail } from '../../redux/slice/get-incoming-product-detail-slice';
import { resetAddIncomingProductToIncomingProduct } from '../../redux/slice/add-incoming-product-to-incoming-product-slice';
import { resetIncomingProductQuantityUpdate } from '../../redux/slice/update-incoming-doc-product-quantity-slice';
import { removeProduct, resetProducts, updateProduct } from '../../redux/slice/local-products-slice';
import { resetAddIncomingProductWithProducts } from '../../redux/slice/add-incoming-product-with-products-slice';
import { PriceArea } from '../../components/PriceArea';
import { resetUpdateIncomingVirtualDocProducts } from '../../redux/slice/update-incoming-virtual-doc-products-slice';
import { resetAddIncomingProductToVirtualDoc } from '../../redux/slice/add-product-to-incoming-virtual-doc-slice';
import { resetGetVirtualIncomingProductDetail } from '../../redux/slice/get-virtual-incoming-product-detail-process-slice';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const UrunGirisScreen = () => {

  const date = new Date().toISOString().split("T")[0];

  const [showCreateToastError, setShowCreateToastError] = useState(false)

  const [showUpdateeToastSuccess, setShowUpdateeToastSuccess] = useState(false)
  const [showAddToastSuccess, setShowAddToastSuccess] = useState(false)
  const [showAddToastError, setShowAddToastError] = useState(false)

  const [showUpdateeToastError, setShowUpdateeToastError] = useState(false)


  const [miktar, setMiktar] = useState()
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedName, setSelectedName] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [description, setDescription] = useState('')
  const [documentDate, setDocumentDate] = useState(date)
  const [productId, setProductId] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [kdvValue, setKdvValue] = useState(false);
  const [fiyatValue, setFiyatValue] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [rowId, setRowId] = useState("");



  const { status: deleteVirtualIncomingDocStatuss } = useSelector((state) => state.deleteVirtualIncomingDoc);
  const { status: UpdateIncomingProductStatuss, message: UpdateIncomingProductMessage } = useSelector((state) => state.updateIncomingVirtualDocProducts);
  // const { status: addIncomingProductStatus } = useSelector((state) => state.addProductToIncomingProduct);
  const { status: AddIncomingProductWithProductsStatus, message: AddOutgoingProductWithProductsStatusMesssage } = useSelector(state => state?.addIncomingProductWithProducts);
  const { status: AddProductToIncomingVirtualDocStatus, message: AddProductToIncomingVirtualDocMessage } = useSelector(state => state.addProductToIncomingVirtualDoc);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log(AddProductToIncomingVirtualDocMessage, "AddProductToIncomingVirtualDocMessage")

  useEffect(() => {

    setShowCreateToastError(false)
    setShowAddToastError(false)
    setShowAddToastSuccess(false)
    setShowUpdateeToastSuccess(false)
    setShowUpdateeToastError(false)

    if (AddIncomingProductWithProductsStatus === "error") {
      setShowCreateToastError(true)
      setTimeout(() => {
        dispatch(resetAddIncomingProductWithProducts());

      }, 900);

    }

    if (AddProductToIncomingVirtualDocStatus === "success") {
      setShowAddToastSuccess(true)
      setTimeout(() => {
        dispatch(resetAddIncomingProductToVirtualDoc());

      }, 900);

    } else if (AddProductToIncomingVirtualDocStatus === "error") {
      setFiyatValue("")
      setMiktar()
      setKdvValue("20")
      setShowAddToastError(true)
      setTimeout(() => {
        dispatch(resetAddIncomingProductToVirtualDoc());

      }, 900);
    }

    // if (addProductToIncomingVirtualDocStatus === "success") {
    //   setShowAddToastSuccess(true)
    //   dispatch(resetAddIncomingProductToVirtualDoc());
    // } else if (addProductToIncomingVirtualDocStatus === "error") {
    //   setShowAddToastError(true)
    //   dispatch(resetAddIncomingProductToVirtualDoc());
    // }

    if (UpdateIncomingProductStatuss === "success") {
      setShowUpdateeToastSuccess(true)
      setTimeout(() => {
        dispatch(resetUpdateIncomingVirtualDocProducts());
      }, 900);
    } else if (UpdateIncomingProductStatuss === "error") {
      setShowUpdateeToastError(true)
      setTimeout(() => {
        dispatch(resetUpdateIncomingVirtualDocProducts());
      }, 900);
    }

  }, [UpdateIncomingProductStatuss, AddIncomingProductWithProductsStatus, AddProductToIncomingVirtualDocStatus])



  const { data: GetVirtualIncomingProductDetailData } = useSelector(state => state?.virtualIncomingProductDetail);
  const { data: AddVirtualIncomingDocData } = useSelector(state => state?.addVirtualIncomingDoc);
  const { status, data } = useSelector(state => state.addIncomingProduct);
  const { data: IncomingProductsDetailData } = useSelector(state => state?.incomingProductdetail);
  const { data: DocumentNumberData } = useSelector(state => state?.getNextDocumentNumber);
  const { products: products } = useSelector(state => state?.localProducts);
  const { isLoading, data: AllProductData } = useSelector(state => state.getAllProducts);

  console.log(AddVirtualIncomingDocData, "DDDDDDDDDDDDDDDDDDDDD");
  console.log(GetVirtualIncomingProductDetailData?.products, "BBBBBBBBBBBBBBBBBBBBBB");

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isModalVisible) {
          setIsModalVisible(false);
          return true; // Geri tuşunu tüketin
        } else {
          // Diğer sayfalara yönlendirebilirsiniz
          if (GetVirtualIncomingProductDetailData?.products && GetVirtualIncomingProductDetailData?.products.length > 0) {
            showAlertBack();
          } else {
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
    console.log(GetVirtualIncomingProductDetailData?.products, "BBBBBBBBBBBBBBBBBBBBBB222222222222");

    GetVirtualIncomingProductDetailData?.products && GetVirtualIncomingProductDetailData?.products.length > 0 ? (
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

  const handlerDelete = async () => {

    console.log(AddVirtualIncomingDocData._id, "IIIIIIIIIIDDDDDDDDDDDD");
    console.log(productId, "PPPPROOODDIIIIIIIIIIIIDDDDDDDDD");
    await dispatch(deleteProductFromIncomingVirtualDocProcess({
      virtualDocId: AddVirtualIncomingDocData._id,
      productId: rowId,
    }))
    setIsModalVisible(false)

    dispatch(getVirtualIncomingProductDetailProcess({ virtualDocId: AddVirtualIncomingDocData?._id, }))


  }

  console.log(AddVirtualIncomingDocData?._id, "ŞŞŞŞŞŞŞŞŞŞŞŞŞŞŞŞŞŞŞŞŞŞŞŞŞŞŞŞŞ");

  useEffect(() => {
    if (deleteVirtualIncomingDocStatuss === "success") {
      dispatch(resetGetVirtualIncomingProductDetail());
      dispatch(resetDeleteVirtualIncomingDoc());
      dispatch(resetVirtualIncomingDoc())
    }

  }, [deleteVirtualIncomingDocStatuss,]);


  const handleBackPress = async () => {
    console.log("TETİKLENFDDDİİİİİİİİİİİİİİİİ");
    await dispatch(deleteVirtualIncomingDocProcess({ virtualDocId: AddVirtualIncomingDocData?._id }))
    navigation.goBack();
  };


  const updateDoc = async () => {

    await dispatch(updateIncomingDocProcess({
      _id: data?._id,
      documentDate: documentDate,
      order: selectedId,
      description: description,

    }))

    await dispatch(resetAddIncomingProduct());

    navigation.goBack();

  }



  useEffect(() => {
    dispatch(getNextDocumentNumberProcess())
    dispatch(resetIncomingProductDetail())

    dispatch(getIncomingProductDetailProcess({ incomingProductId: data?._id }))


  }, []);

  useEffect(() => {
    dispatch(getVirtualIncomingProductDetailProcess({ virtualDocId: AddVirtualIncomingDocData?._id, }))
  }, [AddVirtualIncomingDocData])





  const handlePressStokScreen = () => {
    navigation.navigate('stok-screen', { page: 2, incomingProductId: AddVirtualIncomingDocData._id, });
  };



  const handleNameSelection = (name, id) => {
    setSelectedName(name);
    setSelectedId(id)
  };




  //BURADA ARTIK addIncomingProductWithProductsProcess KULLANILACAK !!!!

  const handleSaveDocument = async () => {


    await dispatch(addIncomingProductWithProductsProcess({
      virtualDocId: AddVirtualIncomingDocData?._id,
      documentDate: documentDate,
      description: description,
      order: selectedId,


    })),

      navigation.goBack(),
      await dispatch(resetAddIncomingProductWithProducts())




    // dispatch(
    //   addIncomingProductProcess({
    //     order: selectedId,
    //     description: description,
    //     documentDate: documentDate
    //   }),
    // );


  };

  console.log(fiyatValue, "FİİİİİİİİİİİİİYYYYYYYAAAAAAATTTTTTTTTTTT");

  const renderItem = ({ item }) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log(item, "İTTTEEEMMMMMMMMMMMMMMMMMMM");


    return (
      <Cart
        listeFiyati={item?.productPurchasePrice}
        imageDefault={!item?.product?.productImage}
        image={item?.product?.productImage}
        name={item?.product?.productName}
        sk={item?.product?.productCode}
        adet={item?.quantity}
        onPress={() => {
          setRowId(item?._id)
          setSelectedProduct(item)
          setProductId(item?.product?._id)
          setIsModalVisible(true)
          setMiktar(item?.quantity.toString())
          setFiyatValue(item?.productPurchasePrice.toString())
          setSelection(item?.includeKDV)
          setKdvValue(item?.kdvPercent.toString())

        }

        }
      />
    )
  };

  const handleQuantityUpdate = async () => {

    await dispatch(updateIncomingVirtualDocProductsProcess({
      virtualDocId: AddVirtualIncomingDocData?._id,
      productPurchasePrice: fiyatValue,
      kdvPercent: kdvValue,
      includeKdv: isSelected,
      productSelfId: productId,
      productId: rowId,
      quantity: miktar
    }))

    setIsModalVisible(false);
    dispatch(getVirtualIncomingProductDetailProcess({ virtualDocId: AddVirtualIncomingDocData?._id, }))

  };

  console.log(selectedProduct, "SSSSSSSSSSSSEEEEEEEEEEEEEELLLLLLLLLLLLLLLLLLLLLLLL");
  console.log(UpdateIncomingProductMessage, "UpdateIncomingProductMessage")

  return (
    <View style={style.container}>

      <ToastCompSuccess show={showUpdateeToastSuccess} text1={UpdateIncomingProductMessage} />

      <ToastCompSuccess show={showAddToastSuccess} text1={AddProductToIncomingVirtualDocMessage} />
      <ToastCompError show={showAddToastError} text2={AddProductToIncomingVirtualDocMessage} />
      <ToastCompError show={showCreateToastError} text1={AddOutgoingProductWithProductsStatusMesssage} />

      <ToastCompError show={showUpdateeToastError} text1={UpdateIncomingProductMessage} />

      <Header
        isAddProduct
        first={true}
        second={true}
        text={'Ürün Girişi'}
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
          documentNo={DocumentNumberData}
          description={description}
          setDescription={setDescription}
          tarih={documentDate}
          setTarih={setDocumentDate}
          text={'Satıcı'}
          name={selectedName}
          setSelectedName={handleNameSelection}
          onPress={() =>
            navigation.navigate('cariler-screen', {
              typee: 'Gelen',
              onSelect: handleNameSelection,

            })
          }
        />


        {GetVirtualIncomingProductDetailData?.products && GetVirtualIncomingProductDetailData?.products.length > 0
          ?
          (
            <View style={{ flex: 1, marginBottom: windowHeight * 0.08 }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={GetVirtualIncomingProductDetailData?.products}
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
        kdv20={GetVirtualIncomingProductDetailData?.kdvTotal20 != 0 ? true : false}
        kdv18={GetVirtualIncomingProductDetailData?.kdvTotal18 != 0 ? true : false}
        kdv10={GetVirtualIncomingProductDetailData?.kdvTotal10 != 0 ? true : false}
        kdv8={GetVirtualIncomingProductDetailData?.kdvTotal8 != 0 ? true : false}
        kdv1={GetVirtualIncomingProductDetailData?.kdvTotal1 != 0 ? true : false}
        degerkdv20={GetVirtualIncomingProductDetailData?.kdvTotal20}
        degerkdv18={GetVirtualIncomingProductDetailData?.kdvTotal18}
        degerkdv10={GetVirtualIncomingProductDetailData?.kdvTotal10}
        degerkdv8={GetVirtualIncomingProductDetailData?.kdvTotal8}
        degerkdv1={GetVirtualIncomingProductDetailData?.kdvTotal1}

        toplamAdet={GetVirtualIncomingProductDetailData ? GetVirtualIncomingProductDetailData.quantityTotal : 0}
        araToplam={GetVirtualIncomingProductDetailData ? GetVirtualIncomingProductDetailData?.subTotal : 0}
        kdvToplam={GetVirtualIncomingProductDetailData ? GetVirtualIncomingProductDetailData?.taxTotal : 0}
        genelToplam={GetVirtualIncomingProductDetailData ? GetVirtualIncomingProductDetailData?.generalTotal : 0} />


      <MyModal
        fiyatValue={fiyatValue}
        setFiyatValue={setFiyatValue}
        isSelected={isSelected}
        setSelection={setSelection}
        kdvValue={kdvValue}
        setKdvValue={setKdvValue}
        FiyatText={'Alış Fiyatı:'}
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
};