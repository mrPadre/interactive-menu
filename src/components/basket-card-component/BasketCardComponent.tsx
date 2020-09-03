import React, {useMemo, useCallback} from 'react';
import {Product, Store} from '../../service/store/reducer';
import {Card, CardContent, CardMedia, Typography, TextField, IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useDispatch, useSelector} from 'react-redux';
import {addInBasket, deleteOneProduct} from '../../service/store/actions';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

interface Props {
    product: Product;
}

const useStyles = makeStyles(() => ({
    card: {
        margin: 20,
        maxWidth: 800,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        minHeight: 200,
        justifyContent: 'space-between',
        position: 'relative',
        transition: 'all 0.5s linear',
        textShadow: '1px 1px 1px white'
    },
    media: {
        width: '70%',
        clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100% )',
        position: 'absolute',
        top: 0,
        right: 0,
        flexGrow: 1,
        height: '100%',
        zIndex: 8
    },
    content: {
        zIndex: 10,
        align: 'left',
    },
    text: {
        textShadow: '1px 1px 1px white'
    },
    active: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0, 
        left: 0,
        backgroundColor: 'black',
        opacity: 0.7,
        display: 'none',
        justifyContent: 'flex-end',
        zIndex: 30
    },
    deleteBtn: {
        justifySelf: 'flex-end'
    },
    show: {
        display: 'flex'
    },
    quantityBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    quantityInput: {
        width: 40
    },
    select: {
        margin: '80px 0'
    }
}))

const BasketCardComponent: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {basket} = useSelector((state: Store) => state);

    const quantity = useMemo(() => {
        const filter = basket.filter((item: Product) => {
            return item.name === props.product.name;
        })
        return filter.length;
    }, [basket, props.product]);

    const handleChangeQuantity = useCallback((direction) => {
        if (direction === 'plus') {
            dispatch(addInBasket(props.product))
        } else if (direction === 'minus') {
            dispatch(deleteOneProduct(props.product))
        }
    }, [dispatch, props.product]);

    return (
        <Card className={classes.card} elevation={3}>
            
            <CardContent className={classes.content}>
                <Typography variant='h5' align='left' className={classes.text}>
                    {props.product.name}
                </Typography>
                <Typography variant='subtitle1' align='left' className={classes.text}>
                    Порция: {props.product.portion} грамм
                </Typography>
                <Typography  variant='subtitle1' align='left' className={classes.text}>
                    Цена: {props.product.price} рублей
                </Typography>
                <div className={classes.quantityBox}>
                    <IconButton onClick={() => handleChangeQuantity('minus')}><RemoveIcon/></IconButton>
                    <TextField 
                    variant='outlined' 
                    value={quantity} 
                    size='small' 
                    className={classes.quantityInput} 
                    disabled/> 
                    <IconButton  onClick={() => handleChangeQuantity('plus')}><AddIcon/></IconButton>
                </div>
                <Typography  variant='subtitle1' align='left' className={classes.text}>
                    Итого: {props.product.price * quantity} рублей
                </Typography>
                
            </CardContent>
            <CardMedia
            image={props.product.img}
            className={classes.media}
            />

        </Card>
    )
}
export default React.memo(BasketCardComponent);
