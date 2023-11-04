import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
    container: {
        maxHeight: windowHeight * 0.07,
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#DEE3F0',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        padding: windowWidth * 0.02

    },
    firstIcon: {
        color: '#000E36',
        position: 'absolute',
        justifyContent: 'flex-start'

    },
    plusIcon: {
        color: 'white',
        position: 'absolute',
        justifyContent: 'flex-end',
    },
    secondIcon: {
        color: '#000E36',
        position: 'absolute',
        justifyContent: 'flex-end',
    },
    text: {
        fontSize: windowHeight * 0.03,
        justifyContent: 'center',

        position: 'absolute',
        fontWeight: '600'
    },
    iconContainerFirst: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconContainerSecond: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'red',
        width: windowWidth * 0.05
    },
    button: {
        borderRadius: 50,
        maxWidth: windowWidth * 0.09,
        height: windowWidth * 0.09,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',


    },
    textButton: {
        borderRadius: 20,
        backgroundColor: 'red',
        width: windowWidth * 0.2,
        height: windowWidth * 0.07,
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        fontWeight: '600',
        fontSize: windowHeight * 0.03,
        color: 'white',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlignVertical: 'center'

    },
    buttonText2: {
        fontSize: windowHeight * 0.015,
        color: 'white',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlignVertical: 'center'
    }



});
