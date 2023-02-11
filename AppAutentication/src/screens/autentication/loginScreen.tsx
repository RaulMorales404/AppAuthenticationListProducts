import React from 'react'
import { ActivityIndicator, View } from 'react-native'

 const LoginScreen = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
        }}>
            <ActivityIndicator
                size={50} color="#5856D6"
            />

        </View>
    )
}

export default LoginScreen;