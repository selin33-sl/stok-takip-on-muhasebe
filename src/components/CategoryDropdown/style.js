import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container1: {
        flex: 1,
        flexDirection: 'row',
        width: windowWidth * 0.9,
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    container3: {
        flex: 1,
        flexDirection: 'row',
        width: windowWidth * 0.6,
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    container2: {

        flex: 1,
        width: windowWidth * 0.9,
        justifyContent: 'center',
        alignItems: 'center',

    },
    dropdown1: {
        flex: 2,
        fontSize: windowHeight * 0.02,
        color: '#000E36',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: windowWidth * 0.4,
        height: windowHeight * 0.06,
    },
    dropdown2: {
        width: windowWidth * 0.6,
        height: windowHeight * 0.07,
        borderColor: '#000E36',
        borderWidth: 1,
        fontSize: windowHeight * 0.02,
        borderRadius: 10,
        margin: windowHeight * 0.02,
        paddingLeft: '2%',
        color: 'black'
    },
    dropdown3: {
        fontSize: windowHeight * 0.02,
        color: '#000E36',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        width: windowWidth * 0.4,
        height: windowHeight * 0.05,
    },

    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
        color: 'black'
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'grey'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: 'black'

    },
    text: {
        flex: 1,
        fontStyle: 'italic',
        fontSize: windowHeight * 0.02,
        color: '#000E36',
        textAlign: 'center',
        width: windowWidth * 0.3,
    },
    text1: {
        fontStyle: 'italic',
        fontSize: windowHeight * 0.02,
        color: 'white',
        margin: windowWidth * 0.01,
    }
});
