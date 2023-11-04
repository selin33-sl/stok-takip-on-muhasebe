import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({

    button: {
        width: windowWidth * 0.4,
        height: windowHeight * 0.23,
        margin: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        elevation: 2,

    },
    text: {
        fontSize: windowHeight * 0.03,
        color: '#000E36',
        fontWeight: '300'
    }
});
