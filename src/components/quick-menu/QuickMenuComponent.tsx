import React, {useState, useCallback, useMemo} from 'react';
import {makeStyles} from '@material-ui/styles';
import NotificationActiveIcon from '@material-ui/icons/NotificationsActive';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import {Theme, Badge} from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import {uuid} from 'uuidv4';
import {useSelector} from 'react-redux';
import {Store, Product} from '../../service/store/reducer';
import {useHistory} from 'react-router';


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
    }
}));

const UseTooltipStyle = makeStyles((theme: Theme) => ({
    staticTooltipLabel: {
        fontSize: '1em',
        width: 150,
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        borderWidth: 3,
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
    const {basket} = useSelector((state: Store) => state);
    const tooltip = UseTooltipStyle();
    const history = useHistory();
 
    const handleOpen = useCallback(() => {
        setOpen(true)
    }, []);
    const handleClose = useCallback(() => {
        setOpen(false)
    }, []);

    const items = basket.length;
   
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
    },[history, handleClose])

    const actions = useMemo(() => {
        const iconArr = [
            {icon: <NotificationActiveIcon/>, name: 'Вызвать официанта', func: handleClose},
            {icon: <Badge badgeContent={items} color={'error'}><ShoppingCartIcon/></Badge>, name: 'Ваш заказ', func: handleGoToBasket},
            {icon: <CreditCardIcon/>, name: `Оплатить заказ ${summ} рублей`,  func: handleClose},
        ]
        return iconArr;
    }, [items, summ, handleClose, handleGoToBasket]);
    
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
                     key={uuid()} 
                     icon={action.icon} 
                     tooltipTitle={action.name} 
                     tooltipOpen={true}
                     onClick={action.func}
                     classes={tooltip}/>
                 })}

            </SpeedDial>

        </div>
    )
}
export default React.memo(QuickMenuComponent);
