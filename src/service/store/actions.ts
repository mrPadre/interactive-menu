import * as T from './type-list';
import {Category, Product} from './reducer';
import {ParsedUrlQuery} from 'querystring';

export interface Action {
    type: string;
    payload?: Category | Product | string | Array<Category> | Array<Product> | ParsedUrlQuery | null;
}
export interface Query {
    [key: string]: string;
}

export const addInBasket = (payload: Product): Action => {
    return {
        type: T.ADD_IN_BASKET,
        payload: payload
    }
};
export const deleteOneProduct = (payload: Product): Action => {
    return {
        type: T.DELETE_ONE_PRODUCT,
        payload: payload
    }
};
export const initProducts = (payload: Array<Category>): Action => {
    return {
        type: T.INIT_PRODUCTS,
        payload: payload
    }
};
export const initBasket = (payload: Array<Product>): Action => {
    return {
        type: T.INIT_BASKET,
        payload: payload
    }
};
export const initTable = (payload: ParsedUrlQuery): Action => {
    return {
        type: T.INIT_TABLE,
        payload: payload
    }
};
export const cleanBasket = (): Action => {
    return {
        type: T.CLEAN_BASKET,

    }
}