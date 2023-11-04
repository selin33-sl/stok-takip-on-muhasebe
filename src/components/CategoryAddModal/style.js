import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flexDirection: "row",
        height: windowHeight * 0.06,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(217, 217, 217, 0.70)',
    },
    categoryAdd: {
        backgroundColor: '#14FF00',
        borderRadius: 100,
        width: windowWidth * 0.1,
        height: windowHeight * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3
    },
    addText: {
        fontSize: windowHeight * 0.03,
        color: '#000E36',
        fontWeight: 'bold',
        marginVertical: 'auto',

    },
    button: {
        borderRadius: 100,
        margin: 3,
        height: windowHeight * 0.04,
        width: windowWidth * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 'auto'

    },
    buttonText: {
        textAlign: 'center',
        fontSize: windowHeight * 0.013,
        marginVertical: 'auto'

    },
    textinput: {
        fontSize: windowHeight * 0.02,
        color: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        width: windowWidth * 0.5,
        minHeight: windowHeight * 0.015,

    },
    text: {
        fontStyle: 'italic',
        fontSize: windowHeight * 0.02,
        color: 'white',
        margin: windowWidth * 0.01

    },
    inputContainer: {
        alignItems: 'flex-start',
        width: windowWidth * 0.6,
        minHeight: windowHeight * 0.07,
    },
    innerContainer: {
        width: windowWidth * 0.7,
        height: windowHeight * 0.3,
        borderRadius: 10,
        backgroundColor: '#000E36',
        padding: windowWidth * 0.03,


    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',

    },
    categoryText: {
        fontSize: windowHeight * 0.03,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
        marginBottom: '10%'
    },
    deleteContainer: {
        flexDirection: 'row',
        width: windowWidth * 0.64,
        height: windowHeight * 0.04,
        justifyContent: 'flex-end',
        alignItems: 'center',

    },






});
