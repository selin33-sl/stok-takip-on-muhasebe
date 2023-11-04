import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import style from './style'
import { Button, Header, Textinput, TextinputContainer, ToastCompError, ToastCompSuccess } from '../../components'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailProcess, updateUserProcess } from '../../api';
import { images } from '../../assets';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import ImageResizer from '@bam.tech/react-native-image-resizer'
import { ImagePickerModal } from '../../components/image-picker-modal';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const SettingProfilScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()

    const [imageDefault, setImageDefault] = useState()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [productImage, setProductImage] = useState(null);
    const [pickerResponse, setPickerResponse] = useState(null);
    const [visible, setVisible] = useState(false);



    const { data: UserDetailData, isLoading: LoadingIncoming, } = useSelector(state => state?.getUserDetail);



    const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;


    useEffect(() => {
        if (pickerResponse?.imageBase64 != null) {
            setProductImage(`data:image/jpeg;base64,${pickerResponse?.imageBase64}`)
        } else {
            setProductImage('')
        }

    }, [pickerResponse?.imageBase64])



    console.log(UserDetailData?._id, "66666666666666666666666666666");

    useEffect(() => {
        dispatch(getUserDetailProcess())
    }, [])


    useEffect(() => {
        if (UserDetailData) {
            setUsername(UserDetailData.username || '');
            setEmail(UserDetailData.email || '');
            setProductImage(UserDetailData.userImage || '')
        }
    }, [UserDetailData]);



    const updateUser = async () => {
        await dispatch(updateUserProcess({
            id: UserDetailData._id,
            username: username,
            email: email,
            userImage: productImage,

        }));

        await dispatch(getUserDetailProcess())
        navigation.goBack()

    }

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





    useEffect(() => {
        if (productImage) {
            setVisible(false);
        }
    }, [productImage]);


    useEffect(() => {
        setImageDefault(productImage == '' ? (false) : (true))
    }, [productImage])



    let imageSource;
    if (!imageDefault) {
        imageSource = images.userDefault;
    } else {

        imageSource = {
            uri: productImage

        }
    }

    const deletePhoto = () => {
        console.log("ööööööööööööööö");
        setProductImage('');
    }

    return (
        <View style={style.container}>



            <Header first={true} firstName={'arrow-left'} second={true} text={'Profil'} color={'#000E36'} />
            <View style={style.innerContainer}>
                <View style={style.imageContainer}>
                    <View style={style.imageInnerContainer}>
                        <Image source={imageSource} style={style.imageStyle} size={30} />
                    </View>
                    <ImagePickerModal
                        isVisible={visible}
                        onClose={() => setVisible(false)}
                        onImageLibraryPress={onImageLibraryPress}
                        onCameraPress={onCameraPress}
                    />
                    <View style={style.addButtonContainer}>
                        <TouchableOpacity style={style.deleteButton} onPress={deletePhoto} >
                            <Icon name={'delete-outline'} size={23} color='white' />
                        </TouchableOpacity>
                        <TouchableOpacity style={style.addButton} onPress={() => setVisible(true)} >
                            <Text style={style.addButtonText}>+</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                <ScrollView style={{ marginTop: windowHeight * 0.05 }}>
                    <TextinputContainer
                        text={'Kullanıcı Adı: '}
                        editable={true}
                        value={username}
                        onChangeText={setUsername} />
                    <TextinputContainer
                        text={'Email:'}
                        editable={false}
                        value={email}
                        onChangeText={setEmail} />
                </ScrollView>
                <Button
                    onPress={updateUser}
                    width={windowWidth * 0.4}
                    height={windowHeight * 0.05}
                    backgroundColor={'#000E36'}
                    text={'Kaydet'}
                    color={'white'}
                />

            </View>


        </View>
    )
}
