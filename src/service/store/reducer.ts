import * as T from './type-list';
import apiLocalStorage from '../local-storage-service/LocalStorage';
import apiService from '../api/API';

export interface Store {
    allProducts: Product[];
    basket: Array<Product>;
    table: string;
    lastComments: LastComments[];
    like: string[];
    waiterTime: number;
    message: string[];
    orders: Order[];
    activeOrder: Order | null;
}
export interface Comment {
    name: string;
    comment: string;
    rating: number | null;
}
export interface Order{
    id: number;
    table: string;
    products: Product[];
    isPaid: boolean;
}
export interface Product{
    name: string;
    img: string;
    description: string;
    price: number;
    portion: number;
    rating: number | null;
    comments: Comment[];
    category?: string;
    composition?: string[];
}
export interface Category {
    id: string;
    products: any;
}

export interface LastComments {
    name: string;
    time: number;
}

const initState: Store = {
    allProducts: [],
    basket: [],
    table: '',
    lastComments: [],
    like: [],
    waiterTime: 0,
    message: [],
    orders: [],
    activeOrder: null
};

export const reducer = (store: Store = initState, actions: any): any => {
    switch(actions.type) {
        case T.ADD_IN_BASKET: {
            const {basket, message} = store;
            apiLocalStorage.setBasket([...basket, actions.payload]);
            message.push(`+${actions.payload.price}`)
            return {...store, basket: [...basket, actions.payload], message: [...message]}
        }
        case T.INIT_PRODUCTS: {
            const products = actions.payload;
            return {...store, allProducts: [...products]} 
        }
        case T.INIT_BASKET: {
            const basket = actions.payload;
            return {...store, basket}
        }
        case T.DELETE_ONE_PRODUCT: {
            const {basket, message} = store;
            const index = basket.indexOf(actions.payload);
            basket.splice(index, 1);
            apiLocalStorage.setBasket([...basket]);
            message.push(`-${actions.payload.price}`)
            return {...store, basket: [...basket], message: [...message]};
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
        case T.ADD_LAST_COMMENTS: {
            const {lastComments} = store;
            apiLocalStorage.setLastComments([...lastComments, actions.payload]);
            return {...store, lastComments: [...lastComments, actions.payload]}
        }
        case T.INIT_LAST_COMMENTS: {
            return {...store, lastComments: [...actions.payload]};
        }
        case T.ADD_LIKE: {
            const {like, message} = store;
            message.push('❤')
            apiLocalStorage.setLike([...like, actions.payload]);
            return {...store, like: [...like, actions.payload], message: [...message]}
        }
        case T.DELETE_LIKE: {
            const {like} = store;
            const filter = like.filter((item) => {
                return item !== actions.payload;
            })
            apiLocalStorage.setLike([...filter])
            return {...store, like: [...filter]}
        }
        case T.INIT_LIKE: {
            return {...store, like: [...actions.payload]}
        }
        case T.INIT_WAITERTIME: {
            return {...store, waiterTime: actions.payload}
        }
        case T.ADD_WAITERTIME: {
            apiLocalStorage.setWaiterTime(actions.payload);
            return {...store, waiterTime: actions.payload}
        }
        case T.DELETE_WAITERTIME: {
            apiLocalStorage.removeWaiterTime();
            return {...store, waiterTime: 0}
        }
        case T.DELETE_MESSAGE: {
            const {message} = store;
            message.shift();
            return {...store, message: [...message]}
        }
        case T.ADD_MESSAGE: {
            const {message} = store;
            message.push(actions.payload);
            return {...store, message: [...message]}
        }
        case T.ADD_COMMENT: {
            const {allProducts} = store;
            allProducts.forEach((item: Product) => {
                    if (item.name === actions.name) {
                        item.comments = [
                            ...item.comments, actions.payload
                        ]
                    }
            });
            apiService.setMenu(allProducts).then(() => {
               
                console.log('спасибо');
            })
            return {...store, allProducts: [...allProducts]}
        }
        case T.INIT_ORDERS: {
            return {...store, orders: [...actions.payload]}
        }
        case T.ADD_ORDER: {
            const {orders} = store;
            apiLocalStorage.setActiveOrder(actions.payload);
            apiService.setActiveOrder([...orders, actions.payload])
            return {...store, orders: [...orders, actions.payload], activeOrder: actions.payload}
        }
        case T.CLEAN_ORDER: {
            apiLocalStorage.removeActiveOrder();
            return {...store, activeOrder: null}
        }
        case T.INIT_ACTIVE_ORDER: {
            return {...store, activeOrder: actions.payload}
        }
        case T.EDIT_ORDER: {
            const {orders} = store;
            if (orders.length) {
                orders.forEach((item: Order) => {
                    if (item.id === actions.payload.id) {
                       item = actions.payload;
                    }
                })
            }
            return {...store, orders: [...orders]}
        }
        default: return {...store}
    }
}
