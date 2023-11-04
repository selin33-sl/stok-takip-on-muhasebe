import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(217, 217, 217, 0.70)',
    },

    innerContainer: {
        width: windowWidth * 0.7,
        height: windowHeight * 0.7,
        borderRadius: 10,
        backgroundColor: '#000E36',
        padding: windowWidth * 0.03

    },
    inputContainer: {
        alignItems: 'flex-start',
        width: windowWidth * 0.6,
        minHeight: windowHeight * 0.08,
    },
    inputContainer1: {
        flexDirection: 'row',
        // alignItems: 'flex-start',
        width: windowWidth * 0.6,
        minHeight: windowHeight * 0.08,
    },
    aciklamaContainer: {
        alignItems: 'flex-start',
        width: windowWidth * 0.6,
        minHeight: windowHeight * 0.1,
        maxHeight: windowHeight * 0.2,
    },
    textinput: {
        fontSize: windowHeight * 0.02,
        color: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        width: windowWidth * 0.5,
        minHeight: windowHeight * 0.02,

    },
    text: {
        fontStyle: 'italic',
        fontSize: windowHeight * 0.02,
        color: 'white',
        margin: windowWidth * 0.01

    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',

    },
    deleteContainer: {
        flexDirection: 'row',
        width: windowWidth * 0.64,
        height: windowHeight * 0.04,
        justifyContent: 'flex-end',
        alignItems: 'center',

    }





});
