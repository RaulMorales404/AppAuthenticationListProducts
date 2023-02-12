import { createContext, useState, useEffect } from "react";
import { Producto, ProductsResponse } from "../interfaces/Products";
import cafeApi from '../apis/cafeApi';

import { useCategories } from "../hooks/useCategories";
import { useNavigation } from "@react-navigation/native";
import { ImagePickerResponse } from "react-native-image-picker";




type ProductsContextProps = {
    products: Producto[],
    isLoadinProducts: boolean,
    loadProducts: () => Promise<void>,
    addProducts: (productName: string, categoryId: string) => Promise<Producto>,
    updateProduct: (productName: string, categoryId: string, idProducto: string) => Promise<Producto>,
    deleteProduct: (productId: string) => Promise<Producto>,
    loadProductById: (idProduct: string) => Promise<Producto>,
    uploadImage: (data: any, id: string) => Promise<Producto>,
}


export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductosProvider = ({ children }: any) => {
    const navigation = useNavigation();
    const { getCategories } = useCategories()
    const [isLoadinProducts, setIsLoadingProducts] = useState<boolean>(true);
    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
        loadProducts();
        getCategories();
    }, [])

    const loadProducts = async () => {
        try {
            const { data } = await cafeApi.get<ProductsResponse>('/productos?limite=40');
            // setProducts([...products, ...data.productos]);
            setProducts([...data.productos]);
            setIsLoadingProducts(false);
            // console.log(data.productos)
        } catch (error) {
            console.log(error)
        }

    };
    const addProducts = async (productName: string, categoryId: string): Promise<Producto> => {

        const resp = await cafeApi.post<Producto>('productos', {
            "nombre": productName,
            "categoria": categoryId,
        })

        loadProducts();
        setProducts([...products, resp.data]);
        return resp.data;
        // navigation.goBack();


        // console.log(productName, categoryId);
    };
    const updateProduct = async (productName: string, categoryId: string, idProducto: string): Promise<Producto> => {
        const { data } = await cafeApi.put<Producto>('productos/' + idProducto, {
            "nombre": productName,
            "categoria": categoryId,
        })
        setProducts(
            products.map((producto) => producto._id === data._id ? data : producto)
        );
        return data;

    };
    const deleteProduct = async (productId: string) => {

        const resp = await cafeApi.delete<Producto>('productos/' + productId);
        if (resp.status === 200) {
            setProducts(
                products.filter((producto) => producto._id !== resp.data._id)
            );
        }

        return resp.data;

    };
    const loadProductById = async (idProduct: string): Promise<Producto> => {
        const resp = await cafeApi.get<Producto>(`/productos/${idProduct}`);
        return resp.data;
    };
    
    const uploadImage = async (data: ImagePickerResponse, id: string) => {
        console.log(id);
        const { uri, type, fileName } = data!.assets![0];
        const fileToUploade = {
            uri: uri,
            type: type,
            name: fileName,
        }

        const formData = new FormData();
         formData.append('archivo', fileToUploade);
        console.log(formData)

        
        const resp = await cafeApi.put('/uploads/productos/' + id, formData);
        console.log(resp);
        return resp.data;

    };


    return (
        <ProductsContext.Provider
            value={{
                products,
                loadProducts,
                addProducts,
                updateProduct,
                deleteProduct,
                loadProductById,
                uploadImage,
                isLoadinProducts,

            }}
        >
            {children}
        </ProductsContext.Provider>
    )


} 