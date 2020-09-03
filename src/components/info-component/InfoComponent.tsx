import React, {useMemo, useCallback, ChangeEvent, useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Theme, Button, Typography, TextField} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {useSelector} from 'react-redux';
import {Store, Product, Category} from '../../service/store/reducer';
import { useLocation, useHistory} from 'react-router';
import queryString from 'querystring';
import {uuid} from 'uuidv4';
import ProductCardComponent from '../product-card-component/ProductCardComponent';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        width: '100%',
        maxWidth: '800px',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto'
    },
    header: {
        margin: 20
    },
    icon: {
        fontSize: '4em',
        color: theme.palette.secondary.main,
    },
    iconBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '100%'
    },
    searchContainer: {
        display: 'flex',
        maxWidth: 800,
        margin: 'auto'
    },
    searchBtn: {
        color: theme.palette.secondary.main,
        margin: '0 10px'
    }
}));

const InfoComponent:React.FC = () => {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [search, setSearch] = useState('');
    const query = queryString.parse(location.search.slice(1));

    useEffect(() => {
        if (typeof query?.search  === 'string') {
            setSearch(query.search);
        }
    }, [location])

    const {products} = useSelector((state: Store) => state);
    const allProducts = useMemo(() => {
        let arr: Product[] = [];
        products.forEach((item: Category) => {
            arr = arr.concat(item.products)
        });
        return arr;
    }, [products]);
    
    const content = useMemo(() => {
        if (query?.search) {
            const searchContent = query.search.toString().toLowerCase()
            return allProducts.filter((item: Product) => {
                return item.name.toLowerCase().includes(searchContent) || item.description.toLowerCase().includes(searchContent);
            }).map((product) => {
                return (
                        <ProductCardComponent product={product} key={uuid()}/> 
                )
            })
        } else {
            return (
                <Typography variant='body1' className={classes.header}>
                    Введите название или описание блюда
                </Typography>
            )
        }
        
    }, [query, classes.header, ]);

    const handleChangeSearchInput = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        const {value} = evt.currentTarget;
        setSearch(value);
    }, [setSearch]);

    const handleChangeSearch = useCallback((event: ChangeEvent<HTMLFormElement | any>) => {
        event.preventDefault();
        event.target[0].blur();
        history.push(`/info?search=${search}`);
    }, [search]);

    
    return (
        <div className={classes.container} >
            <Typography variant='h5' className={classes.header}>
                Поиск по меню
            </Typography>
            <form className={classes.searchContainer} onSubmit={handleChangeSearch}>
                <TextField variant='outlined' value={search} onChange={handleChangeSearchInput}/>
                <Button variant='contained' className={classes.searchBtn} color='primary' type='submit'>
                    <SearchIcon />
                </Button>
            </form>
            {content}
        </div>
    )
}
export default React.memo(InfoComponent);