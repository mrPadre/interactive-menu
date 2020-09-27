import React, {useMemo, useCallback, ChangeEvent, useState, useEffect, useRef} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Theme, Button, Typography, TextField} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';
import {useDispatch, useSelector} from 'react-redux';
import {Store, Product} from '../../service/store/reducer';
import { useLocation, useHistory} from 'react-router';
import queryString from 'querystring';
import {v4} from 'uuid';
import ProductCardComponent from '../product-card-component/ProductCardComponent';
import {findRating} from '../../consts/consts';
import { addFilter, removeFilter } from '../../service/store/actions';
import FilterModalComponent from '../filter-modal-component/FilterModalComponent';

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
    },
    button: {
        margin: 5,
        flex: 1,
        background: 'none',
        border: 'none',
        fontSize: '0.8em',
        color: theme.palette.primary.main,
    },
    filtersContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20 
    },
    select: {
        color: theme.palette.secondary.main
    },
    filtersTagsBlock: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap'
        }
    },
    filterTag: {
        margin: 10,
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.7em',
            margin: 5,

        }
    }

}));

export type DishFilter = 'rating'| 'favorite'| 'stock'| 'no-sugar'|'no-meat';

interface FilterEnum {
    [key: string]: string;
}


const InfoComponent:React.FC = () => {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const query = queryString.parse(location.search.slice(1));
    const dispatch = useDispatch();
    const {allProducts, like, filters} = useSelector((state: Store) => state);
    const inputRef = useRef<HTMLFormElement>(null);


    useEffect(() => {
        if (query.search) {
            setSearch(query.search as string)
        }
        if (query.filter) {
            dispatch(addFilter(query.filter))
        }
        let urlSearch;   
        if (filters.length) {
            urlSearch = {...query, filter: [...filters]}
        }
        history.push({
            search: queryString.stringify(urlSearch)
        });
        
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filterProducts = useMemo(() => {
        if (filters.length) {
            return filters.reduce((sum: Product[], el: string) => {
                
                switch (el) {
                    case 'rating': {
                        return sum.filter((product) => {
                            return findRating(product) === 5;
                        }) 
                    }
                    case 'favorite': {
                        return sum.filter((product) => {
                            return like.includes(product.name)
                        })
                    }
                    case 'stock': {
                        return sum.filter((product)=> {
                            return []
                        })
                    }
                    default: return sum;
                }
            }, allProducts)
        } else return [];
    }, [filters, like, allProducts]);

    const handleCloseFilter = useCallback(() => {
        setOpen(false)
    }, []);

    const handleOpenFilter = useCallback(() => {
        setOpen(true)
    }, []);

    const filterName: FilterEnum = {
        'rating' : '#ПятьЗвёзд',
        'favorite' : '#Избранные',
        'stock' : '#Акции',
        'no-sugar' : '#БезСахара',
        'no-meat' :'#БезМяса'
    }

    const searchProducts = useMemo(() => {
        if (query?.search) {
            const searchContent = query.search.toString().toLowerCase();
            return  filterProducts.filter((item: Product) => {
                return item.name.toLowerCase().includes(searchContent) || item.description.toLowerCase().includes(searchContent);
        })
        } else return filterProducts
    }, [query?.search, filterProducts, like])

    const content = useMemo(() => {
        if (searchProducts.length) {
            return searchProducts.map((product) => {
                return (
                    <ProductCardComponent product={product} key={v4()}/> 
                )
            })
        } else {
            return (
                <Typography variant='body1' className={classes.header}>
                    Нет результатов поиска
                </Typography>
            )
        }
    }, [query, classes.header, searchProducts]);

    const handleChangeSearchInput = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        const {value} = evt.currentTarget;
        setSearch(value);
    }, [setSearch, search]);

    const filterTags = useMemo(() => {
        if (filters.length) {
            return filters.map((el: string) => {
                return (
                    <Typography key={v4()} className={classes.filterTag}>
                        {filterName[el]}
                    </Typography>
                )
            })
        } else {
            return ''
        }
    }, [filters, filterName, classes.filterTag]);

    const handleChangeFilter = useCallback((evt) => {
        const filter = evt.currentTarget.name;
        if (!filters.includes(filter)){
            dispatch(addFilter(filter))
        } else if (filters.includes(filter)){
            dispatch(removeFilter(filter))
        }
        const urlSearch = {...query, filter: [...filters]};
        history.push({
            search: queryString.stringify(urlSearch)
        })
    }, [filters, history, dispatch, query])

    const handleChangeSearch = useCallback((event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputRef.current !== null && inputRef !== null) {
            inputRef.current.blur()
        }
        const urlSearch = {...query, search: search}
        history.push({
            search: queryString.stringify(urlSearch)
        });
    }, [search, history, query]);
    
    return (
        <div className={classes.container} >
            <Typography variant='h5' className={classes.header}>
                ПОИСК ПО МЕНЮ
            </Typography>
            <form className={classes.searchContainer} onSubmit={handleChangeSearch} ref={inputRef}>
                <TextField variant='outlined' value={search} onChange={handleChangeSearchInput}/>
                <Button variant='contained' className={classes.searchBtn} color='primary' type='submit'>
                    <SearchIcon />
                </Button>
            </form>
            <div className={classes.filtersContainer}>
                <div className={classes.filtersTagsBlock}>
                    {filterTags}
                </div>
                <Button 
                variant='contained'
                className={classes.searchBtn} 
                color='primary' 
                type='button' 
                onClick={handleOpenFilter}>
                    <TuneIcon />
                </Button>

                <FilterModalComponent 
                open={open} 
                onClose={handleCloseFilter} 
                changeFilter={handleChangeFilter} 
                count={searchProducts.length}/>
            </div>
            {content}
        </div>
    )
}
export default React.memo(InfoComponent);