import React, { useContext } from 'react'
import { StyleSheet, Text, Touchable, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { loginStyles } from '../../themes/loginStyles';

const Home = () => {
    const { user, token, logOut } = useContext(AuthContext);
    return (
        <View style={{ ...styles.container }}>
            <Text style={{
                ...loginStyles.textTitle,
                color: "#5856D6",
                marginBottom: 50,
            }}>
                Protectec Screens
            </Text>
            <Text>
                {JSON.stringify(user, null, 4)}
            </Text>
            <View style={{
                ...styles.container,
                flex: 0,
                paddingHorizontal: 50,
            }}
            >
                <Text style={{
                    ...loginStyles.textTitle,
                    color: "#5856D6",
                    alignSelf: 'flex-start'
                }}>
                    Token
                </Text>
                <Text style={{ margin: 5 }}>
                    {JSON.stringify(token, null, 4)}
                </Text>
            </View>


            <TouchableOpacity
                activeOpacity={0.8}
                style={{ ...styles.button }}
                onPress={logOut}

            >

                <Text style={{ ...loginStyles.textButton }}>
                    Cerrar secion
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: "#5856D6",
        padding: 10,
        width: 200,
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 50,
    }
})