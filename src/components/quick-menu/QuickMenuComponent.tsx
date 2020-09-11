import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {makeStyles} from '@material-ui/styles';
import NotificationActiveIcon from '@material-ui/icons/NotificationsActive';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import {Theme, Badge, Typography} from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import {v4} from 'uuid';
import {useSelector, useDispatch} from 'react-redux';
import {Store, Product} from '../../service/store/reducer';
import {useHistory} from 'react-router';
import {addWaiterTime, deleteWaiterTime} from '../../service/store/actions';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import * as URL from '../../service/router/url';


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'contents'
    },
    speedDial: {
        position: 'fixed',
        right: 10,
        bottom: 10
    },
    icon: {
        color: theme.palette.secondary.main
    },
    timer: {
        display: 'flex',
        flexDirection: 'column'
    },
    disabled: {
        color: 'white'
    }
}));

const UseTooltipStyle = makeStyles((theme: Theme) => ({
    staticTooltipLabel: {
        fontSize: '1em',
        width: 200,
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        borderWidth: 1,
        borderStyle: 'solid'
    },
    fab: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
        }
    }
}));

const QuickMenuComponent: React.FC = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const {basket, waiterTime} = useSelector((state: Store) => state);
    const tooltip = UseTooltipStyle();
    const history = useHistory();
    const dispatch = useDispatch();
    const [countDown, setCountDown] = useState(0);
 
    const handleOpen = useCallback(() => {  
        setOpen(true)
    }, []);
    const handleClose = useCallback(() => {
        setOpen(false)
    }, []);

    const items = basket.length;

   useEffect(() => {
       const date = new Date((waiterTime + 300000) - new Date().getTime()).getTime()
       if (date > 0) {
            setTimeout(() => {
                setCountDown(date)
            }, 1000)
       } else if (waiterTime) {
           dispatch(deleteWaiterTime());
       }     
    }, [waiterTime, new Date(), dispatch]);

    const disabledStyle = useMemo(() => {
        if (waiterTime) {
            return classes.disabled;
        } else {
            return ''
        }
    }, [waiterTime, classes.disabled])
   
    const summ = useMemo(() => {
        let price = 0;
        basket.map((item: Product) => {
            return price += item.price;
        });
        return price;
    }, [basket]);

    const handleGoToBasket = useCallback(() => {
        history.push('/basket');
        handleClose();
    },[history, handleClose]);
    const handleGoToInfo = useCallback(() => {
        history.push(URL.URL_INFO);
        handleClose();
    }, [history])

    const handleAddWaiterTime = useCallback(() => {
        if (!waiterTime) {
            dispatch(addWaiterTime(new Date().getTime()))
        } 
        
    }, [dispatch, new Date(),]);

    const waiterTimeContent = useMemo(() => {
        if (waiterTime > 0) {
            return (
                <div>
                    <Typography variant='caption' className={classes.timer}>
                    Официант подойдет в течении 
                    </Typography>
                    {new Date(countDown).getMinutes()} : {new Date(countDown).getSeconds()}
                </div>
            )
        }else {
            
            return `Вызвать официанта`
        }
    }, [waiterTime, countDown])

    const actions = useMemo(() => {
        const iconArr = [
            {icon: <NotificationActiveIcon className={disabledStyle}/>, name: waiterTimeContent, func: handleAddWaiterTime },
            {icon: <Badge badgeContent={items} color={'error'}><ShoppingCartIcon/></Badge>, name: 'Ваш заказ', func: handleGoToBasket},
            {icon: <CreditCardIcon/>, name: `Оплатить заказ ${summ} рублей`,  func: handleClose},
            {icon: <SearchOutlinedIcon />, name: 'Поиск по меню', func: handleGoToInfo },
        ]
        return iconArr;
    }, [items, summ, handleClose, handleGoToBasket, waiterTimeContent, handleAddWaiterTime, disabledStyle, handleGoToInfo]);
    
    return (
        <div className={classes.container}>
            <SpeedDial
             ariaLabel="SpeedDial tooltip" 
             className={classes.speedDial}
             icon={<SpeedDialIcon className={classes.icon}/>} 
             onClose={handleClose} 
             onOpen={handleOpen} 
             open={open}>
                 {actions.map((action) => {
                     return <SpeedDialAction 
                     key={v4()} 
                     icon={action.icon} 
                     tooltipTitle={action.name} 
                     tooltipOpen={true}
                     onClick={action.func}
                     classes={tooltip}
                     />
                    
                 })}

            </SpeedDial>

        </div>
    )
}
export default React.memo(QuickMenuComponent);
