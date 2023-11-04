import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import style from './style';


export const CategoryDropdown = ({ value, setValue, data, city, text, placeholder, city2, kdv1, kdv2 }) => {
    console.log(value, "vvvvvvvvvvvvvvvvvvvvvv");
    const renderItem = item => {
        return (
            <View style={style.item}>

                <Text style={style.textItem}>{city || city2 ? item?.cityName : kdv1 || kdv2 ? item?.kdv : item?.categoryName}</Text>

            </View>
        );
    };

    return (
        <View style={city ? style.container2 : kdv1 ? style.container3 : style.container1}>
            {city ? null : (<Text style={kdv1 ? style.text1 : style.text} >{text}:</Text>)}
            <Dropdown
                style={city ? style.dropdown2 : kdv1 ? style.dropdown3 : style.dropdown1}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={kdv1 ? { ...style.selectedTextStyle, color: "white" } : style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                data={data}
                search
                // maxHeight={300}
                labelField={city || city2 ? "cityName" : kdv1 || kdv2 ? "kdv" : "categoryName"}
                valueField={city2 ? "cityName" : city ? "cityName" : kdv1 || kdv2 ? "kdv" : "_id"}
                placeholder={placeholder}
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                    console.log(item, "11111111111111111111111");
                    setValue(city2 ? item?.cityName : city ? item?.cityName : kdv1 || kdv2 ? item?.kdv : item?._id);
                }}

                renderItem={renderItem}
            />
        </View>
    );
}


