import React, {useState, useMemo, useCallback} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Theme, Card, CardContent, CardHeader, CardMedia, Typography, CardActions, IconButton, Badge, Button} from '@material-ui/core';
import {Rating} from '@material-ui/lab';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {Product} from '../../service/store/reducer';
import {useDispatch} from 'react-redux';
import {addInBasket} from '../../service/store/actions';
import TextOverflowComponent from '../text-overflow/TextOverflow';

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        maxWidth: 800,
        width: '100%',
        margin: 20,
        position: 'relative'
    },
    media: {
        height: 0,
        paddingTop: '58.26%'
    },
    star: {
        color: theme.palette.secondary.main
    },
    actionBox: {
        justifyContent: 'space-between'
    },
    sell: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'black',
        opacity: 0.8,
        display: 'none',
    },
    icon: {
        color: theme.palette.primary.main
    },
    show: {
        display: 'flex'
    },
    cancel: {
        width: '30%',
        fontSize: '1.3em'
    },
    add: {
        width: '70%',
        fontSize: '1.3em',
        backgroundColor: 'white',
    }
}));

interface Props {
    product: Product;
}

const ProductCardComponent: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [full, setFull] = useState(false)

    const activeCard = useMemo(() => {
        const arr = [classes.sell, classes.show];
        if (open) {
            return arr.join(' ');
        } else {
            return classes.sell
        }
    }, [open, classes.sell, classes.show]);

    const handleActiveCard = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handleCancel = useCallback(() => {
        setOpen(false);
    }, [])

    const handleOpenText = useCallback(() => {
        setFull(!full)
    }, [full]);

    const handleAddInCard = useCallback((product: Product) => {
        dispatch(addInBasket(product));
        setOpen(false);
    }, [dispatch]);

    return (
        <Card className={classes.card} elevation={3}>
            <div className={activeCard}>
                <Button variant="contained" className={classes.add} onClick={() => handleAddInCard(props.product)}>
                    Добавить в заказ
                </Button>
                <Button variant="contained" color="primary" className={classes.cancel} onClick={handleCancel}>
                    Отмена
                </Button>
            </div>
            <CardHeader title={props.product.name} />
            <CardMedia image={props.product.img} className={classes.media} onClick={handleActiveCard}/>
            <CardContent>
                <Typography component="div">
                    <TextOverflowComponent text={props.product.description} full={full} handleSetFull={handleOpenText}/>
                </Typography>
            </CardContent>
            <CardActions className={classes.actionBox}>
                <div>
                    <IconButton className={classes.icon}>
                        <FavoriteIcon/>
                    </IconButton>
                    <IconButton  className={classes.icon}>
                        <Badge badgeContent={props.product.comments.length} color={'secondary'}>
                            <ChatBubbleIcon/>
                        </Badge>
                    </IconButton>
                </div>
                <Rating value={props.product.rating} name="product-rating" readOnly emptyIcon={<StarBorderIcon className={classes.star}/>} />
            </CardActions>
        </Card>
    )
}
export default React.memo(ProductCardComponent);
