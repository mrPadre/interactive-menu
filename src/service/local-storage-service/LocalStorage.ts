import {Product} from '../store/reducer';

class ApiLocalStorage {
    private basketKey: string;
    constructor () {
        this.basketKey = 'basket'
    }
    getBasket () {
       const basket = localStorage.getItem(this.basketKey);
       return basket;
    }
    setBasket (elements: Product[]) {
        const encode = JSON.stringify(elements);
        return localStorage.setItem(this.basketKey, encode);
    }
    clearBasket () {
        return localStorage.removeItem(this.basketKey);
    }
}

const apiLocalStorage = new ApiLocalStorage();
export default apiLocalStorage;