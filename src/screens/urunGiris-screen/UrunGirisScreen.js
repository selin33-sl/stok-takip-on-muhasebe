import { View, FlatList, BackHandler, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import style from './style';
import { Bilgi, Button, Cart, EmptyList, Header, MyModal, ToastCompError, ToastCompSuccess } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addIncomingProductWithProductsProcess, getIncomingProductDetailProcess, getNextDocumentNumberProcess, updateIncomingDocProcess } from '../../api';
import { resetAddIncomingProduct } from '../../redux/slice/add-incoming-product-slice';
import { resetIncomingProductDetail } from '../../redux/slice/get-incoming-product-detail-slice';
import { resetAddIncomingProductToIncomingProduct } from '../../redux/slice/add-incoming-product-to-incoming-product-slice';
import { resetIncomingProductQuantityUpdate } from '../../redux/slice/update-incoming-doc-product-quantity-slice';
import { removeProduct, resetProducts, updateProduct } from '../../redux/slice/local-products-slice';
import { resetAddIncomingProductWithProducts } from '../../redux/slice/add-incoming-product-with-products-slice';
import { PriceArea } from '../../components/PriceArea';
import { windowHeight, windowWidth } from '.';


export const UrunGirisScreen = () => {

    const date = new Date().toISOString().split("T")[0];

    const [showCreateToastError, setShowCreateToastError] = useState(false);

    const [showUpdateeToastSuccess, setShowUpdateeToastSuccess] = useState(false);
    const [showAddToastSuccess, setShowAddToastSuccess] = useState(false);
    const [showAddToastError, setShowAddToastError] = useState(false);

    const [showUpdateeToastError, setShowUpdateeToastError] = useState(false);


    const [miktar, setMiktar] = useState();
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedName, setSelectedName] = useState(null);
    const [selectedId, setSelectedId] = useState('');
    const [description, setDescription] = useState('');
    const [documentDate, setDocumentDate] = useState(date);
    const [productId, setProductId] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [kdvValue, setKdvValue] = useState(false);
    const [fiyatValue, setFiyatValue] = useState("");
    const [isSelected, setSelection] = useState(false);



    const { status: addIncomingProductStatuss } = useSelector((state) => state.addIncomingProduct);
    const { status: UpdateIncomingProductStatuss } = useSelector((state) => state.updateIncomingProductQuantity);
    const { status: addIncomingProductStatus } = useSelector((state) => state.addProductToIncomingProduct);
    const { status: AddIncomingProductWithProductsStatus } = useSelector(state => state?.addIncomingProductWithProducts);
    const navigation = useNavigation();
    const dispatch = useDispatch();


    useEffect(() => {

        if (AddIncomingProductWithProductsStatus === "error") {
            setShowCreateToastError(true);
            dispatch(resetAddIncomingProductWithProducts());
        }

        if (addIncomingProductStatus === "success") {
            setShowAddToastSuccess(true);
            dispatch(resetAddIncomingProductToIncomingProduct());
        } else if (addIncomingProductStatus === "error") {
            setShowAddToastError(true);
            dispatch(resetAddIncomingProductToIncomingProduct());
        }

        if (UpdateIncomingProductStatuss === "success") {
            setShowUpdateeToastSuccess(true);
            dispatch(resetIncomingProductQuantityUpdate());
        } else if (UpdateIncomingProductStatuss === "error") {
            setShowUpdateeToastError(true);
            dispatch(resetIncomingProductQuantityUpdate());
        }

    }, [UpdateIncomingProductStatuss, addIncomingProductStatuss, AddIncomingProductWithProductsStatus]);



    const { status, data } = useSelector(state => state.addIncomingProduct);
    const { data: IncomingProductsDetailData } = useSelector(state => state?.incomingProductdetail);
    const { data: DocumentNumberData } = useSelector(state => state?.getNextDocumentNumber);
    const { products: products } = useSelector(state => state?.localProducts);
    const { isLoading, data: AllProductData } = useSelector(state => state.getAllProducts);

    console.log(IncomingProductsDetailData, "DDDDDDDDDDDDDDDDDDDDD");

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (isModalVisible) {
                    setIsModalVisible(false);
                    return true; // Geri tuşunu tüketin
                } else {
                    // Diğer sayfalara yönlendirebilirsiniz
                    if (products && products.length > 0) {
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
        products && products.length > 0 ? (
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
        ) : handleBackPress();



    };



    const handleBackPress = () => {
        dispatch(resetProducts());
        navigation.goBack();
    };


    const updateDoc = async () => {

        await dispatch(updateIncomingDocProcess({
            _id: data?._id,
            documentDate: documentDate,
            order: selectedId,
            description: description,
        }));

        await dispatch(resetAddIncomingProduct());

        navigation.goBack();

    };




    useEffect(() => {
        dispatch(getNextDocumentNumberProcess());
        dispatch(resetIncomingProductDetail());

        dispatch(getIncomingProductDetailProcess({ incomingProductId: data?._id }));


    }, []);



    const handlePressStokScreen = () => {
        navigation.navigate('stok-screen', { page: 2, incomingProductId: data?._id });
    };

    const handleNameSelection = (name, id) => {
        setSelectedName(name);
        setSelectedId(id);
    };



    //BURADA ARTIK addIncomingProductWithProductsProcess KULLANILACAK !!!!
    const handleSaveDocument = async () => {

        {
            products && products.length ? (
                await dispatch(addIncomingProductWithProductsProcess({
                    documentDate: documentDate,
                    description: description,
                    products: products,
                    order: selectedId,
                })),

                navigation.goBack(),
                await dispatch(resetProducts())
            ) : (console.log("LİSTE BOOOOOOOOOŞŞŞŞŞŞŞŞŞŞŞŞŞŞŞŞŞ"));
        }



        // dispatch(
        //   addIncomingProductProcess({
        //     order: selectedId,
        //     description: description,
        //     documentDate: documentDate
        //   }),
        // );
    };


    const renderItem = ({ item }) => {

        return (
            <Cart
                imageDefault={!item.imageDefault}
                image={item?.image}
                name={item?.productName}
                sk={item?.productCode}
                adet={item?.quantity}
                onPress={() => {
                    setSelectedProduct(item);
                    setProductId(item?.productId);
                    setIsModalVisible(true);
                    setMiktar(item?.quantity.toString());
                    setFiyatValue(item?.productPurchasePrice);
                    setSelection(item?.includeKdv);
                    setKdvValue(item?.kdvPercent);

                }} />
        );
    };

    const handlerDelete = async () => {
        await dispatch(removeProduct(productId));
        setIsModalVisible(false);
    };

    const handleQuantityUpdate = async () => {



        await dispatch(updateProduct({
            productId: productId,
            newQuantity: miktar
        }));


        setIsModalVisible(false);


    };



    return (
        <View style={style.container}>
            <ToastCompSuccess show={showUpdateeToastSuccess} text1={'Miktar Güncellendi'} text2={'Ürün miktarı başarıyla güncellendi.'} />
            <ToastCompSuccess show={showAddToastSuccess} text1={'Ürün Eklendi'} text2={'Ürün belgeye başarıyla eklendi.'} />
            <ToastCompError show={showAddToastError} text1={'Ürün Eklenemedi'} text2={'Ürün belgeye eklenemedi.'} />
            <ToastCompError show={showCreateToastError} text1={'Belgede ürün bulunamadı.'} />

            <ToastCompError show={showUpdateeToastError} text1={'Miktar Güncellenemedi'} text2={'Ürün miktarı güncellenemedi.'} />

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
                onPress={handlePressStokScreen} />

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
                    onPress={() => navigation.navigate('cariler-screen', {
                        typee: 'Gelen',
                        onSelect: handleNameSelection,
                    })} />


                {products && products.length > 0
                    ?
                    (
                        <View style={{ flex: 1, marginBottom: windowHeight * 0.08 }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={products}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()} />
                        </View>
                    )
                    :
                    (
                        <EmptyList
                            iconName={'inbox-arrow-down-outline'}
                            text={'Ürünlerinizi Ekleyin'} />
                    )}


                <View style={style.buttonContainer}>

                    <Button
                        color={'white'}
                        text={'İptal'}
                        backgroundColor={'red'}
                        width={windowWidth * 0.4}
                        height={windowHeight * 0.04}
                        onPress={handleBackPress} />

                    <Button
                        color={'white'}
                        text={'Belge Oluştur'}
                        backgroundColor={'green'}
                        width={windowWidth * 0.4}
                        height={windowHeight * 0.04}
                        onPress={handleSaveDocument} />


                </View>
            </View>


            <PriceArea
                toplamAdet={IncomingProductsDetailData?.quantityTotal}
                araToplam={IncomingProductsDetailData?.subTotal}
                kdv={IncomingProductsDetailData?.kdvTotal20}
                kdvToplam={IncomingProductsDetailData?.taxTotal}
                genelToplam={IncomingProductsDetailData?.generalTotal} />


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
                item={selectedProduct} />
        </View>
    );
};
