import React from 'react'
import { Image, View, Platform } from 'react-native';

const Logo = () => {
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 6000,
            flex: Platform.OS === 'android' ? 0.7 : 0.8,
        }}>
            <Image
                style={{ width: 110, height: 100 }}
                source={require("./../assets/logo/react-logo-white.png")} />
        </View>
    )
}

export default Logo