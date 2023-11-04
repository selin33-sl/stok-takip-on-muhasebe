import { View, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import style from './style'
import { Button, Header, ToastCompError, ToastCompSuccess } from '../../components'
import { useNavigation } from '@react-navigation/native';
import { SettingComp } from '../../components/SettingComp';
import { useDispatch, useSelector } from 'react-redux';
import { resetUpdateUser } from '../../redux/slice/update-user-slice';
import { resetUpdateUserPassword } from '../../redux/slice/update-user-password-slice';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export const SettingsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [showAddToastSuccess, setShowAddToastSuccess] = useState(false)
  const [showAddToastError, setShowAddToastError] = useState(false)
  const [showUpdatePasswordToastSuccess, setShowUpdatePasswordToastSuccess] = useState(false)

  const { status: UpdateUserStatus } = useSelector(state => state?.updateUser);
  const { status: UpdatePasswordStatus, message: UpdatePasswordMessage, } = useSelector(state => state?.updateUserPassword);

  console.log(UpdateUserStatus, "uuuuuuuuuuuuuuuuuuuuu");


  useEffect(() => {
    setShowAddToastSuccess(false)
    setShowUpdatePasswordToastSuccess(false);

    if (UpdateUserStatus === "success") {
      setShowAddToastSuccess(true)
      dispatch(resetUpdateUser());
    } else if (UpdateUserStatus === "error") {
      setShowAddToastError(true)
      dispatch(resetUpdateUser());
    }
    if (UpdatePasswordStatus === "success") {
      setShowUpdatePasswordToastSuccess(true);
      dispatch(resetUpdateUserPassword());
    }



  }, [UpdateUserStatus, UpdatePasswordStatus])

  return (
    <View style={style.container} >
      <ToastCompSuccess show={showUpdatePasswordToastSuccess} text1={'Şifre Güncellendi'} text2={'Şifre başarıyla güncellendi'} />
      <ToastCompSuccess show={showAddToastSuccess} text1={'Kaydedildi'} text2={'Başarıyla kaydedildi.'} />
      <ToastCompError show={showAddToastError} text1={'Kaydedilemedi'} text2={'Kaydedilemedi başarız.'} />


      <Header first={true} second={true} firstName={'arrow-left'} text={'Ayarlar'} color={'#000E36'} />
      <View style={style.innerContainer} >
        <SettingComp
          name={'emoticon-wink'}
          text={'Profil'}
          backgroundColor={'#B5C9FE'}
          color={'#000E36'}
          onPress={() => navigation.navigate('settingProfil-screen')}

        />
        <SettingComp
          name={'key-outline'}
          text={'Şifre'}
          backgroundColor={'#000E36'}
          color={'white'}
          onPress={() => navigation.navigate('settingSifre-screen')}


        />
        <SettingComp
          name={'account-outline'}
          text={'Hakkımızda'}
          backgroundColor={'#B5C9FE'}
          color={'#000E36'}
          onPress={() => navigation.navigate('settingHakkımızda-screen')}


        />

        <SettingComp
          name={'help-circle-outline'}
          text={'Yardım'}
          backgroundColor={'#000E36'}
          color={'white'}
          onPress={() => navigation.navigate('settingYardim-screen')}


        />
        <SettingComp
          name={'information-outline'}
          text={'Uygulama Bilgileri'}
          backgroundColor={'#B5C9FE'}
          color={'#000E36'}
          onPress={() => navigation.navigate('settingUygulamaBilgileri-screen')}

        />

        <SettingComp
          name={'bell-ring-outline'}
          text={'Bildirimler'}
          backgroundColor={'#000E36'}
          color={'white'}
          onPress={() => navigation.navigate('settingBildirim-screen')}


        />


      </View>
    </View>
  )
}


