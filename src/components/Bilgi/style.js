import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
    container: {
        height: windowHeight * 0.33,
        elevation: 1,
        borderWidth: 0.1,
        marginBottom: windowHeight * 0.01
    },
    innerContainer: {
        backgroundColor: '#DEE3F0',
        alignItems: 'center',

    },
    buttonContainer: {
        height: windowHeight * 0.035,
        alignItems: 'flex-end'
    },
    checkIcon: {
        marginRight: windowWidth * 0.02,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        width: windowWidth * 0.9,
        flexDirection: 'row',
        height: windowHeight * 0.05,
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: windowHeight * 0.01

    },
    textContainer2: {
        alignItems: 'center',
        margin: windowHeight * 0.01,
        flexDirection: 'row',
        height: windowHeight * 0.05,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: windowHeight * 0.016,
        fontStyle: 'italic',
        color: '#000E36',
        textAlign: 'center'
    },
    text2: {
        fontSize: windowHeight * 0.02,
        fontStyle: 'italic',
        color: '#000E36'
    },
    saticiContainer: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.08,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: windowHeight * 0.01



    },
    saticiButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: windowHeight * 0.05,



    },
    saticiButton1: {
        height: windowHeight * 0.05,
        borderBottomWidth: 1,
        width: windowWidth * 0.8,
        justifyContent: 'center',


    },
    saticiButton2: {
        height: windowHeight * 0.04,
        width: windowWidth * 0.07,
        marginLeft: windowWidth * 0.03,
        justifyContent: 'center',
        alignItems: 'center'


    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: '#000E36',
        width: windowWidth * 0.8,
        height: windowHeight * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        fontSize: windowHeight * 0.015
    },
    name: {
        fontSize: windowHeight * 0.025,
        color: '#000E36',
        fontWeight: '600'
    }






});
