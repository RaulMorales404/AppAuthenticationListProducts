import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Text, View, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import { ProductsContext } from '../../context/ProductsContext';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../../navigations/NavigationProducts';
import CartProduct from '../../components/CartProduct';
import { Producto } from '../../interfaces/Products';
import LoginScreen from '../autentication/loginScreen';


interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> { }

const ProductsScreen = ({ navigation }: Props) => {
    const { isLoadinProducts, products, loadProducts } = useContext(ProductsContext);
    const tall = Dimensions.get('screen').fontScale;
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    const changeHeader = () => {
        navigation.setOptions({
            headerRight: () =>
                <TouchableOpacity
                    activeOpacity={0.7} style={{ paddingHorizontal: 40 }}
                    onPress={() => navigation.navigate('ProductScreen', { id: '', name: '' })}
                >
                    <Text style={{ color: 'gray' }} >Agregar</Text>
                </TouchableOpacity>
        })
    }
    useEffect(() => {
        changeHeader();
        return () => {

        }
    }, [])


    if (isLoadinProducts) return <LoginScreen />;



    const goProductScreen = ({ _id, nombre, img, categoria }: Producto) => {
        navigation.navigate('ProductScreen', {
            id: _id,
            name: nombre,
            _img: img || '',
            categorifromProd: categoria,
        });

    }

    const onRefresh = async () => {
        setIsRefreshing(true);
        await loadProducts();
        setIsRefreshing(false);
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 30, }}>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        //que tan abajo debe de estas
                        progressViewOffset={tall / 2}
                        //color de fondo
                        progressBackgroundColor={'white'}
                        colors={['#5856D6']}
                        //color para ios
                        tintColor={'#5856D6'}
                        title={'Cargando data'}
                    />

                }
                data={products}
                renderItem={({ item }) => <CartProduct product={item} action={goProductScreen} />}
                ItemSeparatorComponent={() => <View style={{ height: 8, }} />}
                keyExtractor={(item, index) => item._id}
                showsVerticalScrollIndicator={false}

            />


        </View>
    )
}

export default ProductsScreen;