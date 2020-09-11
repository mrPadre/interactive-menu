import React, {useState, useMemo, useCallback} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Theme, Card, CardContent, CardHeader, CardMedia, Typography, CardActions, IconButton, Badge, Button} from '@material-ui/core';
import {Rating} from '@material-ui/lab';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {Product, Store} from '../../service/store/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {addInBasket, addLike, deleteLike} from '../../service/store/actions';
import TextOverflowComponent from '../text-overflow/TextOverflow';
import {red} from '@material-ui/core/colors';
import {useHistory} from 'react-router';
import {findRating} from '../../consts/consts';

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        maxWidth: 800,
        width: '100%',
        margin: 20,
        position: 'relative'
    },
    media: {
        width: '100%',
        paddingTop: '58.26%',
        position: 'relative'
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
        zIndex: 100,
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
    },
    heart: {

    },
    like: {
        color: red[600]
    },
    price: {
        position: 'absolute',
        top: 0,
        width: '100%',
        padding: '10px 0',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        clipPath: 'polygon(15% 0, 85% 0, 75% 100%, 25% 100%)',
        fontWeight: 'bold',
        opacity: 0.8
        
    }
}));

interface Props {
    product: Product;
}

const ProductCardComponent: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [full, setFull] = useState(false);
    const {like} = useSelector((state: Store) => state);
    const history = useHistory();

    const filter = useMemo(() => {
        return like.filter((item) => {
            return item === props.product.name;
        })
    }, [like, props.product.name])

    const handleOpenComments = useCallback(() => {
        history.push('/comments/' + props.product.name);
    }, [history, props.product.name])

    

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

    const likeBtnStyle = useMemo(() => {
        const arr = [classes.heart, classes.like]
        if (filter.length) {
            return arr.join(' ');
        } else {
            return classes.heart
        }

    }, [classes.like, classes.heart, filter.length]);

    const handleAddLike = useCallback(() => {
        if (filter.length) {
            dispatch(deleteLike(props.product.name))
        } else {
            dispatch(addLike(props.product.name))
        }
    }, [props.product.name, filter.length, dispatch]);

    const handleShowProduct = useCallback(() => {
        history.push('/dish/' + props.product.name);
    }, [history, props.product.name])

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
            <CardMedia image={props.product.img} className={classes.media} onClick={handleActiveCard}>
                <Typography className={classes.price}>
                    {props.product.portion} ГРАММ /  {props.product.price} РУБ.
                </Typography>
            </CardMedia>
            <CardContent>
                <Typography component="div">
                    <TextOverflowComponent text={props.product.description} full={full} handleSetFull={handleOpenText}/>
                </Typography>
            </CardContent>
            <CardActions className={classes.actionBox}>
                <div>
                    <IconButton className={classes.icon} onClick={handleAddLike}>
                        <FavoriteIcon className={likeBtnStyle}/>
                    </IconButton>
                    <IconButton  className={classes.icon}>
                        <Badge badgeContent={props.product.comments.length} color={'secondary'}>
                            <ChatBubbleIcon  onClick={handleOpenComments}/>
                        </Badge>
                    </IconButton>
                    <IconButton className={classes.icon} onClick={handleShowProduct}>
                        <MoreHorizIcon />
                    </IconButton>
                </div>
                <Rating value={findRating(props.product)} name="product-rating" readOnly emptyIcon={<StarBorderIcon className={classes.star}/>} />
            </CardActions>
        </Card>
    )
}
export default React.memo(ProductCardComponent);
