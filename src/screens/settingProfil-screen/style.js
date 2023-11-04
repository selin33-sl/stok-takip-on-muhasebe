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
        padding: windowHeight * 0.05,
        justifyContent: 'center',
    },
    text: {
        fontSize: windowHeight * 0.025,
        color: '#000E36'
    },
    imageContainer: {
        width: windowWidth * 1,
        height: windowHeight * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageInnerContainer: {
        width: windowWidth * 0.4,
        height: windowHeight * 0.2,
        borderRadius: 100,
        borderWidth: 0.01,
        elevation: 5,


    },
    addButtonContainer: {
        width: windowWidth * 0.4,
        height: windowHeight * 0.05,
        position: 'absolute',
        justifyContent: 'space-between',
        bottom: 0,
        flexDirection: 'row',
    },
    addButton: {
        width: windowHeight * 0.045,
        height: windowHeight * 0.045,
        backgroundColor: 'green',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',


    },
    deleteButton: {
        width: windowHeight * 0.045,
        height: windowHeight * 0.045,
        backgroundColor: 'red',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: windowHeight * 0.03,
        fontWeight: '700',
        textAlign: 'auto',
        color: 'white',
    },
    imageStyle: {
        width: windowWidth * 0.4,
        height: windowHeight * 0.2,
        justifyContent: 'center',
        alignSelf: 'center',
        resizeMode: 'stretch',
        borderRadius: 100

    },


});
