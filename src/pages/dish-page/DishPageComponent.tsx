import * as React from 'react';
import {Typography, Theme, Card, CardMedia, CardHeader, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useSelector, useDispatch} from 'react-redux';
import {Store} from '../../service/store/reducer';
import {Rating} from '@material-ui/lab';
import CommentCardComponent from '../../components/comment-card/CommentCardComponent';
import {v4} from 'uuid';
import {addInBasket} from '../../service/store/actions';
import {useHistory, useLocation} from 'react-router';
import {findRating} from '../../consts/consts';

interface Props {
    match: any;
}

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        width: '100%',
        maxWidth: 800,
        margin: 'auto'
    },
    header: {
        margin: 5
    },
    image: {
        width: '100%',
        paddingTop: '56.25%',
        display: 'flex'
    },
    paper: {
        margin: '10px 0',
        padding: 20,
    },
    center: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',

    },
    item: {
        marginLeft: 10,
        marginRight: 20
    },
    title: {
        margin: 20
    },
    line: {
        width: '70%',
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 48%, rgba(255,255,255,1) 100%)' ,
        height: 2,
        margin: 'auto',
    },
    button: {
        marginTop: 20,
        color: theme.palette.secondary.main
    }
    
}))

const DishPageComponent: React.FunctionComponent<Props> = (props: Props) => {
  const classes = useStyles();
  const {allProducts} = useSelector((state: Store) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const name = React.useMemo(() => {
      return props.match.params.id;
  }, [props.match.params.id]);
  const {pathname} = useLocation();

  React.useEffect(() => {
      window.scrollTo(0, 0)
  }, [pathname])

  const product = React.useMemo(() => {
      return allProducts.find((item) => {
          return item.name === name;
      })
  }, [allProducts, name]);

  const handleBack = React.useCallback(() => {
      history.goBack();
  }, [history]);
  const handleAddToBasket = React.useCallback(() => {
        if (product) {
            dispatch(addInBasket(product));
        }
  }, [dispatch, product])

  const content = React.useMemo(() => {
      if (product) {
          return (
              <Card elevation={3}>
                <CardHeader 
                title={name.toUpperCase()} 
                />                
                <CardMedia image={product.img} className={classes.image}/>
                <Button 
                onClick={handleAddToBasket} 
                color='primary' 
                variant='contained' 
                className={classes.button}>
                    Добавить в заказ
                </Button>
                <div className={classes.paper}>
                    <Typography variant='body1' align='left'>
                        СОСТАВ: {product?.composition?.join(', ')}
                    </Typography>
                    
                </div>
                <div className={classes.line}></div>
                <div className={classes.paper}>
                    <Typography variant='body1' align='left'>
                        ОПИСАНИЕ: {product?.description}
                    </Typography>
                </div>
                <div className={classes.line}></div>
                <div className={classes.paper}>
                    <div className={classes.center}> 
                        РЕЙТИНГ:
                        <div className={classes.item}>
                            <Rating value={findRating(product)} readOnly/>
                        </div> 
                        ВСЕГО ОЦЕНОК: 
                        <div className={classes.item}>
                            {product.comments.length}
                        </div>
                    </div>
                    
                    


                    
                <div className={classes.paper}>
                    <Button variant='contained' color='primary' onClick={handleBack}>Назад</Button>
                    <Typography variant='body1' align='center' className={classes.title}>
                        КОММЕНТАРИИ:
                    </Typography>
                    {product.comments.map((item) => {
                        return (
                            <CommentCardComponent comment={item} key={v4()}/>
                        );
                    })}
                </div>
              </Card>
          )
      }
  }, [product, handleAddToBasket, classes.title, classes.item, classes.line, classes.paper, classes.button, classes.image, name, classes.center])
  return (
      <div className={classes.container}>  


      </div>
  );
};

export default React.memo(DishPageComponent);
