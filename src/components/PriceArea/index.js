import style from './style'
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const PriceArea = ({ toplamAdet, araToplam, kdv, kdvToplam, genelToplam, kdv20, kdv18, kdv10, kdv8, kdv1, degerkdv20, degerkdv10, degerkdv18, degerkdv8, degerkdv1 }) => {
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [modalHeight, setModalHeight] = useState(30); // Modalın başlangıç yüksekliği

    const toggleModal = () => {
        if (isModalVisible2) {
            // Modal kapanırken yüksekliği sıfırla
            setModalHeight(windowHeight * 0.04);
        }
        setModalVisible2(!isModalVisible2);
    };

    const expandModal = () => {
        // Modalı açarken yüksekliği artır
        setModalHeight('100%'); // İstediğiniz yüksekliği ayarlayabilirsiniz
        toggleModal();
    };

    return (


        <View style={{ ...style.container, height: isModalVisible2 ? toggleModal : expandModal, }}>


            <View style={style.buttonContainer}>
                <TouchableOpacity onPress={isModalVisible2 ? toggleModal : expandModal} style={style.button} >
                    <Icon name={isModalVisible2 ? 'chevron-down' : 'chevron-up'} size={30} color={'white'} />
                </TouchableOpacity>

            </View>

            <View style={{ ...style.innerContainer, height: modalHeight, }} >
                <View style={style.textContainer} >
                    <Text style={style.text}>
                        Toplam Adet:
                    </Text>
                    <Text style={style.text}>
                        {toplamAdet}
                    </Text>
                </View>
                <View style={style.textContainer} >
                    <Text style={style.text}>
                        Ara Toplam:
                    </Text>
                    <Text style={style.text}>
                        {araToplam} TL
                    </Text>
                </View>

                {kdv20 &&
                    <View style={style.textContainer} >
                        <Text style={style.text}>
                            KDV %20:
                        </Text>
                        <Text style={style.text}>
                            {degerkdv20} TL
                        </Text>
                    </View>}

                {kdv18 &&
                    <View style={style.textContainer} >
                        <Text style={style.text}>
                            KDV %18:
                        </Text>
                        <Text style={style.text}>
                            {degerkdv18} TL
                        </Text>
                    </View>}
                {kdv10 &&
                    <View style={style.textContainer} >
                        <Text style={style.text}>
                            KDV %10:
                        </Text>
                        <Text style={style.text}>
                            {degerkdv10} TL
                        </Text>
                    </View>}
                {kdv8 &&
                    <View style={style.textContainer} >
                        <Text style={style.text}>
                            KDV %8:
                        </Text>
                        <Text style={style.text}>
                            {degerkdv8} TL
                        </Text>
                    </View>
                }
                {kdv1 &&
                    <View style={style.textContainer} >
                        <Text style={style.text}>
                            KDV %1:
                        </Text>
                        <Text style={style.text}>
                            {degerkdv1} TL
                        </Text>
                    </View>}


                <View style={style.textContainer} >
                    <Text style={style.text}>
                        KDV Toplam:
                    </Text>
                    <Text style={style.text}>
                        {kdvToplam} TL
                    </Text>
                </View>
                <View style={style.textContainer} >
                    <Text style={style.text}>
                        Genel Toplam:
                    </Text>
                    <Text style={style.text}>
                        {genelToplam} TL
                    </Text>
                </View>

            </View>

        </View>




    )

}


// return (
//     <View style={style.container} >

//         <View style={style.textContainer} >
//             <Text style={style.text}>
//                 Ara Toplam:
//             </Text>
//             <Text style={style.text}>
//                 0.00 TL
//             </Text>
//         </View>
//         <View style={style.textContainer} >
//             <Text style={style.text}>
//                 KDV:
//             </Text>
//             <Text style={style.text}>
//                 %20
//             </Text>
//         </View>
//         <View style={style.textContainer} >
//             <Text style={style.text}>
//                 Toplam:
//             </Text>
//             <Text style={style.text}>
//                 0.00 TL
//             </Text>
//         </View>

//     </View>
// )
