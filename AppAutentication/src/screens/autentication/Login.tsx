import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BackgroundLogin from '../../components/BackgroundLogin';
import Logo from '../../components/Logo';
import { loginStyles } from '../../themes/loginStyles';
import { useForm } from '../../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../../context/AuthContext';

interface Props extends StackScreenProps<any, any> { }

const Login = ({ navigation }: Props) => {
    const { singIn, errorMessage, removeMessage } = useContext(AuthContext);
    const { state, email, password, onChange } = useForm({
        email: '',
        password: '',
    })
    const onLogin = () => {
        console.log({ email, password, })
        singIn({
            correo: email,
            password: password
        });
        Keyboard.dismiss();
    }

    useEffect(() => {
        if (errorMessage !== "") {
            Alert.alert('login Incorrecto', errorMessage, [{
                text: 'Ok', onPress: removeMessage
            }]);
        }

        return () => {
        }
    }, [errorMessage]);


    return (
        <>
            <BackgroundLogin />

            <KeyboardAvoidingView
                style={{
                    flex: 1,
                }}
                behavior={(Platform.OS === 'ios' ? 'padding' : 'height')}
            >
                <View style={{ ...loginStyles.containerForm }}>
                    <Logo />
                    <Text style={{ ...loginStyles.textTitle }}>
                        Login
                    </Text>

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
                        onSubmitEditing={onLogin}
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
                        onSubmitEditing={onLogin}
                        onChangeText={(value) => onChange(value, 'password')}
                    />

                    {/* button login */}
                    <View style={{ ...loginStyles.buttonContainer }}>
                        <TouchableOpacity activeOpacity={0.7} onPress={onLogin} style={{ ...loginStyles.button }}                 >
                            <Text style={{ ...loginStyles.textButton }} >
                                Login
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View>
                        <Text style={{ ...loginStyles.textIndicator }}>
                            or
                        </Text>

                    </View>

                    <View style={{ ...loginStyles.buttonContainer }}>
                        <TouchableOpacity activeOpacity={0.7} style={{ ...loginStyles.button }}
                            onPress={() => navigation.replace('Register')}
                        >
                            <Text style={{ ...loginStyles.textButton }} >
                                Create a count
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

export default Login