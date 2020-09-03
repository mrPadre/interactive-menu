import axios from 'axios';
import {Category} from '../store/reducer';

class APIservice {
    private url: string;
    private SC: string;
    private version: string;
    constructor() {
        this.url = 'https://api.jsonbin.io/b/5f43c96d993a2e110d35592f';
        this.SC = '$2b$10$0B9N7lQymjNpNe3pGBMzzOqGRZgnPyx8vGB1u7/TV4e.dbM9VYvHG';
        this.version = '/latest'
    }
    getMenu  = async () => {
        const {data} = await axios.get(`${this.url}${this.version}`, {headers: {"secret-key": this.SC}});
        return data;
    }
    setMenu = async (menu: Array<Category>) => {
        const {data} = await axios.put(this.url, menu, {
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