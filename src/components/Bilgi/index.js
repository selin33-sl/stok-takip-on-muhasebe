import { View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import React from 'react';
import style from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Bilgi = ({ handleClearName, tarih, onCheck, check, onPress, text, name, setSelectedName, description, setDescription, button, editable, setTarih, documentNo, setDocumentNo }) => {



  return (
    <View style={style.container}>
      {check && (<View style={style.buttonContainer}>

        <TouchableOpacity onPress={onCheck}  >

          <Icon name={'check'} size={30} color={'#000E36'} style={style.checkIcon} />

        </TouchableOpacity>
      </View>)}
      <View style={style.textContainer}>
        <View style={style.textContainer2}>
          <Text style={style.text}>Belgenin Tarihi:</Text>
          <TextInput style={{ ...style.textInput, width: windowWidth * 0.2, height: windowHeight * 0.05, borderBottomWidth: 0, }}
            editable={editable}
            value={tarih}
            onChangeText={setTarih}
          />
        </View>
        <View style={style.textContainer2}>
          <Text style={style.text}>Döküman No:</Text>
          <TextInput style={{ ...style.textInput, width: windowWidth * 0.15, height: windowHeight * 0.05, borderBottomWidth: 0, }}
            editable={false}
            value={documentNo}
            onChangeText={setDocumentNo}
          />
        </View>

      </View>
      <View style={style.saticiContainer}>
        <Text style={style.text}>{text}:</Text>
        <View style={style.saticiButtonContainer}>
          <TouchableOpacity style={style.saticiButton1} onPress={button ? (null) : (onPress)}>
            <Text style={style.name}>{name}</Text>
          </TouchableOpacity>

          {name ? (
            <TouchableOpacity style={style.saticiButton2} onPress={button ? (null) : (handleClearName)}>
              <Icon name='close' size={30} color='black' />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={style.saticiContainer}>
        <Text style={style.text}>Açıklama:</Text>
        <TextInput style={style.textInput}
          editable={editable}
          value={description}
          onChangeText={setDescription}
        />
      </View>
    </View>
  );
};

