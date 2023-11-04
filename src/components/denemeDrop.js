import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const DropdownComponent = ({ value, setValue, data }) => {

    const renderItem = item => {
        console.log(item.label, "ğğğğğğğğğğğğğğğğğğğğğğğ");
        return (
            <View style={styles.item}>

                <Text style={styles.textItem}>{item?.categoryName}</Text>

            </View>
        );
    };

    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            width: windowWidth * 0.9,
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Text style={{
                flex: 1,
                fontStyle: 'italic',
                fontSize: windowHeight * 0.02,
                color: '#000E36',
                textAlign: 'center',
                width: windowWidth * 0.3,
            }} >Kategori:</Text>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                // maxHeight={300}
                labelField="categoryName"
                valueField="_id"
                placeholder="Kategori seç"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                    setValue(item.value);
                }}

                renderItem={renderItem}
            />
        </View>
    );
};

export default DropdownComponent;

