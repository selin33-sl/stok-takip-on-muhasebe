import { View, Dimensions, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import style from './style'
import { Button, Header, Textinput, ToastCompError, } from '../../components'
import { Checkbox } from '../../components/Checkbox';
import { useNavigation, } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addNewOrderProcess, getAllOrdersProcess, getMusteriOrdersProcess, getTedarikciOrdersProcess } from '../../api';
import { resetAddOrder } from '../../redux/slice/add-new-order-slice';
import { CategoryDropdown } from '../../components/CategoryDropdown';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

export const turkishCities = [
    { cityName: 'Adana', _id: 1 },
    { cityName: 'Adıyaman', _id: 2 },
    { cityName: 'Afyonkarahisar', _id: 3 },
    { cityName: 'Ağrı', _id: 4 },
    { cityName: 'Amasya', _id: 5 },
    { cityName: 'Ankara', _id: 6 },
    { cityName: 'Antalya', _id: 7 },
    { cityName: 'Artvin', _id: 8 },
    { cityName: 'Aydın', _id: 9 },
    { cityName: 'Balıkesir', _id: 10 },
    { cityName: 'Bilecik', _id: 11 },
    { cityName: 'Bingöl', _id: 12 },
    { cityName: 'Bitlis', _id: 13 },
    { cityName: 'Bolu', _id: 14 },
    { cityName: 'Burdur', _id: 15 },
    { cityName: 'Bursa', _id: 16 },
    { cityName: 'Çanakkale', _id: 17 },
    { cityName: 'Çankırı', _id: 18 },
    { cityName: 'Çorum', _id: 19 },
    { cityName: 'Denizli', _id: 20 },
    { cityName: 'Diyarbakır', _id: 21 },
    { cityName: 'Edirne', _id: 22 },
    { cityName: 'Elazığ', _id: 23 },
    { cityName: 'Erzincan', _id: 24 },
    { cityName: 'Erzurum', _id: 25 },
    { cityName: 'Eskişehir', _id: 26 },
    { cityName: 'Gaziantep', _id: 27 },
    { cityName: 'Giresun', _id: 28 },
    { cityName: 'Gümüşhane', _id: 29 },
    { cityName: 'Hakkari', _id: 30 },
    { cityName: 'Hatay', _id: 31 },
    { cityName: 'Isparta', _id: 32 },
    { cityName: 'Mersin', _id: 33 },
    { cityName: 'İstanbul', _id: 34 },
    { cityName: 'İzmir', _id: 35 },
    { cityName: 'Kars', _id: 36 },
    { cityName: 'Kastamonu', _id: 37 },
    { cityName: 'Kayseri', _id: 38 },
    { cityName: 'Kırklareli', _id: 39 },
    { cityName: 'Kırşehir', _id: 40 },
    { cityName: 'Kocaeli', _id: 41 },
    { cityName: 'Konya', _id: 42 },
    { cityName: 'Kütahya', _id: 43 },
    { cityName: 'Malatya', _id: 44 },
    { cityName: 'Manisa', _id: 45 },
    { cityName: 'Kahramanmaraş', _id: 46 },
    { cityName: 'Mardin', _id: 47 },
    { cityName: 'Muğla', _id: 48 },
    { cityName: 'Muş', _id: 49 },
    { cityName: 'Nevşehir', _id: 50 },
    { cityName: 'Niğde', _id: 51 },
    { cityName: 'Ordu', _id: 52 },
    { cityName: 'Rize', _id: 53 },
    { cityName: 'Sakarya', _id: 54 },
    { cityName: 'Samsun', _id: 55 },
    { cityName: 'Siirt', _id: 56 },
    { cityName: 'Sinop', _id: 57 },
    { cityName: 'Sivas', _id: 58 },
    { cityName: 'Tekirdağ', _id: 59 },
    { cityName: 'Tokat', _id: 60 },
    { cityName: 'Trabzon', _id: 61 },
    { cityName: 'Tunceli', _id: 62 },
    { cityName: 'Şanlıurfa', _id: 63 },
    { cityName: 'Uşak', _id: 64 },
    { cityName: 'Van', _id: 65 },
    { cityName: 'Yozgat', _id: 66 },
    { cityName: 'Zonguldak', _id: 67 },
    { cityName: 'Aksaray', _id: 68 },
    { cityName: 'Bayburt', _id: 69 },
    { cityName: 'Karaman', _id: 70 },
    { cityName: 'Kırıkkale', _id: 71 },
    { cityName: 'Batman', _id: 72 },
    { cityName: 'Şırnak', _id: 73 },
    { cityName: 'Bartın', _id: 74 },
    { cityName: 'Ardahan', _id: 75 },
    { cityName: 'Iğdır', _id: 76 },
    { cityName: 'Yalova', _id: 77 },
    { cityName: 'Karabük', _id: 78 },
    { cityName: 'Kilis', _id: 79 },
    { cityName: 'Osmaniye', _id: 80 },
    { cityName: 'Düzce', _id: 81 }
];



