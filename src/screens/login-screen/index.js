import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, Linking } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import style from './style';
import { Textinput } from '../../components/Textinput';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, registerProcess } from '../../api';
import { ToastCompError, ToastCompSuccess } from '../../components';
import { resetAuth } from '../../redux/slice/auth-slice';
import VersionCheck from 'react-native-version-check';
import { resetRegister } from '../../redux/slice/register-slice';
import { Checkbox } from '../../components/Checkbox';
import { PermissionsAndroid } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';


export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [secure, setSecure] = useState(false)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [showNoInternetToast, setShowNoInternetToast] = useState(false);
  const [register, setRegister] = useState(false)
  const [showRegisterToastSuccess, setShowRegisterToastSuccess] = useState(false)
  const [showRegisterToastError, setShowRegisterToastError] = useState(false)
  const [isEmailValid, setEmailValid] = useState(true);

  const { status, message: AuthMessage } = useSelector(state => state.auth);

  // const requestNotificationPermission = async () => {
  //   const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  //   return result;
  // };

  // const checkNotificationPermission = async () => {
  //   const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  //   return result;
  // };

  // const requestPermission = async () => {
  //   const checkPermission = await checkNotificationPermission();

  //   console.log(checkPermission, "111111111111111");
  //   console.log(RESULTS.GRANTED, "2222222222");
  //   console.log(RESULTS.DENIED, "333333333333");
  //   if (checkPermission == RESULTS.GRANTED) {
  //     console.log("izin verildi");
  //   }
  //   if (checkPermission == RESULTS.DENIED) {
  //     console.log("reddedildi");

  //     const request = await requestNotificationPermission();
  //     if (request == RESULTS.GRANTED) {
  //       console.log("bi şeyler oldu");
  //       // permission not granted
  //     }
  //   }
  // };
  // requestPermission()

  // const requestNotificationPermission = async () => {
  //   const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  //   console.log(result, "1111111111111");

  //   if (result === RESULTS.GRANTED) {
  //     console.log('Bildirim izni verildi.');
  //     // Bildirim izni verildiyse, burada bildirimleri dinlemeye başlayabilirsiniz.
  //   } else if (result === RESULTS.DENIED) {
  //     console.log('Bildirim izni reddedildi.');
  //     // Bildirim izni reddedildiğinde kullanıcıya bir alert göstermek için kullanabilirsiniz.
  //     Alert.alert(
  //       'Bildirim İzni Reddedildi',
  //       'Uygulamadan bildirim almak için bildirim iznine ihtiyacımız var. Lütfen bildirim iznini etkinleştirmek için ayarlara gidin.',
  //       [
  //         {
  //           text: 'İptal',
  //           onPress: () => console.log('Bildirim izni reddedildi, kullanıcı iptal etti.'),
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'Ayarlar',
  //           onPress: () => {
  //             // Kullanıcıyı uygulama ayarlarına yönlendir
  //             if (Platform.OS === 'android') {
  //               Linking.openSettings();
  //             }
  //             // if (Platform.OS === 'android') {
  //             //   Linking.openURL('app-settings:');
  //             // } else {
  //             //   Linking.openSettings();
  //             // }
  //           },
  //         },
  //       ]
  //     );
  //   } else {
  //     console.log(RESULTS.GRANTED, "2222222222");
  //     console.log('Bildirim izni reddedildi veya ertelendi.');
  //     // Bildirim izni ertelendi veya reddedildiğinde yapılacak işlemleri burada tanımlayabilirsiniz.
  //   }
  // };

  // requestNotificationPermission()

  const handleUpdatePress = () => {
    // Uygulamanızın Play Store URL'sini buraya ekleyin
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.pengona.stoktakip';

    // Play Store'u açmak için Linking kullanın
    Linking.openURL(playStoreUrl).then(() => {
      console.log('Play Store açıldı');
    }).catch((error) => {
      console.error('Play Store açılamadı', error);
    });
  };


  const showCancelAlert = () => {
    Alert.alert(
      'Yeni Güncelleme Mevcut',
      'Lütfen uygulamanızı güncelleyin.',
      [
        {
          text: 'İptal',
          onPress: () => console.log('Güncelleme iptal edildi'),
          style: 'cancel',
        },
        {
          text: 'Şimdi Yükle',
          onPress: handleUpdatePress,
        },
      ],
      { cancelable: true }
    );
  };
  const checkForUpdates = async () => {
    try {
      const update = await VersionCheck.needUpdate();
      if (update.isNeeded) {
        console.log(update.currentVersion, "vvvvvvvvvvvvvvvvvvvvvvvvvvvv ");
        // Güncelleme mevcutsa, kullanıcıya bildirin
        update.currentVersion //mevcut uygulama sürümü
        update.latestVersion // en son sürüm
        showCancelAlert()
      } else {
        console.log(update.currentVersion, "vvvvvvvvvvvvvvvvvvvvvvvvvvvv ");
      }
    } catch (error) {
      // Hata kontrolü
      console.error('Güncelleme kontrolü sırasında hata oluştu:', error);
    }
  };
  checkForUpdates()

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setShowNoInternetToast(!state.isConnected);
    });

    return () => {
      unsubscribe(); // Abonelikten çıkış yapılması gerekiyor
    };
  }, []);

  const handleLogin = () => {
    if (!isConnected) {
      Alert.alert('İnternet Bağlantısı Yok', 'Lütfen internet bağlantınızı kontrol ediniz..');
      return;
    }

    if (email === '' || password === '') {
      Alert.alert('Uyarı', 'Lütfen kullanıcı adınızı ve şifrenizi giriniz.');
      return;
    }
    // requestNotificationPermission(); // Bildirim izni iste
    dispatch(authLogin({ email, password }));
  };

  const { status: registerStatus, message: RegisterMessage } = useSelector((state) => state.register);

  console.log(RegisterMessage, "üüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüü");
  const handleRegisterScreen = () => {
    setRegister(prevRegister => !prevRegister)
    dispatch(resetRegister())
    dispatch(resetAuth())
    console.log(register, "7777777777777777777777777777777777777777777");
  }

  const handleRegister = async () => {
    if (username === '' || password === '' || email === '') {
      Alert.alert('Uyarı', 'Lütfen bütün alanları doldurunuz.');
      return;
    }

    if (!isEmailValid) {
      Alert.alert('Uyarı', 'Lütfen geçerli bir e-posta adresi giriniz.');
      return;
    }

    await dispatch(registerProcess({ username, password, email }))


  }


  useEffect(() => {
    setShowRegisterToastSuccess(false)
    setShowRegisterToastError(false)

    if (registerStatus?.registerProcess === "success") {
      setShowRegisterToastSuccess(true)
      dispatch(resetRegister());
      setRegister(false)
      setUsername('')
      setPassword('')
      setEmail('')

    } else if (registerStatus?.registerProcess === "error") {
      setShowRegisterToastError(true)
      dispatch(resetRegister());
    }
  }, [registerStatus])



  const handleEmailChange = text => {
    setEmail(text);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailRegex.test(text)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };



  return (
    <View style={style.container}>
      <ToastCompSuccess show={showRegisterToastSuccess} text1={'Kayıt Başarılı'} text2={'Kayıt başarıyla oluşturuldu.'} />
      <ToastCompError show={showRegisterToastError} text1={'Kayıt Başarısız'} text2={'Kayıt oluşturulamadı.'} />


      <Image
        source={require('../../assets/stok-takip-programi.png')}
        style={style.imageStyle}
      />
      <View style={style.innerContainer}>

        <View style={style.inputContainer} >
          <Text style={style.labelText} >{register ? 'Kayıt Ol' : 'Hoşgeldiniz'}</Text>


          < Textinput placeholder={'Email'} value={email} setValue={handleEmailChange} error={!isEmailValid}
            message={'Geçerli bir e-posta adresi girin.'} />

          {register ? (<Textinput placeholder={'Kullanıcı Adı'} value={username} setValue={setUsername} />) : null}

          <Textinput
            placeholder={'Şifre'}
            value={password}
            setValue={setPassword}
            secureText={!secure}
          />
          <View style={style.checkboxContainer}>
            <Checkbox
              value={secure}
              onValueChange={setSecure}
              label={'Şifreyi göster'}
            />
          </View>

          <View style={style.messageContainer} >
            <Text style={style.messageText} >{register ? (RegisterMessage && RegisterMessage.length ? RegisterMessage : null) : (AuthMessage && AuthMessage.length ? AuthMessage : null)}</Text>
          </View>

          <TouchableOpacity onPress={register ? handleRegister : handleLogin} style={style.loginButton}>
            <Text style={style.loginText}>{register ? 'KAYIT' : 'GİRİŞ'}</Text>
          </TouchableOpacity>

          <View style={style.optionContainer} >
            <Text style={style.optionText} >{register ? 'Zaten bir hesabınız var mı?' : 'Hesabınız yok mu?'}</Text>
            <TouchableOpacity style={style.optionButton} onPress={handleRegisterScreen}>
              <Text style={style.optionButtonText} >{register ? 'Giriş' : 'Kayıt'}</Text>
            </TouchableOpacity>

          </View>


        </View>

        <Text style={style.surum} >© 2006 - 2023 Pengona Software.Tüm Hakları Saklıdır.Pengona Software tarafından yapılmıştır.</Text>

      </View>

      <ToastCompError
        show={status?.authLogin === 'error'}
        text1="Başarısız"
        text2="Giriş Başarısız"
      />
      <ToastCompSuccess
        show={status?.authLogin === 'success'}
        text1="Başarılı"
        text2="Giriş Başarılı"
      />
      <ToastCompError
        show={showNoInternetToast}
        text1="İnternet Bağlantısı Yok"
        text2="Lütfen internet bağlantınızı kontrol ediniz.."
      />
    </View>
  );
};

