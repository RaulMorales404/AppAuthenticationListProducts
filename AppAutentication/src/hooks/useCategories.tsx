import React, { useEffect, useState } from 'react'
import cafeApi from '../apis/cafeApi';
import { Categoria, RespopnseCategoris } from '../interfaces/Category';

export const useCategories = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState<Categoria[]>([]);



    useEffect(() => {
        getCategories();

    }, [])

    const getCategories = async () => {
        try {
            const { data } = await cafeApi.get<RespopnseCategoris>('/categorias');
            let newCategoris =  [{
                _id: "1",
                "nombre": "Selecciona",
                "usuario": {
                    "_id": "hjhj",
                    "nombre": "holaaa perras"
                }
            }, ...data.categorias];
          




            setCategories(newCategoris);
            setIsLoading(false);
        } catch (error) {

        }


    }

    return {
        categories,
        isLoading,
        getCategories

    }
}
