import * as T from './type-list';
import apiLocalStorage from '../local-storage-service/LocalStorage';

export interface Store {
    products: Array<Category>;
    basket: Array<Product>;
    table: string;
}
export interface Camment {
    name: string;
    comment: string;
    rating: number;
}
export interface Product{
    name: string;
    img: string;
    description: string;
    price: number;
    portion: number;
    rating: number;
    comments: Comment[];
}
export interface Category {
    id: string;
    products: Array<Product>;
}

const initState: Store = {
    products: [],
    basket: [],
    table: ''
};

export const reducer = (store: Store = initState, actions: any): any => {
    switch(actions.type) {
        case T.ADD_IN_BASKET: {
            const {basket} = store;
            apiLocalStorage.setBasket([...basket, actions.payload]);
            return {...store, basket: [...basket, actions.payload]}
        }
        case T.INIT_PRODUCTS: {
            const products = actions.payload;
            return {...store, products} 
        }
        case T.INIT_BASKET: {
            const basket = actions.payload;
            return {...store, basket}
        }
        case T.DELETE_ONE_PRODUCT: {
            const {basket} = store;
            const index = basket.indexOf(actions.payload);
            basket.splice(index, 1);
            apiLocalStorage.setBasket([...basket]);
            return {...store, basket: [...basket]};
        }
        case T.CLEAN_BASKET: {
            let {basket} = store;
            basket = [];
            apiLocalStorage.clearBasket();
            return {...store, basket: [...basket]};
        }
        case T.INIT_TABLE: {
            return {...store, table: actions.payload.table}
        }
        default: return {...store}
    }
}
