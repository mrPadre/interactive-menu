import React from 'react';
import {Switch, Route} from 'react-router-dom';
import * as URL from './url';
import InfoComponent from '../../components/info-component/InfoComponent';
import MainPage from '../../pages/main-page/mainPage';
import BasketPage from '../../pages/basket-page/BasketPage';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';
import DishPageComponent from '../../pages/dish-page/DishPageComponent';
import CommentsPageComponent from '../../pages/comments-page/CommentsPageComponent';

export default (
    <Switch>
        <Route exact path={URL.URL_MAIN} component={MainPage} />
        <Route exact path={URL.URL_INFO} component={InfoComponent} />
        <Route exact path={URL.URL_BASKET} component={BasketPage} />
        <Route exact path={URL.URL_DISH} component={DishPageComponent} />
        <Route exact path={URL.URL_COMMENTS} component={CommentsPageComponent} />
        <Route exact component={NotFoundPage} />
    </Switch>
)