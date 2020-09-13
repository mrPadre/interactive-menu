import * as T from './type-list';
import {Category, Product, Comment, LastComments} from './reducer';
import {ParsedUrlQuery} from 'querystring';

export interface Action {
    type: string;
    payload?: Category | Product | string | Array<Category> | Array<Product> | ParsedUrlQuery | null | Comment | LastComments[] | LastComments | string[] | number;
    name?: string;
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
export const initLastComments = (payload: LastComments[]): Action => {
    return {
        type: T.INIT_LAST_COMMENTS,
        payload: payload
    }
};
export const addLastComments = (payload: LastComments): Action => {
    return {
        type: T.ADD_LAST_COMMENTS,
        payload: payload
    }
};
export const addLike = (payload: string): Action => {
    return {
        type: T.ADD_LIKE,
        payload: payload
    }
};
export const deleteLike = (payload: string): Action => {
    return {
        type: T.DELETE_LIKE,
        payload: payload
    }
};
export const initLike = (payload: string[]): Action => {
    return {
        type: T.INIT_LIKE,
        payload: payload
    }
};
export const initWaiterTime = (payload: number): Action => {
    return {
        type: T.INIT_WAITERTIME,
        payload: payload
    }
};
export const addWaiterTime = (payload: number): Action => {
    return {
        type: T.ADD_WAITERTIME,
        payload: payload
    }
};
export const addMessage = (payload: string): Action => {
    return {
        type: T.ADD_MESSAGE,
        payload: payload
    }
};
export const deleteMessage = (): Action => {
    return {
        type: T.DELETE_MESSAGE
    }
};
export const deleteWaiterTime = (): Action => {
    return {
        type: T.DELETE_WAITERTIME
    }
};
export const cleanBasket = (): Action => {
    return {
        type: T.CLEAN_BASKET,

    }
};
export const addComment = (payload: Comment, name: string): Action => {
    return {
        type: T.ADD_COMMENT,
        payload: payload,
        name: name 
    }
}