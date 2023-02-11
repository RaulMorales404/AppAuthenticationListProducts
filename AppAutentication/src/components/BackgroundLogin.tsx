import React from 'react'
import { StyleSheet, View, Platform } from 'react-native';
import Logo from './Logo';


const BackgroundLogin = () => {
    return (
        <View style={{
            ...styles.container,
            top: Platform.OS === 'android' ? -200 : -250,
            height: Platform.OS === 'android' ? 1240 : 1200,
        }}>


        </View>
    )
}

export default BackgroundLogin;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: -250,
        backgroundColor: '#5856D6',
        width: 1000,
        height: 1200,
        transform: [
            {
                rotate: '-70deg'
            }
        ]

    }
})