import React, { useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { loginStyles } from '../../themes/loginStyles';
import Logo from '../../components/Logo';
import { useForm } from '../../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../../context/AuthContext';

interface Props extends StackScreenProps<any, any> {

}
const Register = ({ navigation }: Props) => {

    const { singUp, errorMessage, removeMessage } = useContext(AuthContext);

    const { email, password, name, onChange } = useForm({
        name: '',
        email: '',
        password: ''
    });

    const onRegister = () => {


        if (email !== '' && password !== '' && name !== '') {
            singUp({ email, password, name });
      
        }

    }

    useEffect(() => {
        if (errorMessage !== '') {
            Alert.alert("Registro fallido", errorMessage,
                [{
                    text: 'Ok',
                    onPress: removeMessage
                }
                ]);
        }
    }, [errorMessage])

    return (

        <>
            <View style={{
                backgroundColor: '#5856D6',
                height: '11%',
                position: 'relative',
                justifyContent: 'flex-end',
            }}>
                <TouchableOpacity
                    onPress={() => navigation.replace('Login')}
                    activeOpacity={0.8}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        padding: 10,
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                        marginHorizontal: 20,
                    }}
                >
                    <Icon name="chevron-back-outline" size={30} color="#5856D6" />
                </TouchableOpacity>
            </View>
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    backgroundColor: '#5856D6'
                }}
                behavior={(Platform.OS === 'ios' ? 'padding' : 'height')}
            >


                <View style={{ ...loginStyles.containerForm }}>
                    <Logo />
                    <Text style={{ ...loginStyles.textTitle }}>
                        Registro
                    </Text>
                    <Text style={{ ...loginStyles.label }}>Name:</Text>
                    <TextInput
                        style={
                            [loginStyles.inputText,
                            Platform.OS === 'ios' && loginStyles.inputTextIos]
                        }
                        placeholder='User name'
                        placeholderTextColor={'rgba(255,255,255,0.4)'}
                        underlineColorAndroid='white'
                        selectionColor={'white'}
                        autoCapitalize='words'
                        autoCorrect={false}
                        onSubmitEditing={onRegister}
                        onChangeText={(value) => onChange(value, 'name')}

                    />

                    <Text style={{ ...loginStyles.label }}>Email:</Text>
                    <TextInput
                        style={
                            [loginStyles.inputText,
                            Platform.OS === 'ios' && loginStyles.inputTextIos]
                        }
                        placeholder='Ingrese su Emil'
                        placeholderTextColor={'rgba(255,255,255,0.4)'}
                        keyboardType='email-address'
                        underlineColorAndroid='white'
                        selectionColor={'white'}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onSubmitEditing={onRegister}
                        onChangeText={(value) => onChange(value, 'email')}

                    />
                    <Text style={{ ...loginStyles.label }}>Password:</Text>
                    <TextInput
                        style={
                            [loginStyles.inputText,
                            Platform.OS === 'ios' && loginStyles.inputTextIos]
                        }
                        placeholder='*********'
                        placeholderTextColor={'rgba(255,255,255,0.4)'}
                        underlineColorAndroid='white'
                        autoCorrect={false}
                        secureTextEntry
                        selectionColor={'white'}
                        onSubmitEditing={onRegister}
                        onChangeText={(value) => onChange(value, 'password')}
                    />

                    {/* button login */}
                    <View style={{ ...loginStyles.buttonContainer }}>
                        <TouchableOpacity activeOpacity={0.7}
                            onPress={onRegister}
                            style={{
                                ...loginStyles.button,
                                backgroundColor: 'white',
                            }}
                        >
                            <Text style={{ ...loginStyles.textButton, color: '#5856D6', }} >
                                Crear cuenta
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </KeyboardAvoidingView>
        </>
    )

}

export default Register