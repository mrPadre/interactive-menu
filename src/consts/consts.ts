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

export const findRating = (item: any) => {
    if (item.comments.length) {
        const arr = item.comments.reduce((sum: any, el: any) => {
            if (el.rating !== null) {
                return Math.round(+sum + +el.rating);
            }
        }, [0]);
        return +arr / item.comments.length
    } 

    
}