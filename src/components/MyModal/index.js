import { View, Text, TouchableOpacity, Modal, TextInput, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import style from './style'
import { Button } from '../Button'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CategoryDropdown } from '../CategoryDropdown'
import { Checkbox } from '../Checkbox'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const MyModal = ({ birim, isSelected, setSelection, isModalVisible, setIsModalVisible, item, handlerDelete, deleteIcon, handleQuantityUpdate, okButton, kdvValue, setKdvValue, miktarEditable, fiyatEditable, setFiyatValue, setMiktarValue, miktarValue, fiyatValue, FiyatText }) => {
  console.log(fiyatValue, "fiyatValue");
  console.log(miktarValue, "miktarValue");
  console.log(kdvValue, "KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK222222");
  console.log(item, "üüüüüüüüüüüüüüüüüüüüü");
  const data = [
    { kdv: '1' },
    { kdv: '8' },
    { kdv: '10' },
    { kdv: '18' },
    { kdv: '20' },
  ]

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={style.container}>
        <View style={style.innerContainer}>
          {deleteIcon ? (<View style={style.deleteContainer} >
            <TouchableOpacity onPress={handlerDelete}>
              <Icon name={'delete-outline'} size={30} color='red' />
            </TouchableOpacity>
          </View>) : (null)}


          <ScrollView style={{ maxHeight: windowHeight * 0.07 }}>
            <Text style={{ ...style.text, fontSize: windowHeight * 0.03, color: 'green' }}  >{item?.productName}</Text>
          </ScrollView>


          <Text style={style.text}  >SK: {item?.productCode}</Text>
          {/* <View style={style.aciklamaContainer} >

            <Text style={style.text} >Açıklama:</Text>
            <ScrollView style={{ maxHeight: windowHeight * 0.1, }}>
              <Text style={{ ...style.text, fontSize: windowHeight * 0.02 }}>
                {item?.productDescription}
              </Text>
            </ScrollView>

          </View> */}

          <Text style={style.text}>Stokta: {item?.productQuantity}</Text>

          <View style={style.inputContainer} >

            <Text style={style.text} >{FiyatText}</Text>
            <TextInput
              style={style.textinput}
              value={fiyatValue}
              onChangeText={setFiyatValue}
              editable={fiyatEditable}
              keyboardType='number-pad'
            />
          </View>

          <Checkbox value={isSelected} label={"Kdv Dahil"} onValueChange={setSelection} kdv={true} />

          <CategoryDropdown value={kdvValue} setValue={setKdvValue} data={data} text={"KDV"} kdv1={true} placeholder={"KDV oranı seçiniz"} />

          <View style={style.inputContainer1} >

            <View >
              <Text style={style.text} >Miktar:</Text>
              <TextInput
                style={style.textinput}
                value={miktarValue}
                onChangeText={setMiktarValue}
                editable={miktarEditable}
                keyboardType='number-pad'
              />
            </View>

            <View style={{ justifyContent: 'flex-end', }} >
              <Text style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, bottom: 15, color: 'white' }} >{item?.productPackageType}</Text>

            </View>
          </View>
          <View style={style.buttonContainer}>
            <Button backgroundColor={'red'} text={'İptal'} width={windowWidth * 0.25} color={'white'}
              height={windowHeight * 0.05} onPress={() => setIsModalVisible(false)}
            />
            {
              okButton ? (null) : (<Button backgroundColor={'green'} text={'Tamam'} width={windowWidth * 0.25} color={'white'}
                height={windowHeight * 0.05} onPress={handleQuantityUpdate}
              />)
            }

          </View>
        </View>
      </View>
    </Modal>
  )
}
