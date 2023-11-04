import { View, Text, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import style from './style'
import { Header, SearchBar, ToastCompError, ToastCompSuccess } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addNewCategoryProcess, deleteCategoryProcess, getAllCategoriesProcess, updateCategoryProcess } from '../../api'
import { CariKategoriCart } from '../../components/Cari-KategoriCart'
import { CategoryAddModal } from '../../components/CategoryAddModal'
import { resetUpdateCategory } from '../../redux/slice/update-category-slice'
import { resetAddCategory } from '../../redux/slice/add-new-category-slice'
import { resetDeleteCategory } from '../../redux/slice/delete-category-slice'

export const KategoriScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [showUpdateToastSuccess, setShowUpdateToastSuccess] = useState(false)
    const [showUpdateToastError, setShowUpdateToastError] = useState(false)

    const [showDeleteToastSuccess, setShowDeleteToastSuccess] = useState(false)
    const [showDeleteToastError, setShowDeleteToastError] = useState(false)

    const [showAddToastSuccess, setShowAddToastSuccess] = useState(false)
    const [showAddToastError, setShowAddToastError] = useState(false)



    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [categoryId, setCategoryId] = useState('')
    const [isCategoryVisible, setIsCategoryVisible] = useState(false);
    const [update, setUpdate] = useState('')
    const [deleteIcon, setDeleteIcon] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [category, setCategory] = useState(categoryName)

    useEffect(() => {

        dispatch(getAllCategoriesProcess())

    }, []);


    const { data: AllCategoriesData } = useSelector(state => state.getCategories);
    const { status: UpdateCategoryStatus } = useSelector(state => state.updateCategory);
    const { message: AddNewCategoryMessage, status: AddNewCategoryStatus } = useSelector(state => state.newCategory);
    const { status: DeleteCategoryStatus } = useSelector(state => state.deleteCategory);

    console.log(AddNewCategoryMessage, "1111111111111111111");

    console.log(DeleteCategoryStatus.deleteCategoryProcess, "nnnnnnnnnnnnnnnnnnn");

    useEffect(() => {
        console.log(DeleteCategoryStatus.deleteCategoryProcess, "mmmmmmmmmmmmmmmmmmmmmm");

        setShowUpdateToastSuccess(false);
        setShowDeleteToastSuccess(false);
        setShowAddToastSuccess(false);


        if (UpdateCategoryStatus === "success") {
            setShowUpdateToastSuccess(true);
            dispatch(resetUpdateCategory());
        } else if (UpdateCategoryStatus === "error") {
            setShowUpdateToastError(true);
            dispatch(resetUpdateCategory());
        }

        if (DeleteCategoryStatus.deleteCategoryProcess === "success") {
            setShowDeleteToastSuccess(true);
            dispatch(resetDeleteCategory());
        } else if (DeleteCategoryStatus.deleteCategoryProcess === "error") {
            setShowDeleteToastError(true);
            dispatch(resetDeleteCategory());
        }

        if (AddNewCategoryStatus === "success") {
            setShowAddToastSuccess(true);
            dispatch(resetAddCategory());


        } else if (AddNewCategoryStatus === "error") {
            setShowAddToastError(true);
            dispatch(resetAddCategory());

        }
    }, [UpdateCategoryStatus, DeleteCategoryStatus, AddNewCategoryStatus]);



    const renderItem = ({ item }) => {
        return <CariKategoriCart name={item.categoryName} onPress={
            () => { setIsCategoryVisible(true), setUpdate(true), setDeleteIcon(true), setCategoryId(item._id), setCategoryName(item.categoryName) }
        } />;
    };


    const handleSearch = (query) => {
        setSearchQuery(query);

        const filteredProducts = AllCategoriesData.filter((item) =>
            item.categoryName.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredData(filteredProducts);
    };


    const showAlert = () => {
        Alert.alert(
            'Uyarı',
            'Bu kategori adına sahip bir kategori zaten var.',
            [
                {
                    text: 'Tamam',
                    onPress: () => console.log('Eklenemedi Kategori'),
                    style: 'cancel',
                },

            ],
            { cancelable: true }
        );
    };


    const addNewCategory = async () => {
        setCategoryName('')

        await dispatch(addNewCategoryProcess({
            categoryName: categoryName,

        }));

        if (AddNewCategoryMessage && AddNewCategoryMessage.length) {
            showAlert()
        }
        await dispatch(getAllCategoriesProcess())



        setIsCategoryVisible(false)



    }

    console.log(category, "ÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖ");
    console.log(categoryName, "şşşşşşşşşşşşşşşşşşşşşşşşşşşşşşş");



    const categoryDelete = async () => {
        console.log(categoryId, "jldfkjglkdfjglkjdflkjgljfdljg");
        await dispatch(deleteCategoryProcess({
            _id: categoryId,

        }));
        await dispatch(getAllCategoriesProcess())

        setIsCategoryVisible(false)
        setCategoryName('')


    }

    const categoryUpdate = async () => {
        console.log(categoryId, "jldfkjglkdfjglkjdflkjgljfdljg");
        await dispatch(updateCategoryProcess({
            _id: categoryId,
            categoryName: categoryName

        }));
        await dispatch(getAllCategoriesProcess())

        setIsCategoryVisible(false)
        setCategoryName('')


    }

    const handleKategoriChange = text => {

        const characterCount = text.length; // Boşlukları saymamak için trim kullanılıyor

        if (characterCount <= 30) {
            setCategoryName(text);
        } else {
            Alert.alert('Uyarı', 'En fazla 30 karakter girebilirsiniz.');
        }
    };




    return (
        <View style={style.container}>

            <ToastCompSuccess show={showUpdateToastSuccess} text1={'Kategori Güncellendi'} text2={'Kategori başarıyla güncellendi.'} />
            <ToastCompError show={showUpdateToastError} text1={'Kategori Güncellenemedi'} text2={'Kategori güncellenemedi.'} />

            <ToastCompSuccess show={showDeleteToastSuccess} text1={'Kategori Silindi'} text2={'Kategori başarıyla silindi.'} />
            <ToastCompError show={showDeleteToastError} text1={'Kategori Silinemedi'} text2={'Kategori silinemedi.'} />

            <ToastCompSuccess show={showAddToastSuccess} text1={'Kategori Eklendi'} text2={'Kategori başarıyla eklendi.'} />
            <ToastCompError show={showAddToastError} text1={'Kategori Eklenemedi'} text2={'Kategori eklenemedi.'} />


            <Header first={true} firstName={'arrow-left'} second={true} text={'Kategoriler'} color={'#000E36'} third={true} button={true} onPress={() => { setIsCategoryVisible(true), setUpdate(false), setDeleteIcon(false) }} backgroundColor={'#000E36'} />

            <View style={style.innerContainer}>

                <SearchBar
                    value={searchQuery}
                    onChangeText={handleSearch}
                    onClear={() => handleSearch('')}
                />

                {AllCategoriesData && AllCategoriesData.length ? (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={searchQuery ? filteredData : AllCategoriesData}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index}
                    />
                ) : (
                    <View style={style.listEmpty}>
                        <Text style={style.listEmptyText}>Herhangi bir kategori bulunmamaktadır..</Text>
                    </View>
                )}
            </View>

            <CategoryAddModal
                update={update}
                isModalVisible={isCategoryVisible}
                setIsModalVisible={setIsCategoryVisible}
                value={categoryName}
                setValue={handleKategoriChange}
                addNewCategory={update ? categoryUpdate : addNewCategory}
                deleteIcon={deleteIcon}
                handlerDelete={categoryDelete}

            />
        </View>
    )
}
