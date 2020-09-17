import React, {useCallback, useEffect} from 'react';
import './App.css';
import HeaderComponent from './components/header-component/HeaderComponent';
import {SwipeableListItem} from '@sandstreamdev/react-swipeable-list';
import {useHistory, useLocation} from 'react-router-dom';
import Router from './service/router/router';
import QuickMenuComponent from './components/quick-menu/QuickMenuComponent';
import {useDispatch} from 'react-redux';
import apiService from './service/api/API';
import {initProducts, initTable, initBasket, initLastComments, initLike, addWaiterTime, initOrders, initActiveOrder} from './service/store/actions';
import queryString from 'querystring';
import apiLocalStorage from './service/local-storage-service/LocalStorage';
import {LastComments} from './service/store/reducer';
import SnackbarComponent from './components/snackbar-component/SnackbarComponent';


const App: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        apiService.getMenu().then((resp) => {
            dispatch(initProducts(resp));
        });
        apiService.getActiveOrders().then((resp) => {
            dispatch(initOrders(resp))
        });
    }, [])

    useEffect(() => {
        const order = apiLocalStorage.getActiveOrder();
        if (order) {
            dispatch(initActiveOrder(JSON.parse(order)))
        }
         
        const data = apiLocalStorage.getBasket();
        if (data) {
            dispatch(initBasket(JSON.parse(data)));
        }
        const like = apiLocalStorage.getLike();
        if (like) {
            const parseLike = JSON.parse(like);
            dispatch(initLike(parseLike));
        }
        const waiterTime = apiLocalStorage.getWaiterTime();
        if (waiterTime) {
            dispatch(addWaiterTime(JSON.parse(waiterTime)));
        }

        const comments = apiLocalStorage.getLastCommets();
        if (comments) {
            const parseComments = JSON.parse(comments);
            const filter = parseComments.filter((item: LastComments) => {
                const timeNow = new Date().getTime();
                return timeNow - item.time < 3600000;
            });
            dispatch(initLastComments(filter));
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
        <SnackbarComponent />
    </div>
  );
}

export default React.memo(App);
