import { View, Text, TouchableOpacity, BackHandler, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import style from './style'
import { Cart, Header, Bilgi, MyModal, EmptyList, ToastComp, ToastCompSuccess, ToastCompError } from '../../components'
import { useFocusEffect } from '@react-navigation/native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProductFromIncomingProductProcess,
  deleteProductFromOutgoingProductProcess,
  getAllCategoriesProcess,
  getAllDocumentsProcess,
  getIncomingProductDetailProcess,
  getIncomingProductsProcess,
  getOutgoingProductDetailProcess,
  getOutgoingProductsProcess,
  updateIncomingDocProcess,
  updateIncomingDocProductQuantityProcess,
  updateOutgoingDocProcess,
  updateOutgoingDocProductQuantityProcess
} from '../../api';
import { resetAddIncomingProduct } from '../../redux/slice/add-incoming-product-slice';
import { resetAddOutgoingProduct } from '../../redux/slice/add-outgoing-product-slice';
import { resetUpdateOutgoingDoc } from '../../redux/slice/update-outgoing-doc-slice';
import { resetUpdateIncomingDoc } from '../../redux/slice/update-incoming-doc-slice';
import { resetIncomingProductDelete } from '../../redux/slice/delete-product-from-incoming-product-slice';
import { resetOutgoingProductDelete } from '../../redux/slice/delete-product-from-outgoing-product-slice';
import { Loading } from '../../components/Loading';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PriceArea } from '../../components/PriceArea';
import { resetOutgoingProductQuantityUpdate } from '../../redux/slice/update-outgoing-doc-product-quantity-slice';
import { resetIncomingProductQuantityUpdate } from '../../redux/slice/update-incoming-doc-product-quantity-slice';



