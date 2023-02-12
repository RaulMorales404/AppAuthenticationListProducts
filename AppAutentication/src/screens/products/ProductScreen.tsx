import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Producto } from '../../interfaces/Products';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../../navigations/NavigationProducts';
import { ScrollView } from 'react-native-gesture-handler';
import { ProductsContext } from '../../context/ProductsContext';
import { useCategories } from '../../hooks/useCategories';
import { useForm } from '../../hooks/useForm';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { RespImagePiker } from '../../interfaces/RespImagePiker';
import LoginScreen from '../autentication/loginScreen';


interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { }

const ProductScreen = ({ route, navigation }: Props) => {
    const [tempUri, setTempUri] = useState<string>("");
    const [isLoadingImg, setIsLoadingImg] = useState<boolean>(false);
    const { id, name, _img = '', categorifromProd } = route.params;
    const { loadProductById, updateProduct, addProducts, uploadImage } = useContext(ProductsContext);
    const [producto, setProducto] = useState<Producto[]>([]);
    const { categories } = useCategories();
    const [showCategory, setShowCategory] = useState('')

    const { _id, nombre, img, categoriaId, form, onChange } = useForm({
        _id: id,
        categoriaId: categorifromProd?._id,
        nombre: name,
        img: _img,
    });
    const changeHeaderName = () => {
        navigation.setOptions({
            headerTitle: nombre === '' ? 'Nombre Del Producto' : nombre,
        });

    }

    const saveOrUpdate = async () => {


        if (categoriaId !== '' && categoriaId !== '1' && nombre !== '') {
            if (id && categoriaId !== '' && categoriaId !== '1' && nombre !== '') {

                const resp = await updateProduct(nombre!, categoriaId!, id);


                //productName: string, categoryId: string, idProducto: string
            } else {
                const resp = await addProducts(nombre!, categoriaId!);
                onChange(resp._id, '_id');
                console.log(resp._id, "id ", id);

                //productName: string, categoryId: string
            }
        }
    }


    useEffect(() => {
        changeHeaderName();
    }, [nombre])

    useEffect(() => {
        getProduct();
        categorifromProd?._id !== '' && setShowCategory(categorifromProd?.nombre!);

    }, []);
    useEffect(() => {
        categorifromProd?._id !== '' && setShowCategory(categorifromProd?.nombre!);

    }, []);

    const getProduct = async () => {
        if (id.length === 0) return;
        const producto = await loadProductById(id);
        setProducto([{ ...producto }])
    }


    const takePicture = async () => {
        setIsLoadingImg(true);
        const response = await launchCamera({
            mediaType: 'photo',
            quality: 0.5,
        });
        if (response.didCancel) {
            setIsLoadingImg(false);
            return;
        }
        if (!(response!.assets![0].uri)) {
            setIsLoadingImg(false);
            return;
        }

        setTempUri(response!.assets![0]!.uri);

        setIsLoadingImg(false);
        try {
            await uploadImage(response, _id);

        } catch (error) {
            console.log(error)

        } finally {
            setIsLoadingImg(false);
        }

    }

    const takeFromGarelly = async () => {

        const response = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
        });
        setIsLoadingImg(true);
        if (response.didCancel) {
            setIsLoadingImg(false);
            return;
        }
        if (!(response!.assets![0].uri)) {
            setIsLoadingImg(false);
            return;
        }
        setTempUri(response!.assets![0]!.uri);

        try {
            await uploadImage(response, _id);

        } catch (error) {
            console.log(error)

        } finally {
            setIsLoadingImg(false);
        }

    }



    return (
        <View style={{ ...styles.container }}>
            <ScrollView showsVerticalScrollIndicator={false}
                style={{ marginBottom: 20, }} >
                <View style={{ marginTop: 30, }}>
                    <Text style={{ ...styles.textLabel }} >
                        Categoria:{showCategory !== 'Selecciona' ? showCategory : ''}
                    </Text>

                    <Picker
                        style={{ color: '#000' }}
                        selectedValue={categoriaId}
                        onValueChange={(value, itemIndex) => {
                            onChange(value, 'categoriaId');
                            setShowCategory(categories[itemIndex].nombre);
                        }


                        }>
                        {categories.map((categoria) => (
                            <Picker.Item key={categoria._id}
                                label={categoria.nombre}
                                value={categoria._id} />
                        ))
                        }

                    </Picker>



                    <Text style={{ ...styles.textLabel }} >
                        Nombre del Producto:
                    </Text>
                    <TextInput
                        placeholder='...Producto'
                        placeholderTextColor={'gray'}
                        style={{ ...styles.textInput }}
                        autoCorrect={false}
                        autoCapitalize='words'
                        onChangeText={(value) => onChange(value, 'nombre')}
                        value={nombre}
                    />

                    <TouchableOpacity style={{ ...styles.button, marginTop: '20%' }}
                        activeOpacity={0.8}
                        onPress={saveOrUpdate}
                    >
                        <Text style={{ ...styles.textButton }}>Guardar</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'space-between'
                }}
                >
                    {(_id.length > 0) && (<>

                        <TouchableOpacity style={{
                            ...styles.button,
                            width: '40%'
                        }}
                            onPress={takePicture}
                            activeOpacity={0.8}
                        >
                            <Text style={{ ...styles.textButton, }}>Camara</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={takeFromGarelly}
                            style={{ ...styles.button, width: '40%' }}
                            activeOpacity={0.8}

                        >
                            <Text style={{ ...styles.textButton }}>Galeria</Text>
                        </TouchableOpacity>
                    </>)}

                </View>


                {img.length !== 0 && !tempUri &&
                    <Image source={{ uri: img }}
                        style={{
                            marginTop: 20,
                            width: '100%',
                            height: 300
                        }}
                    />}

                {tempUri &&
                    <><View>
                        <Image source={{ uri: tempUri }}
                            style={{
                                marginTop: 20,
                                width: '100%',
                                height: 300
                            }}
                        />
                        <View style={{
                            backgroundColor: 'rgba(229,229,229,0.4)',
                            position: 'absolute',
                            top: '50%',
                            left: '45%',
                            borderRadius: 100,

                        }}>

                            {isLoadingImg && <LoginScreen />}
                        </View>
                    </View>


                    </>
                }


            </ScrollView >
        </View>

    )
}

export default ProductScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30,
    },
    textLabel: {
        color: 'black',
        fontSize: 18,
        fontWeight: '500',
    },
    textInput: {
        marginTop: 10,
        paddingVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 2,
        color: '#000',
        borderRadius: 18,
        padding: 10,
        height: 45,
    },
    button: {
        backgroundColor: '#5856D6',
        padding: 15,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600'

    }
})