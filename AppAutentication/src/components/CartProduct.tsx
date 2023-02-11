import React, { useContext } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Producto } from '../interfaces/Products';
import { ProductsContext } from '../context/ProductsContext';

interface Props {
    product: Producto,
    action: (producto: Producto) => void,
}

const CartProduct = ({ product, action }: Props) => {
    const { deleteProduct } = useContext(ProductsContext);
    const widthScreen = Dimensions.get('screen').width;
    const showCartProduct = () => {
        return (<TouchableOpacity style={{
            ...styles.button,
            width: widthScreen - 60,

        }} activeOpacity={0.8}
            onPress={() => action({ ...product })}
        >
            <Text style={{ ...styles.tile }}>{product.nombre}</Text>
        </TouchableOpacity>)
    }
    const showOption = () => {
        return (<TouchableOpacity style={{
            ...styles.button,
            backgroundColor: 'white',
            width: widthScreen - 110,
            marginLeft: 10,
            alignItems: 'center',
            borderColor: '#D40707',
            borderWidth: 2,

        }} activeOpacity={0.8}
            onPress={() => deleteProduct(product._id)}
        >
            <Text style={{
                ...styles.tile,
                color: '#D40707',
                fontWeight: "400",
            }}>Eliminar Producto</Text>
        </TouchableOpacity>)
    }




    return (
        <FlatList
            data={[1, 2]}
            renderItem={({ item }) => {
                return item === 1 ? showCartProduct() : showOption()
            }}

            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}


        />

    )
}

export default CartProduct;


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#5856D6',
        padding: 15,
        borderRadius: 8,
        shadowColor: "#a0a0a0",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    tile: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',

    }
})