import React, {useCallback, useEffect} from 'react';
import './App.css';
import HeaderComponent from './components/header-component/HeaderComponent';
import {SwipeableListItem} from '@sandstreamdev/react-swipeable-list';
import {makeStyles} from '@material-ui/styles';
import {useHistory, useLocation} from 'react-router-dom';
import Router from './service/router/router';
import QuickMenuComponent from './components/quick-menu/QuickMenuComponent';
import {useDispatch, useSelector} from 'react-redux';
import apiService from './service/api/API';
import {initProducts, initTable, initBasket} from './service/store/actions';
import queryString from 'querystring';
import apiLocalStorage from './service/local-storage-service/LocalStorage';
import {Store} from './service/store/reducer';

const useStyles = makeStyles(() => ({
    mainContent: {
    },
    
}))

const App: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const {basket} = useSelector((state: Store) => state);

    useEffect(() => {
         apiService.getMenu().then((resp) => {
            dispatch(initProducts(resp));
        });

        const data = apiLocalStorage.getBasket();
        if (data) {
            dispatch(initBasket(JSON.parse(data)));
        }
       
        const query = queryString.parse(location.search.slice(1));
        if (query.table) {
            dispatch(initTable(query));
        }
        
    }, [dispatch, location]);

    const handleOpenInfo = useCallback((direction: string) => {
        const {pathname} = history.location;
        if (direction === 'left' && pathname === '/') {
            history.push('/info');
        } else if (direction === 'right' && pathname !== '/'){
            history.push('/');
        } else if (direction === 'left' && pathname !== '/'){
            history.push('/');
        }  else if (direction === 'right' && pathname === '/'){
            history.push('/basket');
        }
       
    }, [history]);


  return (
    <div className="App">
        <HeaderComponent />
        <QuickMenuComponent />
        <SwipeableListItem 
        blockSwipe={false} 
        swipeLeft={{
            content: <div></div>,
            action: () => {handleOpenInfo('left')}
        }}
        swipeRight={{
            content: <div></div>,
            action: () => {handleOpenInfo('right')}
        }}>  
            {Router}   
        </SwipeableListItem>
    </div>
  );
}

export default React.memo(App);
