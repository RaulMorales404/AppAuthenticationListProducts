import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsScreen from '../screens/products/ProductsScreen';
import ProductScreen from '../screens/products/ProductScreen';
import Home from '../screens/autentication/Home';
import { Categoria } from '../interfaces/Category';



export type ProductsStackParams = {
    ProductsScreen: undefined,
    ProductScreen: { id: string, name?: string, _img?: string, categorifromProd?: Categoria }
    Home: undefined,
}
const Stack = createStackNavigator<ProductsStackParams>();

const configHeader = {
    cardStyle: {
        backgroundColor: 'white',
    },
    headerStyle: {
        elevation: 0,
        shadowColor: 'transparent'
    }
}



const NavigationProducts = () => {
    return (
        <Stack.Navigator
            screenOptions={{ ...configHeader }}>
            <Stack.Screen options={{ title: "Products" }}
                name="ProductsScreen" component={ProductsScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}

export default NavigationProducts;