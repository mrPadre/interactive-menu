import React, {useMemo, useCallback, ChangeEvent, useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Theme, Button, Typography, TextField, IconButton, Hidden} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {useSelector} from 'react-redux';
import {Store, Product} from '../../service/store/reducer';
import { useLocation, useHistory} from 'react-router';
import queryString from 'querystring';
import {v4} from 'uuid';
import ProductCardComponent from '../product-card-component/ProductCardComponent';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import LoyaltyOutlinedIcon from '@material-ui/icons/LoyaltyOutlined';
import NotInterestedOutlinedIcon from '@material-ui/icons/NotInterestedOutlined';
import EcoOutlinedIcon from '@material-ui/icons/EcoOutlined';
import {findRating} from '../../consts/consts';

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
        justifyContent: 'space-between',
        marginTop: 20 
    },
    select: {
        color: theme.palette.secondary.main
    }

}));

export const FILTERS = [
    {name: '5 звезд', filter: 'rating', icon: <GradeOutlinedIcon />},
    {name: 'Избранные', filter: 'favorite', icon: <FavoriteBorderOutlinedIcon />},
    {name: 'Акции', filter: 'stock', icon: <LoyaltyOutlinedIcon />},
    {name: 'Без сахара', filter: 'noSugar', icon: <NotInterestedOutlinedIcon />},
    {name: 'Без мяса', filter: 'noMeat', icon: <EcoOutlinedIcon />},
]

const InfoComponent:React.FC = () => {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [search, setSearch] = useState('');
    const query = queryString.parse(location.search.slice(1));
    const [index, setIndex] = useState<null | number>(0);

    useEffect(() => {
        if (typeof query?.search  === 'string') {
            setSearch(query.search);
        }
    }, [])

    const {allProducts, like} = useSelector((state: Store) => state);

    const handleSelectIndex = useCallback((i) => {
        setIndex(i)
    }, []);

    const filter = useMemo(() => {
        if (query?.search) {
            const searchContent = query.search.toString().toLowerCase();
            return  allProducts.filter((item: Product) => {
                return item.name.toLowerCase().includes(searchContent) || item.description.toLowerCase().includes(searchContent);
        })
        } else {
            switch(index){
                case 0: return (
                    allProducts.filter((item: Product) => {
                        return findRating(item) === 5
                    })
                );
                case 1: return (
                    allProducts.filter((item: Product) => {
                       return like.includes(item.name)
                    })
                )
                default : return [];

            }
        }
    }, [query?.search, allProducts, index, like])

    const content = useMemo(() => {
        if (filter.length) {
            return filter.map((product) => {
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
    }, [query, classes.header, allProducts, index ]);

    const filters = useMemo(() => {
         if (search) {
            setIndex(null);
            return 
        } else {
             return FILTERS.map((item, i) => {
                 return (
                     <div 
                     key={v4()} 
                     onClick={() => handleSelectIndex(i)}
                     className={index === i ? classes.button + ' ' + classes.select: classes.button}
                     >
                         <IconButton color={index === i ? 'secondary' : 'primary'}>{item.icon}</IconButton>
                         <Hidden mdDown>
                            <Typography variant='body1'>
                                {item.name}
                            </Typography>
                         </Hidden>
                         
                     </div>
                 )
             })
        }
    }, [index, FILTERS, search, handleSelectIndex, classes.button, classes.select])

    const handleChangeSearchInput = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        const {value} = evt.currentTarget;
        setSearch(value);
    }, [setSearch, search]);

    const handleChangeSearch = useCallback((event: ChangeEvent<HTMLFormElement | any>) => {
        event.preventDefault();
        event.target[0].blur();
        history.push(`/info?search=${search}`);
    }, [search, history]);
    
    return (
        <div className={classes.container} >
            <Typography variant='h5' className={classes.header}>
                ПОИСК ПО МЕНЮ
            </Typography>
            <form className={classes.searchContainer} onSubmit={handleChangeSearch}>
                <TextField variant='outlined' value={search} onChange={handleChangeSearchInput}/>
                <Button variant='contained' className={classes.searchBtn} color='primary' type='submit'>
                    <SearchIcon />
                </Button>
            </form>
            <div className={classes.filtersContainer}>
                {filters}
            </div>
            {content}
        </div>
    )
}
export default React.memo(InfoComponent);