import {Product, LastComments} from '../store/reducer';

class ApiLocalStorage {
    private basketKey: string;
    private commentsKey: string;
    private like: string;
    private waiterTime: string;
    constructor () {
        this.basketKey = 'basket';
        this.commentsKey = 'comment';
        this.like = 'like';
        this.waiterTime = 'waiterTime';
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

    getLastCommets () {
        const comments = localStorage.getItem(this.commentsKey);
        return comments;
    }
    setLastComments (comments: LastComments[]) {
        const encode = JSON.stringify(comments);
        return localStorage.setItem(this.commentsKey, encode);
    }
    getLike () {
        const like = localStorage.getItem(this.like);
        return like;
    }
    setLike (likes: string[]) {
        const encode = JSON.stringify(likes);
        return localStorage.setItem(this.like, encode);
    }
    setWaiterTime (time: number) {
        return localStorage.setItem(this.waiterTime, JSON.stringify(time));
    }
    getWaiterTime () {
        return localStorage.getItem(this.waiterTime);
    }
    removeWaiterTime () {
        return localStorage.removeItem(this.waiterTime)
    }

}

const apiLocalStorage = new ApiLocalStorage();
export default apiLocalStorage;