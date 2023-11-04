import { View, Text, ScrollView, Dimensions, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Header, Textinput, TextinputContainer, ToastCompError, ToastCompSuccess } from '../../components'
import { useNavigation } from '@react-navigation/native';
import style from './style'
import { getUserDetailProcess, updateUserPasswordProcess } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '../../components/Checkbox';
import { resetUpdateUserPassword } from '../../redux/slice/update-user-password-slice';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const SettingSifreScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const [showUpdatePasswordToastError, setShowUpdatePasswordToastError] = useState(false)

    const [secure, setSecure] = useState(false)
    const [message, setMessage] = useState(false)
    const [password, setPassword] = useState('')
    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')

    const { data: UserDetailData, isLoading: LoadingIncoming, } = useSelector(state => state?.getUserDetail);
    const { status: UpdatePasswordStatus, message: UpdatePasswordMessage, } = useSelector(state => state?.updateUserPassword);


    console.log(UpdatePasswordStatus, "eeeeeeeeeeeeeeeeeeeeee");


    useEffect(() => {

        setShowUpdatePasswordToastError(false)

        if (UpdatePasswordStatus === "success") {

            navigation.goBack()

        } else if (UpdatePasswordStatus === "error") {
            setShowUpdatePasswordToastError(true);

            setTimeout(() => {
                dispatch(resetUpdateUserPassword());
            }, 900);

        }

    }, [UpdatePasswordStatus])





    useEffect(() => {
        dispatch(getUserDetailProcess())
    }, [])

    const updateUserPassword = async () => {

        if (newPassword1 === '' || newPassword2 === '' || password === '') {
            Alert.alert('Uyarı', 'Lütfen bütün alanları doldurunuz.');
            return;
        }

        console.log(newPassword1, newPassword2, "333333333333333333333333");
        if (newPassword1 !== newPassword2) {
            setMessage(true)
            return;
        }

        await dispatch(updateUserPasswordProcess({
            id: UserDetailData._id,
            oldPassword: password,
            newPassword: newPassword1,

        }));



    }



    return (
        <View style={style.container}>
            <ToastCompError show={showUpdatePasswordToastError} text1={'Şifre Güncellenemedi'} text2={UpdatePasswordMessage} />

            <Header first={true} firstName={'arrow-left'} second={true} text={'Şifre'} color={'#000E36'} />
            <View style={style.innerContainer}>


                <ScrollView style={{}}>
                    <Textinput
                        placeholder={'Mevcut Şifre'}
                        value={password}
                        setValue={setPassword}
                        secureText={!secure}
                    />

                    <Textinput
                        placeholder={'Yeni Şifre'}
                        value={newPassword1}
                        setValue={setNewPassword1}
                        secureText={!secure}
                    />
                    <Textinput
                        placeholder={'Yeni Şifre Tekrar'}
                        value={newPassword2}
                        setValue={setNewPassword2}
                        secureText={!secure}
                    />
                    <View style={style.messageContainer} >
                        <Text style={style.messageText} >{message ? 'Yeni şifreler uyuşmuyor.' : null} </Text>
                    </View>
                    <View style={style.checkboxContainer}>
                        <Checkbox
                            value={secure}
                            onValueChange={setSecure}
                            label={'Şifreleri göster'}
                        />
                    </View>
                </ScrollView>
                <Button
                    onPress={updateUserPassword}
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
