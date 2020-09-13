import React, {useMemo, useState, useCallback} from 'react';
import {Typography, TextField, Button, Theme, Card, CardHeader, CardContent} from '@material-ui/core';
import {Store} from '../../service/store/reducer';
import {v4} from 'uuid';
import {Rating} from '@material-ui/lab';
import {makeStyles} from '@material-ui/styles';
import {useDispatch, useSelector} from 'react-redux';
import {addComment, addLastComments} from '../../service/store/actions';
import CommentCardComponent from '../../components/comment-card/CommentCardComponent';
import {useLocation} from 'react-router';

interface Props {
    match: any;
    
}

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        position: 'relative',
        width: '100%',
        maxWidth: 800,
        margin: 'auto'
    },
    item: {
        margin: '30px 0',
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    avatar: {
        marginRight: 20
    },
    close: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    author: {
        display: 'flex',
        alignItems: 'center'
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: '20px 0'
    },
    input: {
        margin: '10px 0',
        borderColor: theme.palette.primary.main
    },
    rating: {
        margin: '20px 0',
        alignSelf: 'center'
    },
    text: {
        margin: 20
    }
}));

const CommentsPageComponent: React.FunctionComponent<Props> = (props: Props) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState<number | null>(2);
    const {lastComments, allProducts} = useSelector((state: Store) => state);

    const {pathname} = useLocation();

  React.useEffect(() => {
      window.scrollTo(0, 0)
  }, [pathname])

    const product = useMemo(() => {
        return allProducts.find((item) => {
            return item.name === props.match.params.id;
        })
    }, [allProducts, props.match.params.id])

    const handleSendComment = useCallback((event) => {
        event.preventDefault();
        if (product) {
            dispatch(addComment({name: userName, comment, rating}, product.name));
            dispatch(addLastComments({name: product.name, time: new Date().getTime()}))
        }
    }, [userName, comment, rating, product?.name, dispatch, product]);

    const commentForm = useMemo(() => {
        const filter = lastComments.filter((item) => {
            return item.name === product?.name;
        })
        if (filter.length) {
            return (
                <Typography align='center' variant='body1' className={classes.text}>
                    Спасибо за ваш комментарий!
                </Typography>
            )
        } else {
            return (
                <form className={classes.form}>
                    <TextField 
                    label='Ваше имя' 
                    variant='outlined' 
                    value={userName}        
                    className={classes.input} 
                    onChange={event => setUserName(event.target.value)}/>
                    
                    <TextField 
                    label='Ваше комментарий'  
                    variant='outlined'
                    multiline
                    rows={4}
                    value={comment}
                    onChange={event => setComment(event.target.value)} 
                    className={classes.input}/>
                    
                    <Rating name='product-rating' value={rating} className={classes.rating} onChange={(event, newValue)=> setRating(newValue)}/>
                    <Button variant='contained' type='submit' color={'primary'} onClick={handleSendComment}>Отправить</Button>
                </form>
            )
        }
    }, [userName, comment, rating, classes.form, classes.input, classes.rating, classes.text, handleSendComment, lastComments, product])
    const content = useMemo(() => {
        if (product?.comments.length) {
            return (
                <div>
                    {product?.comments.map((item) => {
                        return (
                            <CommentCardComponent comment={item} key={v4()}/>
                        )
                    })}
                </div>
            );
        } else {
            return (
                <div>
                    <Typography align='center'>
                        Вы можете быть первым кто оставит здесь свой комментарий
                    </Typography>
                </div>
            )
        }
    }, [product?.comments, product]);

  return (
     
        <Card className={classes.container} elevation={3}>
            <CardHeader title={product?.name.toUpperCase()}/>
            <CardContent>
                {commentForm}
                {content}
            </CardContent>
            
        </Card>
  );
};

export default React.memo(CommentsPageComponent);
