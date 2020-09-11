import axios from 'axios';
import {Product} from '../store/reducer';

class APIservice {
    private oldUrl: string;
    private SC: string;
    private version: string;
    private productUrl: string;
    constructor() {
        this.oldUrl = 'https://api.jsonbin.io/b/5f43c96d993a2e110d35592f';
        this.productUrl = 'https://api.jsonbin.io/b/5f55daea993a2e110d400cdf';
        this.SC = '$2b$10$0B9N7lQymjNpNe3pGBMzzOqGRZgnPyx8vGB1u7/TV4e.dbM9VYvHG';
        this.version = '/latest'
    }
    getMenu  = async () => {
        const {data} = await axios.get(`${this.productUrl}${this.version}`, {headers: {"secret-key": this.SC}});
        return data;
    }
    setMenu = async (menu: Array<Product>) => {
        const {data} = await axios.put(this.productUrl, menu, {
            headers: {
                "secret-key": this.SC,
                "Content-Type": "application/json"
            }
        });
        return data;
    }
    setProductsMenu = async (menu: Product[]) =>  {
        const {data} = await axios.put(this.productUrl, menu, {
            headers: {
                "secret-key": this.SC,
                "Content-Type": "application/json"
            }
        });
        return data;
    }
}
const apiService = new APIservice();

export default apiService;