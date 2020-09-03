import React, {useMemo, useCallback, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Store, Product} from '../../service/store/reducer';
import BasketCardComponent from '../../components/basket-card-component/BasketCardComponent';
import {uuid} from 'uuidv4';
import {makeStyles} from '@material-ui/styles';
import {Typography, Button} from '@material-ui/core';
import {useHistory} from 'react-router';
import {cleanBasket} from '../../service/store/actions';

const useStyles = makeStyles(()=> ({
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    image: {
        
    },
    title: {
        margin: 15
    },
    header: {
        
    },
    btn: {
        margin: '20px 10px'
    },
    text: {
        margin: 10
    },
    btnsContainer: {
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'center'
    }
}))

const BasketPage: React.FC = () => {
    const {basket} = useSelector((state: Store) => state);
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [confirmation, setConfirmation] = useState(false);

    const handleGoToMain = useCallback(() => {
        history.push('/');
    }, [history]);

    const handleCleanBasket = useCallback(() => {
        dispatch(cleanBasket());
    }, [dispatch])

    const successBtns = useMemo(() => {
        if (basket.length && confirmation) {
            return (
                <div className={classes.btnsContainer}>
                    <Button variant='contained' color='primary' className={classes.btn}>Оплатить наличными</Button>
                    <Button variant='contained' color='secondary' className={classes.btn}>Оплатить онлайн</Button>
                </div>
            )
        } else if (basket.length) {
            return (
                <div className={classes.btnsContainer}>
                    <Button variant='contained' className={classes.btn} onClick={handleCleanBasket}>Очистить</Button>
                    <Button variant='contained' color='primary' className={classes.btn}>Подтвердить заказ</Button>
                </div>
            )
        }
    }, [basket, confirmation, classes.btn, classes.btnsContainer]);

    const summ = useMemo(() => {
        let money = 0;
        basket.map((item: Product) => {
            return money += item.price;
        })
        if (basket.length) {
            return (
                <Typography variant='h5' className={classes.title}>
                    На сумму: {money} рублей
                </Typography>
            )
        }
    }, [basket, classes.title])

    const content = useMemo(() => {
        if (basket.length) {
            const filter = basket.reduce((uniq: Product[], item: Product) => {
                if (!uniq.some((el: Product) => {return el.name === item.name})) {
                    uniq.push(item);
                }
                return uniq || [];
            }, []);
            filter.sort((a: Product, b: Product) => a.name > b.name ? 1 : -1);
            return filter.map((product) => {
                return (
                    <BasketCardComponent product={product} key={uuid()}/>
                )
            })
        } else {
            return (
                <div>
                    <Typography variant='body1' className={classes.text}>
                        Вы не выбрали блюдо, ознакомьтесь с меню и выберите то, что вам хочется больше всего
                    </Typography>
                    <Button variant='contained' color='primary' className={classes.btn} onClick={handleGoToMain}>
                        Выбрать блюдо
                    </Button>
                </div>
            )
        }
    }, [basket, classes.btn, handleGoToMain, classes.text]);

    return(
        <div className={classes.container}>
            <div className={classes.header}>
                <Typography variant='h5' className={classes.title}>
                    Ваш заказ:
                </Typography>
            </div>
            {content}
            {summ}
            {successBtns}
        </div>
    )
}
export default BasketPage;
