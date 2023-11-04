import { View, Text, ScrollView, TouchableOpacity, Dimensions, Modal, TextInput } from 'react-native'
import React, { useState } from 'react'
// import { categories } from '../../data'
import { Button as PaperButton } from 'react-native-paper';
import style from './style';
import { Button } from '../Button'
import { getProductsByCategoryProcess } from '../../api';
import { useDispatch } from 'react-redux';
import { CategoryAddModal } from '../CategoryAddModal';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Categories = ({ value, setValue, addNewCategory, categories,
    isModalVisible, setIsModalVisible, categoryId, setCategoryId, }) => {

    const [category1, setCategory1] = useState([])
    const [all, setAll] = useState(true)
    const dispatch = useDispatch();


    const categoryButtonHandler = (id) => {

        setCategory1(id);
        setAll(false)
        setCategoryId(id)
        console.log(id, "iiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        dispatch(getProductsByCategoryProcess({
            categoryId: id
        }))
    };


    const handlerIptal = () => {
        setIsModalVisible(false)
        setValue('')
    }


    return (
        <View style={style.container}>
            <Text style={style.kategorilerText} >Kategoriler</Text>
            <TouchableOpacity
                style={style.categoryAdd}
                onPress={() => setIsModalVisible(true)}
            >
                <Text style={style.addText}>+</Text>
            </TouchableOpacity>


            <ScrollView
                horizontal
                contentContainerStyle={{ alignItems: "center" }}
                showsHorizontalScrollIndicator={false}
            >
                <TouchableOpacity
                    style={{
                        ...style.button,
                        backgroundColor: all ? '#B5C9FE' : '#000E36',
                    }}
                    onPress={() => { setAll(true), setCategory1(false), setCategoryId('') }}
                >
                    <Text style={style.buttonText}>Tümü</Text>
                </TouchableOpacity>

                {categories?.map((item, index) => (
                    <PaperButton
                        key={item._id}
                        style={{
                            ...style.button,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: category1 === item._id ? '#B5C9FE' : '#000E36',
                        }}
                        onPress={() => categoryButtonHandler(item._id)}
                    >
                        <Text
                            style={{
                                ...style.buttonText,
                                textAlign: 'center',
                                color: category1 === item._id ? 'black' : "gray",
                            }}
                        >
                            {item.categoryName}
                        </Text>
                    </PaperButton>
                ))}
            </ScrollView>


            <CategoryAddModal

                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                value={value}
                setValue={setValue}
                handlerIptal={handlerIptal}
                addNewCategory={addNewCategory}

            />


        </View>
    )
}