export const BelgeDetayScreen = () => {


  const route = useRoute();
  const { item, _id, button, okButton } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();


  const { data: IncomingProductsDetailData, isLoading: LoadingIncoming } = useSelector(state => state?.incomingProductdetail);
  const { data: OutgoingProductsDetailData, isLoading: LoadingOutGoing } = useSelector(state => state?.outgoingProductdetail);

  const [showDeleteToastSuccess, setShowDeleteToastSuccess] = useState(false)
  const [showUpdateToastSuccess, setShowUpdateToastSuccess] = useState(false)
  const [showQuantityUpdateToastSuccess, setShowQuantityUpdateToastSuccess] = useState(false)

  const [showDeleteToastError, setShowDeleteToastError] = useState(false)
  const [showUpdateToastError, setShowUpdateToastError] = useState(false)
  const [showQuantityUpdateToastError, setShowQuantityUpdateToastError] = useState(false)


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const [miktar, setMiktar] = useState('')
  const [rowId, setRowId] = useState(null)
  const [docId, setDocId] = useState(_id)
  const [selectedId, setSelectedId] = useState()
  const [tarih, setTarih] = useState('')
  const [documentNo, setDocumentNo] = useState('')
  const [description, setDescription] = useState('')
  const [kdvValue, setKdvValue] = useState('');
  const [fiyatValue, setFiyatValue] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [ozellik, setOzellik] = useState(item?.ozellik);



  console.log(IncomingProductsDetailData?.order?.isim, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Burada istediğiniz geri tuşu işlemlerini yapabilirsiniz
        // Örneğin, bir modal açıksa kapatın veya belirli bir sayfaya yönlendirin
        if (isModalVisible) {
          setIsModalVisible(false);
          return true; // Geri tuşunu tüketin
        } else {
          // Diğer sayfalara yönlendirebilirsiniz
          navigation.goBack();
          return true; // Geri tuşunu tüketin
        }
      };

      // Geri tuşuna basıldığında onBackPress işlevini çağırın
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        // Ekran odak dışı kaldığında olay dinleyicisini kaldırın
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [isModalVisible, navigation])
  );

  const { products: products } = useSelector(state => state?.addIncomingProductWithProducts);

  const { status: UpdateOutgoingDocStatus, message: UpdateOutgoingProductQuantittMessage } = useSelector(state => state.updateOutgoingProductQuantity);
  const { status: UpdateIncomingDocStatus, message: UpdateIncomingProductQuantittMessage } = useSelector(state => state.updateIncomingProductQuantity);
  const { status: DeleteIncomingDocStatus, message: DeleteIncomingDocMessage } = useSelector(state => state.removeProduct);
  const { status: DeleteOutgoingDocStatus, message: DeleteOutgoingDocMessage } = useSelector(state => state.removeOutgoingProduct);

  console.log(UpdateOutgoingProductQuantittMessage, "UpdateOutgoingProductQuantittMessage")

  useEffect(() => {
    setShowUpdateToastSuccess(false)
    setShowUpdateToastError(false)
    setShowDeleteToastSuccess(false)
    setShowDeleteToastError(false)

    if (UpdateOutgoingDocStatus === "success") {
      setShowUpdateToastSuccess(true)
      setTimeout(() => {
        dispatch(resetOutgoingProductQuantityUpdate());

      }, 900)
    } else if (UpdateOutgoingDocStatus === "error") {
      setShowUpdateToastError(true)
      setTimeout(() => {
        dispatch(resetOutgoingProductQuantityUpdate());

      }, 900)

    }

    if (UpdateIncomingDocStatus === "success") {
      setShowUpdateToastSuccess(true)
      setTimeout(() => {
        dispatch(resetIncomingProductQuantityUpdate());
      }, 900)
    } else if (UpdateIncomingDocStatus === "error") {
      setShowUpdateToastError(true)
      setTimeout(() => {
        dispatch(resetIncomingProductQuantityUpdate());
      }, 900)

    }

    if (DeleteIncomingDocStatus === "success") {
      setShowDeleteToastSuccess(true)
      setTimeout(() => { dispatch(resetIncomingProductDelete()); }, 900)

    } else if (DeleteIncomingDocStatus === "error") {
      setShowDeleteToastError(true)

      setTimeout(() => { dispatch(resetIncomingProductDelete()); }, 900)
    }

    if (DeleteOutgoingDocStatus === "success") {
      setShowDeleteToastSuccess(true)
      setTimeout(() => { dispatch(resetOutgoingProductDelete()) }, 900)
    } else if (DeleteOutgoingDocStatus === "error") {
      setShowDeleteToastError(true)
      setTimeout(() => { dispatch(resetOutgoingProductDelete()) }, 900)

    }

  }, [
    UpdateOutgoingDocStatus,
    UpdateIncomingDocStatus,
    DeleteIncomingDocStatus,
    DeleteOutgoingDocStatus
  ])


  console.log(kdvValue, "ne bu kddvvvvvvvvvvvvvvvvv");
  useEffect(() => {
    if (item?.ozellik == 1) {
      console.log(_id, "oPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP")
      dispatch(getIncomingProductDetailProcess({ incomingProductId: _id }))
    } else if (item?.ozellik == 0) {
      dispatch(getOutgoingProductDetailProcess({ outgoingProductId: _id }))
    }




  }, []);

  console.log(IncomingProductsDetailData, "İİİİİİSİİİİİİİİİMMMMMMMMMMMMM");

  useEffect(() => {
    if (item?.ozellik == 1 && IncomingProductsDetailData) {
      setSelectedName(IncomingProductsDetailData?.order?.isim || '');
      setSelectedId(IncomingProductsDetailData?.order?._id || '')

    } if (item?.ozellik == 0) {
      setSelectedName(OutgoingProductsDetailData?.order?.isim || '');
      setSelectedId(OutgoingProductsDetailData?.order?._id || '')

    }
    console.log("İİİİİİSİİİİİİİİİMMMMMMMMMMMMM");

  }, [IncomingProductsDetailData, OutgoingProductsDetailData]);



  const data = item?.ozellik == 1 ? (IncomingProductsDetailData?.products || []) : (OutgoingProductsDetailData?.products || [])



  const handleQuantityUpdate = async () => {


    item?.ozellik == 1 ? await (dispatch(updateIncomingDocProductQuantityProcess({
      productId: rowId,
      productSelfId: selectedProduct?.product?._id,
      quantity: parseInt(miktar),
      kdvPercent: parseInt(kdvValue),
      includeKdv: isSelected,
      productPurchasePrice: fiyatValue,
      incomingProductId: docId,

    }))) : await (dispatch(updateOutgoingDocProductQuantityProcess({
      productId: rowId,
      productSelfId: selectedProduct?.product?._id,
      outgoingProductId: docId,
      quantity: parseInt(miktar),
      kdvPercent: parseInt(kdvValue),
      includeKdv: isSelected,
      productSalesPrice: fiyatValue,
    })))


    if (item?.ozellik == 1) {

      await dispatch(
        getIncomingProductDetailProcess({ incomingProductId: _id })
      );
    } else {
      await dispatch(
        getOutgoingProductDetailProcess({ outgoingProductId: _id })
      );
    }

    setIsModalVisible(false)

  }


  useEffect(() => {
    console.log(IncomingProductsDetailData, "DEĞİŞTİ Mİİİİİİİİİİİİİİİİİİİİİİİ")
    if (ozellik == 1) {
      setTarih(IncomingProductsDetailData?.documentDate || '');
      setDocumentNo((IncomingProductsDetailData?.documentNumber || '').toString());
      setDescription(IncomingProductsDetailData?.description || '');
    }
    if (ozellik == 0) {
      setTarih(OutgoingProductsDetailData?.documentDate || '');
      setDocumentNo((OutgoingProductsDetailData?.documentNumber || '').toString());
      setDescription(OutgoingProductsDetailData?.description || '');
    }

  },

    [OutgoingProductsDetailData, IncomingProductsDetailData]

  );


  console.log(selectedId, "OOOOOOOORRRRRRRDDDDDDDDEEEEEEEEEEERRRRRRRRRRRR");

  const updateDoc = async () => {
    item?.ozellik == 1 ?
      (await dispatch(updateIncomingDocProcess({
        _id: docId,
        documentDate: tarih,
        order: selectedId,
        description: description,

      }))) :

      (await dispatch(updateOutgoingDocProcess({
        _id: docId,
        documentDate: tarih,
        order: selectedId,
        description: description,

      })))

    item?.ozellik == 1 ?
      (
        dispatch(getAllDocumentsProcess()),
        dispatch(getIncomingProductsProcess()),
        navigation.goBack()
      )
      :
      (
        dispatch(getAllDocumentsProcess()),
        dispatch(getOutgoingProductsProcess()),
        navigation.goBack())




  }
  const handleClearName = () => {
    setSelectedName('');
    setSelectedId('')
  };

  const handleNameSelection = (name, id) => {
    setSelectedName(name);
    setSelectedId(id)
  };


  const handlerDelete = async () => {
    item?.ozellik == 1 ? (await dispatch(deleteProductFromIncomingProductProcess({
      incomingProductId: docId,
      productId: rowId,


    }))) : (await dispatch(deleteProductFromOutgoingProductProcess({
      outgoingProductId: docId,
      productId: rowId,


    })))
    item?.ozellik == 1 ?
      (await dispatch(getIncomingProductDetailProcess({ incomingProductId: _id })))
      :
      (await dispatch(getOutgoingProductDetailProcess({ outgoingProductId: _id })))

    setIsModalVisible(false)
  }

  const renderItem = ({ item }) => {
    const { product, quantity, _id } = item;
    console.log(item, "aaaaaaaaaaaaaaaaaaaaaaaaaa");
    return product?.productCode ? (
      <Cart
        listeFiyati={ozellik === 1 ? item?.productPurchasePrice : item?.productSalesPrice}
        imageDefault={!product.productImage}
        image={product.productImage}
        name={product.productName}
        sk={product.productCode}
        adet={quantity}
        onPress={() => {

          setSelectedProduct(item);
          setIsModalVisible(true);
          setRowId(_id);
          setMiktar(quantity.toString())
          setKdvValue(item?.kdvPercent?.toString())
          setFiyatValue(ozellik === 1 ? item?.productPurchasePrice.toString() : item?.productSalesPrice.toString())
          setSelection(item?.includeKDV)

        }}
      />
    ) : null;
  };



  const addProductToDoc = () => {

    navigation.navigate('stok-screen', { page: item?.ozellik == 1 ? 4 : 5, incomingProductId: item?._id, outgoingProductId: item?._id });

  }


  const handleBackPress = async () => {
    await dispatch(resetAddIncomingProduct());
    await dispatch(resetAddOutgoingProduct());
    navigation.goBack();
  };

  console.log(DeleteIncomingDocMessage, "00000000000000000000000000");
  return (
    <View style={style.container}>

      <ToastCompSuccess show={showDeleteToastSuccess} text1={ozellik == 1 ? DeleteIncomingDocMessage : DeleteOutgoingDocMessage} />
      <ToastCompSuccess show={showUpdateToastSuccess} text1={ozellik == 1 ? UpdateIncomingProductQuantittMessage : UpdateOutgoingProductQuantittMessage} />

      <ToastCompError show={showDeleteToastError} text1={ozellik == 1 ? DeleteIncomingDocMessage : DeleteOutgoingDocMessage} />
      <ToastCompError show={showUpdateToastError} text1={ozellik == 1 ? UpdateIncomingProductQuantittMessage : UpdateOutgoingProductQuantittMessage} />


      <Header
        isAddProduct
        onBackPress={handleBackPress}
        first={true}
        firstName={'arrow-left'}
        second={true}
        text={item?.ozellik === 1 ? 'Gelen' : 'Giden'}
        color={'#000E36'}

      />
      <View style={style.innerContainer}>

        {/* {LoadingOutGoing.getOutgoingProductDetailProcess || LoadingIncoming.getIncomingProductDetailProcess ? (
          <Loading />
        ) : null} */}

        {/* Pass the selectedName state and handleNameSelection function to Bilgi */}
        <Bilgi
          handleClearName={handleClearName}
          onCheck={updateDoc}
          editable={button ? false : true}
          check={button ? false : true}
          button={button ? true : false}
          description={description}
          setDescription={setDescription}
          tarih={tarih}
          setTarih={setTarih}
          documentNo={documentNo}
          setDocumentNo={setDocumentNo}
          text={item?.ozellik == 1 ? 'Satıcı' : 'Alıcı'}
          name={selectedName}
          setSelectedName={setSelectedName} // Pass the setSelectedName function as a prop
          onPress={() => navigation.navigate('cariler-screen', { item: item, onSelect: handleNameSelection })}
        />


        <View style={style.listContainer}>
          <View style={style.addAndSaveContainer}>
            {/* <TouchableOpacity onPress={addProductToDoc} style={style.buttonSave} >

              <Icon name={'check'} size={25} color={'white'} style={style.checkIcon} />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={addProductToDoc} style={style.buttonAdd} >

              <Text style={style.buttonText} >+</Text>
            </TouchableOpacity>


          </View >
          {data.length > 0
            ?
            (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={renderItem}
                keyExtractor={(itemm, index) => index.toString()}
              />
            )
            :
            (
              <EmptyList text={'Ürün bulunmuyor'} iconName={'null'} />
            )
          }
        </View>
      </View>

      <PriceArea
        kdv20={IncomingProductsDetailData?.kdvTotal20 || OutgoingProductsDetailData?.kdvTotal20 != 0 ? true : false}
        kdv18={IncomingProductsDetailData?.kdvTotal18 || OutgoingProductsDetailData?.kdvTotal18 != 0 ? true : false}
        kdv10={IncomingProductsDetailData?.kdvTotal10 || OutgoingProductsDetailData?.kdvTotal10 != 0 ? true : false}
        kdv8={IncomingProductsDetailData?.kdvTotal8 || OutgoingProductsDetailData?.kdvTotal8 != 0 ? true : false}
        kdv1={IncomingProductsDetailData?.kdvTotal1 || OutgoingProductsDetailData?.kdvTotal1 != 0 ? true : false}
        degerkdv20={ozellik == 1 ? IncomingProductsDetailData?.kdvTotal20 : OutgoingProductsDetailData?.kdvTotal20}
        degerkdv18={ozellik == 1 ? IncomingProductsDetailData?.kdvTotal18 : OutgoingProductsDetailData?.kdvTotal18}
        degerkdv10={ozellik == 1 ? IncomingProductsDetailData?.kdvTotal10 : OutgoingProductsDetailData?.kdvTotal10}
        degerkdv8={ozellik == 1 ? IncomingProductsDetailData?.kdvTotal8 : OutgoingProductsDetailData?.kdvTotal8}
        degerkdv1={ozellik == 1 ? IncomingProductsDetailData?.kdvTotal1 : OutgoingProductsDetailData?.kdvTotal1}

        toplamAdet={ozellik == 1 ? IncomingProductsDetailData?.quantityTotal : OutgoingProductsDetailData?.quantityTotal}
        araToplam={ozellik == 1 ? IncomingProductsDetailData?.subTotal : OutgoingProductsDetailData?.subTotal}
        // kdv={ozellik == 1 ? IncomingProductsDetailData?.kdvTotal20 : OutgoingProductsDetailData?.kdvTotal20}
        kdvToplam={ozellik == 1 ? IncomingProductsDetailData?.taxTotal : OutgoingProductsDetailData?.taxTotal}
        genelToplam={ozellik == 1 ? IncomingProductsDetailData?.generalTotal : OutgoingProductsDetailData?.generalTotal} />

      {/* Modal */}
      {selectedProduct && (
        <MyModal
          fiyatValue={fiyatValue}
          setFiyatValue={setFiyatValue}
          isSelected={isSelected}
          setSelection={setSelection}
          kdvValue={kdvValue}
          setKdvValue={setKdvValue}
          FiyatText={item?.ozellik == 1 ? "Alış Fiyatı:" : "Satış Fiyatı:"}
          handleQuantityUpdate={handleQuantityUpdate}
          item={selectedProduct.product}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          setMiktarValue={setMiktar}
          miktarValue={miktar}
          handlerDelete={handlerDelete}
          deleteIcon={okButton ? false : true}
          okButton={okButton ? true : false}
          miktarEditable={okButton ? false : true}
          fiyatEditable={okButton ? false : true}
        />
      )}
    </View>
  );
};
