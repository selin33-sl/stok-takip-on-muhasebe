import { View, Text, Modal, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'
import { Button } from '../Button'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const CategoryAddModal = ({ isModalVisible, setIsModalVisible, addNewCategory, value, setValue, update, deleteIcon, handlerDelete }) => {


    const handlerIptal = () => {
        setIsModalVisible(false)
        setValue('')
    }


    return (
        <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
        >
            <View style={style.containerModal}>
                <View style={style.innerContainer}>
                    {deleteIcon ? (<View style={style.deleteContainer} >
                        <TouchableOpacity onPress={handlerDelete}>
                            <Icon name={'delete-outline'} size={30} color='white' />
                        </TouchableOpacity>
                    </View>) : (null)}
                    <Text style={style.categoryText}>
                        {update ? 'Kategori Güncelle' : 'Kategori Oluştur'}
                    </Text>

                    <View style={style.inputContainer} >

                        <TextInput
                            style={style.textinput}
                            value={value}
                            onChangeText={setValue}
                            placeholder='Kategori Adı'
                        />
                    </View>
                    <View style={style.buttonContainer}>
                        <Button backgroundColor={'red'} text={'İptal'} width={windowWidth * 0.25} color={'white'}
                            height={windowHeight * 0.05} onPress={handlerIptal}
                        />

                        <Button backgroundColor={'green'} text={'Kaydet'} width={windowWidth * 0.25} color={'white'}
                            height={windowHeight * 0.05} onPress={addNewCategory}
                        />


                    </View>
                </View>
            </View>
        </Modal>
    )
}
