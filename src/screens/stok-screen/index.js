import { View, FlatList, BackHandler, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Cart, Header, MyModal, SearchBar, ToastCompError, ToastCompSuccess } from '../../components';
import style from './style';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {
  addIncomingProductToIncomingProductProcess,
  addIncomingProductToOutgoingProductProcess,
  addIncomingProductToVirtualDocProcess,
  addNewCategoryProcess,
  addProductToIncomingVirtualDocProcess,
  addProductToOutgoingVirtualDocProcess,
  getAllCategoriesProcess,
  getAllProductsProcess,
  getIncomingProductDetailProcess,
  getOutgoingProductDetailProcess,
  getProductsByCategoryProcess,
  getVirtualIncomingProductDetailProcess,
  getVirtualOutgoingProductDetailProcess,
} from '../../api';
import { resetAddIncomingProductToOutgoingProduct } from '../../redux/slice/add-incoming-product-to-outgoing-product-slice';
import { resetAddProduct } from '../../redux/slice/add-new-product-slice';
import { resetAddIncomingProductToIncomingProduct } from '../../redux/slice/add-incoming-product-to-incoming-product-slice';
import { Loading } from '../../components/Loading';
import { Categories } from '../../components/Categories';
import { resetAddCategory } from '../../redux/slice/add-new-category-slice';
import { addProduct } from '../../redux/slice/local-products-slice';
import { PriceArea } from '../../components/PriceArea';
import Modal from 'react-native-modal';
import { resetAddIncomingProductToVirtualDoc } from '../../redux/slice/add-product-to-incoming-virtual-doc-slice';
import { resetAddProductToOutgoingVirtualDoc } from '../../redux/slice/add-product-to-outgoing-virtual-doc-slice';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const StokScreen = () => {


  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { params: { page = 1, incomingProductId, outgoingProductId, } = {} } = useRoute();

  const [showAddToastSuccess, setShowAddToastSuccess] = useState(false)
  const [showAddToastError, setShowAddToastError] = useState(false)
  const [showAddProductToastSuccess, setAddProductToastSuccess] = useState(false)
  const [showAddCategoryToastSuccess, setShowAddCategoryToastSuccess] = useState(false)
  const [showAddCategoryToastError, setShowAddCategoryToastError] = useState(false)

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [productId, setProductId] = useState('')
  const [filteredData, setFilteredData] = useState([]);
  const [miktar, setMiktar] = useState()
  const [category, setCategory] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [productsToAdd2, setProductsToAdd2] = useState([])
  const [kdvValue, setKdvValue] = useState("20");
  const [fiyatValue, setFiyatValue] = useState("");
  const [isSelected, setSelection] = useState(false);

  const [category1, setCategory1] = useState([])
  const [all, setAll] = useState(true)

  console.log("STOKKKKKKKKKKKKKK SCREEEEENNNNNNNNNNNNNNNNNNNNNN");
  console.log(kdvValue, "KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK11111");
  console.log(isSelected, "SELECTEDDDDDDDDDDDDD");

  const [isModalVisible2, setModalVisible2] = useState(false);
  const [modalHeight, setModalHeight] = useState(10); // Modalın başlangıç yüksekliği

  const toggleModal = () => {
    if (isModalVisible2) {
      // Modal kapanırken yüksekliği sıfırla
      setModalHeight(10);
    }
    setModalVisible2(!isModalVisible2);
  };

  const expandModal = () => {
    // Modalı açarken yüksekliği artır
    setModalHeight(200); // İstediğiniz yüksekliği ayarlayabilirsiniz
    toggleModal();
  };



  const { products: products } = useSelector(state => state?.localProducts);

  console.log(products, "GGGGGGGGGGGGGGGGGGGGGGGGGGG")

  const { isLoading, data: AllProductData } = useSelector(state => state.getAllProducts);
  const { data: AllCategoriesData } = useSelector(state => state.getCategories);
  const { data: ProductsByCategoryData } = useSelector(state => state.getProductsByCategory);
  const { status: AddProductToIncomingVirtualDocStatus, message: addProductToIncomingVirtualDocMessage } = useSelector(state => state.addProductToIncomingVirtualDoc);
  const { status: AddProductToOutgoingVirtualDocStatus } = useSelector(state => state.addProductToOutgoingVirtualDoc);
  const { status: AddProductToIncomingProductStatus } = useSelector(state => state.addProductToIncomingProduct);
  const { status: AddProductToOutgoingProductStatus } = useSelector(state => state.addProductToOutgoingProduct);

  console.log(AddProductToOutgoingVirtualDocStatus, "AddProductToOutgoingVirtualDocStatus");

  const productData = categoryId ? ProductsByCategoryData : AllProductData;

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);


  console.log(AddProductToIncomingProductStatus, "AddProductToIncomingProductStatus");
  console.log(AddProductToOutgoingProductStatus, "AddProductToOutgoingProductStatus");


  useEffect(() => {

    if (AddProductToIncomingVirtualDocStatus == 'success') {
      navigation.goBack()
      setTimeout(() => {
        dispatch(resetAddIncomingProductToVirtualDoc())

      }, 900);
    }



    if (AddProductToOutgoingVirtualDocStatus == 'success') {
      navigation.goBack()
      setTimeout(() => {
        dispatch(resetAddProductToOutgoingVirtualDoc())


      }, 900);

    }



    if (AddProductToIncomingProductStatus == 'success') {
      navigation.goBack()
      setTimeout(() => {
        dispatch(resetAddIncomingProductToIncomingProduct())


      }, 900);


    } else if (AddProductToIncomingVirtualDocStatus == 'error') {


    }


    if (AddProductToOutgoingProductStatus == 'success') {
      navigation.goBack()
      dispatch(resetAddIncomingProductToOutgoingProduct())

    } else if (AddProductToIncomingVirtualDocStatus == 'error') {

      // dispatch(resetAddIncomingProductToOutgoingProduct())
    }

  }, [AddProductToIncomingVirtualDocStatus, AddProductToOutgoingVirtualDocStatus, AddProductToIncomingProductStatus, AddProductToOutgoingProductStatus])



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
  console.log(categoryId, "11111111111categorrrryyyyiddddddddddddddd")

  useEffect(() => {
    console.log(categoryId, "22222222222categorrrryyyyiddddddddddddddd")
    dispatch(getProductsByCategoryProcess({
      categoryId: categoryId
    }))
  }, [categoryId])


  useEffect(() => {

    dispatch(getAllProductsProcess());
    dispatch(getAllCategoriesProcess())

  }, []);


  const handleSearch = (query) => {
    setSearchQuery(query);

    const filteredProducts = AllProductData.filter((item) =>
      item.productName.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredData(filteredProducts);
  };


  console.log(incomingProductId, "PPPPPPPPPPPPPPPPPPPPPPPPPP");

  const handleQuantityUpdate = async () => {
    dispatch(resetAddIncomingProductToOutgoingProduct());
    setProductsToAdd2("aaaaaaaaaaaaaaaa");

    if (isModalVisible) {
      if (page === 2) {

        await dispatch(
          addProductToIncomingVirtualDocProcess({
            virtualDocId: incomingProductId,
            kdvPercent: parseInt(kdvValue),
            includeKdv: isSelected,
            productPurchasePrice: parseFloat(fiyatValue),
            productId: productId,
            productQuantity: parseInt(miktar),
          })
        );

        setFiyatValue("")
        setMiktar()
        setKdvValue("20")
      }

      if (page === 3) {

        await dispatch(
          addProductToOutgoingVirtualDocProcess({
            virtualDocId: outgoingProductId,
            kdvPercent: parseInt(kdvValue),
            includeKdv: isSelected,
            productSalesPrice: parseFloat(fiyatValue),
            productId: productId,
            productQuantity: parseInt(miktar),
          })
        );
        setFiyatValue("")
        setMiktar()
        setKdvValue("20")

      }

      if (page === 4) {
        await dispatch(
          addIncomingProductToIncomingProductProcess({

            kdvPercent: parseInt(kdvValue),
            includeKdv: isSelected,
            productPurchasePrice: parseFloat(fiyatValue),
            incomingProductId: incomingProductId,
            productId: productId,
            productQuantity: miktar,
          })
        );



      }
      if (page === 5) {
        console.log(outgoingProductId, "outgoingProductId");
        console.log(productId, "productId");
        console.log(miktar, "miktar");
        await dispatch(
          addIncomingProductToOutgoingProductProcess({
            kdvPercent: parseInt(kdvValue),
            productSalesPrice: parseFloat(fiyatValue),
            includeKdv: isSelected,
            outgoingProductId: outgoingProductId,
            productId: productId,
            productQuantity: miktar,
          })
        );


      }



    }

    setIsModalVisible(false);
    // await navigation.goBack()

    page === 2 ?
      (await dispatch(getVirtualIncomingProductDetailProcess({ virtualDocId: incomingProductId, }))) :
      page === 3 ?
        (await dispatch(getVirtualOutgoingProductDetailProcess({ virtualDocId: outgoingProductId, }))) :
        page === 4 ?
          (await dispatch(getIncomingProductDetailProcess({ incomingProductId: incomingProductId })))
          : page === 5 ?
            (await dispatch(getOutgoingProductDetailProcess({ outgoingProductId: outgoingProductId }))) : null


  };

  // useEffect(() => {
  //   if (productsToAdd2) {

  //     console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
  //     console.log(productsToAdd2, "üüüüüüüüüüüüüüüüü");


  //   }

  // }, [productsToAdd2]);


  const { status: addProductStatus, message: MEssage } = useSelector((state) => state.addNewProduct);
  const { status: addIncomingProductStatus } = useSelector((state) => state.addProductToIncomingProduct);
  const { status: addOutgoingProductStatus } = useSelector((state) => state.addProductToOutgoingProduct);
  const { message: AddNewCategoryMessage, status: AddNewCategoryStatus } = useSelector(state => state.newCategory);




  useEffect(() => {
    setAddProductToastSuccess(false)
    setShowAddToastSuccess(false)
    setShowAddCategoryToastSuccess(false);

    if (addProductStatus === "success") {
      setAddProductToastSuccess(true)
      dispatch(resetAddProduct());
    }


    if (addIncomingProductStatus === "success") {
      setShowAddToastSuccess(true)
      dispatch(resetAddIncomingProductToIncomingProduct());
    } else if (addIncomingProductStatus === "error") {
      setShowAddToastError(true)
      dispatch(resetAddIncomingProductToIncomingProduct());
    }

    if (addOutgoingProductStatus === "success") {
      setShowAddToastSuccess(true)
      dispatch(resetAddIncomingProductToOutgoingProduct());
    } else if (addOutgoingProductStatus === "error") {
      setShowAddToastError(true)
      dispatch(resetAddIncomingProductToOutgoingProduct());
    }

    if (AddNewCategoryStatus === "success") {
      setShowAddCategoryToastSuccess(true);
      dispatch(resetAddCategory());


    } else if (AddNewCategoryStatus === "error") {
      setShowAddCategoryToastError(true);
      dispatch(resetAddCategory());

    }

  }, [addProductStatus, addIncomingProductStatus, addOutgoingProductStatus, AddNewCategoryStatus])




  const renderItem = ({ item }) => {
    return (
      <Cart
        red={item.productQuantity == 0 ? true : false}
        listeFiyati={item.productListPrice}
        name={item.productName}
        imageDefault={!item.productImage}
        image={item.productImage}
        sk={item.productCode}
        adet={item.productQuantity}
        onPress={() => {
          const _id = item._id

          if (page === 1) {

            navigation.navigate('urunDetay-screen', { _id, });

          } else if (page === 2 || page === 3 || page === 4 || page === 5) {

            setProductId(_id)
            setSelectedProduct(item)
            setIsModalVisible(true);
            // setMiktar(item?.productQuantity.toString())


          }
        }
        }
      />
    );
  };



  const onBackPress = () => {
    page === 2 ?
      (dispatch(getIncomingProductDetailProcess({ incomingProductId: incomingProductId })))
      :
      page === 3 ? (dispatch(getOutgoingProductDetailProcess({ outgoingProductId: outgoingProductId }))) : null

    navigation.goBack()
  }



  const addNewCategory = async () => {
    await dispatch(addNewCategoryProcess({
      categoryName: category,

    }));
    await dispatch(getAllCategoriesProcess())
    setIsCategoryVisible(false)
    setCategory('')
  }




  return (
    <View style={style.container}>

      <ToastCompSuccess show={showAddCategoryToastSuccess} text1={'Kategori Eklendi'} text2={'Kategori başarıyla eklendi.'} />
      <ToastCompError show={showAddCategoryToastError} text1={'Kategori Eklenemedi'} text2={'Kategori eklenemedi.'} />
      <ToastCompSuccess show={showAddToastSuccess} text1={'Ürün Eklendi'} text2={'Ürün belgeye başarıyla eklendi.'} />
      <ToastCompError show={showAddToastError} text1={'Ürün Eklenemedi'} text2={'Ürün belgeye eklenemedi'} />
      <ToastCompSuccess show={showAddProductToastSuccess} text1={'Ürün Eklendi'} text2={'Ürün başarıyla eklendi.'} />


      <Header
        isAddProduct={page === 2 || page === 3 ? true : false}
        first={true}
        firstName={'arrow-left'}
        second={true}
        text={'STOK'}
        color={'#000E36'}
        textButton={true}
        backgroundColor={'#000E36'}
        third={true}
        onPress={() => navigation.navigate('urunEkle-screen', { page: page, categoryId: categoryId })}
        onBackPress={onBackPress}
      />
      <View style={style.innerContainer}>

        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          onClear={() => handleSearch('')}
        />

        {/* Categories */}


        <Categories

          value={category}
          setValue={setCategory}
          categories={AllCategoriesData}
          addNewCategory={addNewCategory}
          isModalVisible={isCategoryVisible}
          setIsModalVisible={setIsCategoryVisible}
          setCategoryId={setCategoryId}
          categoryId={categoryId}
        />

        {/* <ScrollView>
          <Text style={{ color: 'red' }}>
            {MEssage ? JSON.stringify(MEssage) : 'YOK'}
          </Text>
        </ScrollView> */}

        {/* Loading */}

        {isLoading.getAllProductsProcess && (
          <Loading />
        )}

        {/* Product List */}

        <View style={style.listContainer}>

          {productData && productData.length ?
            (<FlatList
              showsVerticalScrollIndicator={false}
              data={searchQuery ? filteredData : productData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />

            ) : (
              <View style={style.listEmpty}>
                <Text style={style.listEmptyText}>Stokta herhangi bir ürün bulunmamaktadır..</Text>
              </View>
            )}

        </View>
      </View>



      {/* <PriceArea /> */}

      {/* Modal */}

      <MyModal
        fiyatValue={fiyatValue}
        setFiyatValue={setFiyatValue}
        isSelected={isSelected}
        setSelection={setSelection}
        kdvValue={kdvValue}
        setKdvValue={setKdvValue}
        FiyatText={page == 2 || page == 4 ? 'Alış Fiyatı:' : page == 3 || page == 5 ? 'Satış Fiyatı' : null}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleQuantityUpdate={handleQuantityUpdate}
        miktarValue={miktar}
        setMiktarValue={setMiktar}
        item={selectedProduct}
      />
    </View>
  );
};
