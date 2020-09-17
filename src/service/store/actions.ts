import * as T from './type-list';
import {Category, Product, Comment, LastComments, Order} from './reducer';
import {ParsedUrlQuery} from 'querystring';

export interface Action {
    type: string;
    payload?: Category | Product | string |
     Array<Category> | Array<Product> |
      ParsedUrlQuery | null | Comment |
       LastComments[] | LastComments |
        string[] | number | Order[] | Order;
    name?: string;
}
export interface Query {
    [key: string]: string;
}
// BASKET
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
export const initBasket = (payload: Array<Product>): Action => {
    return {
        type: T.INIT_BASKET,
        payload: payload
    }
};
export const cleanBasket = (): Action => {
    return {
        type: T.CLEAN_BASKET,

    }
};
// PRODUCTS
export const initProducts = (payload: Array<Category>): Action => {
    return {
        type: T.INIT_PRODUCTS,
        payload: payload
    }
};
// TABLE
export const initTable = (payload: ParsedUrlQuery): Action => {
    return {
        type: T.INIT_TABLE,
        payload: payload
    }
};
// COMMENTS
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
export const addComment = (payload: Comment, name: string): Action => {
    return {
        type: T.ADD_COMMENT,
        payload: payload,
        name: name 
    }
}
// LIKE
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
// WAITERTIME
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
export const deleteWaiterTime = (): Action => {
    return {
        type: T.DELETE_WAITERTIME
    }
};

// ORDERS
export const initOrders = (payload: Order[]): Action => {
    return {
        type: T.INIT_ORDERS,
        payload: payload
    }
};
export const addActiveOrder = (payload: Order): Action => {
    return {
        type: T.ADD_ORDER,
        payload: payload
    }
};
export const editOrder = (payload: Order): Action => {
    return {
        type: T.EDIT_ORDER,
        payload: payload
    }
}
// ACTIVE_ORDER
export const cleanOrder = (): Action => {
    return {
        type: T.CLEAN_ORDER
    }
}
export const initActiveOrder = (payload: Order): Action => {
    return {
        type: T.INIT_ACTIVE_ORDER,
        payload: payload
    }
}

// MESSAGE
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

