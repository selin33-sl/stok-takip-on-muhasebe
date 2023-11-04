import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
    textInput: {
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
    errorText: {
        color: 'red',
        fontSize: windowHeight * 0.02
    }
});
