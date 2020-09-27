import { Comment, Product } from "../service/store/reducer";

export interface CategoryItem{
    id: string;
    label: string;
}

export const CATEGORY = [
    {id: 'pie', label: 'Пироги'},
    {id: 'salad', label: 'Салат'},
    {id: 'second', label: 'Горячее'},
    {id: 'juse', label: 'Напитки'},
    {id: 'bread', label: 'Хлеб'},
];

export const findRating = (product: Product): number => {
    if (product.comments.length) {
        const arr = product.comments.reduce((sum: number, el: Comment) => {
            if (el.rating !== null) {
                return Math.round(sum + el.rating);
            }
            return sum;
        }, 0);
        return arr / product.comments.length
    }
    return 0;
}