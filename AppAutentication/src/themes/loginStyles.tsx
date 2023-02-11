import { StyleSheet } from "react-native";


export const loginStyles = StyleSheet.create({
    containerForm: {
        flex: 1,
        marginHorizontal: 30,
        height: 600,
        marginBottom: 50,
    },
    textTitle: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
    },
    textIndicator: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 18,
        color: '#c9c9c9',
        fontWeight: '400',

    },
    label: {
        marginTop: 25,
        color: 'white',
        fontWeight: 'bold',
    },
    inputText: {
        marginTop: 25,
        color: 'white',
        fontWeight: '400',
        fontSize: 18,

    },
    inputTextIos: {
        borderBottomWidth: 2,
        borderColor: 'white',
        padding: 5,

    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    button: {
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 2,
        padding: 15,
        width: "80%",
        borderRadius: 20,
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',

    }

})