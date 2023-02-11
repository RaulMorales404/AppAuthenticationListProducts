import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const environment = (env: 'PROD' | 'DEV') => {
    switch (env) {
        case 'PROD':
            return 'https://coffe-react-native.herokuapp.com/api'

        case 'DEV':
            return 'http://192.168.1.7:8080/api';

        default:
            return 'http://192.168.1.7:8080/api';
    }
}


///Para Ambiente de Desarrollo environment('DEV')
//Para ambiente de Produccion environment('PROD')

const baseURL = environment('PROD');

const cafeApi = axios.create({ baseURL });

cafeApi.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers['x-token'] = token;
        }
        return config;
    }
);


export default cafeApi;