export const CariEkleScreen = () => {

    const [showAddToastError, setShowAddToastError] = useState(false)

    const [cityValue, setCityValue] = useState(null);
    const [ilce, setIlce] = useState('')

    const [isEmailValid, setEmailValid] = useState(true);
    const [isTCValid, setTCValid] = useState(false);
    const [tcEmpty, setTcEmpty] = useState(false)
    const [name, setName] = useState('')
    const [tc, setTc] = useState()
    const [email, setEmail] = useState('')
    const [adres, setAdres] = useState('')
    const [isSelected1, setSelection1] = useState(false);
    const [isSelected2, setSelection2] = useState(false);
    const [phone, setPhone] = useState();
    const dispatch = useDispatch();
    const navigation = useNavigation();


    const { status: addNewOrderStatus, message: addNewOrderMessage } = useSelector(state => state.newOrder);


    useEffect(() => {
        setShowAddToastError(false);

        if (addNewOrderStatus === "error") {
            setShowAddToastError(true);

            setTimeout(() => {
                dispatch(resetAddOrder());
            }, 900);
            console.log(addNewOrderMessage, "5000eeeeeeeeeeeeeeeeeeeeeeeee");


        } else if (addNewOrderStatus === "success") {
            navigation.goBack();
            dispatch(getAllOrdersProcess());
            dispatch(getTedarikciOrdersProcess());
            dispatch(getMusteriOrdersProcess())

        }
    }, [addNewOrderStatus]);



    let ozellikValue = [];

    if (isSelected1) {
        ozellikValue.push('Müşteri');
    }

    if (isSelected2) {
        ozellikValue.push('Tedarikçi');
    }


    const addNewOrder = async () => {
        if (!isEmailValid) {
            return; // Don't proceed if email is not valid
        }


        if (email === '' || tc === '' || name === '' || (!isSelected1 && !isSelected2) || cityValue === null) {
            Alert.alert('Uyarı', 'Lütfen boş alanları doldurunuz.');
            return;
        }


        await dispatch(addNewOrderProcess({
            tcNumber: tc,
            isim: name,
            email: email,
            telefon: phone,
            adres: adres,
            ozellik: ozellikValue,
            il: cityValue,
            ilce: ilce


        }));







    }


    const handleTcChange = text => {
        const characterCount = text.length;

        if (characterCount <= 11) {
            setTc(text);
            setTCValid(false);


        } else {
            Alert.alert('Uyarı', 'En fazla 11 karakter girebilirsiniz.');
        }
    };



    const handlePhoneChange = text => {
        const characterCount = text.length; // Boşlukları saymamak için trim kullanılıyor

        if (characterCount <= 11) {
            setPhone(text);
        } else {
            Alert.alert('Uyarı', 'En fazla 11 karakter girebilirsiniz.');
        }
    };



    const handleEmailChange = text => {
        setEmail(text);

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (emailRegex.test(text)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    };



    console.log(isTCValid, "1111111111111111111111111111");
    console.log(isEmailValid, "22222222222222222222222");
    console.log(addNewOrderMessage, "333333333333333333333333");
    console.log(tcEmpty, "4444444444444444444444");


    return (
        <View style={style.container}>
            <ToastCompError show={showAddToastError} text1={'Cari Eklenemedi'} text2={addNewOrderMessage} />


            <Header first={true} firstName={'arrow-left'} second={true} text={'Cari Oluştur'} color={'#000E36'} />

            <View style={style.innerContainer}>


                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={style.listContainer}>
                        <Textinput
                            placeholder={'Ad Soyad'}
                            value={name}
                            setValue={setName}
                        />
                        <Textinput
                            placeholder={'TC'}
                            value={tc}
                            setValue={handleTcChange}
                            keyboardType={'numeric'}
                            error={isTCValid}
                            message={'Bu tcNumber ile daha önce kayıt yapılmış'}
                        />
                        <Textinput
                            placeholder={'Email'}
                            value={email}
                            setValue={handleEmailChange}
                            error={!isEmailValid}
                            message={'Geçerli bir e-posta adresi girin.'}

                        />
                        <Textinput
                            placeholder={'0555 555 55 55'}
                            value={phone}
                            setValue={handlePhoneChange}
                            keyboardType={'numeric'}

                        />
                        <Textinput
                            placeholder={'Adres'}
                            value={adres}
                            setValue={setAdres}

                        />
                        <CategoryDropdown value={cityValue} setValue={setCityValue} data={turkishCities} city={true} placeholder={'Şehir seç'} />

                        <Textinput
                            placeholder={'İlçe'}
                            value={ilce}
                            setValue={setIlce}

                        />
                    </View>



                    <View style={style.checkboxContainer} >
                        <Checkbox
                            value={isSelected1}
                            onValueChange={setSelection1}
                            label={'Müşteri'}
                        />
                        <Checkbox
                            value={isSelected2}
                            onValueChange={setSelection2}
                            label={'Tedarikçi'}
                        />
                    </View>

                    <Button text={'Kaydet'} width={windowWidth * 0.35} onPress={addNewOrder} color={'white'}
                        height={windowHeight * 0.05} backgroundColor={'#000E36'} />

                </ScrollView>

            </View>
        </View>
    )
}
