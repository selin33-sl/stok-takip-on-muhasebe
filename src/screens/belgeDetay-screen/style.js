import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#DEE3F0',
        alignItems: 'center',

    },
    checkIcon: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonAdd: {
        borderRadius: 50,
        width: windowWidth * 0.09,
        height: windowWidth * 0.09,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000E36',
        marginHorizontal: 10


    },
    buttonSave: {
        borderRadius: 50,
        width: windowWidth * 0.09,
        height: windowWidth * 0.09,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        marginHorizontal: 10


    },
    buttonText: {
        fontWeight: '500',
        fontSize: windowHeight * 0.03,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',

    },
    addAndSaveContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

    },
    textContainer: {
        width: windowWidth * 0.9,
        flexDirection: 'row',
        height: windowHeight * 0.05,
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    text: {
        fontSize: windowHeight * 0.024,
        fontStyle: 'italic',
        color: '#000E36'
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

    },
    saticiButton2: {
        borderWidth: 1,
        borderColor: '#000E36',
        height: windowHeight * 0.04,
        width: windowWidth * 0.07,
        marginLeft: windowWidth * 0.03,
    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: '#000E36',
        width: windowWidth * 0.8,
        height: windowHeight * 0.05
    },
    listContainer: {
        width: windowWidth * 1,
        borderWidth: 0.01,
        padding: windowWidth * 0.02,
        elevation: 1,
        flex: 1,
        paddingBottom: windowHeight * 0.035
    },






});
