import { Badge, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector } from 'react-redux';
import { Store } from '../../service/store/reducer';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'fixed',
        animation: '$basketFab 500ms linear',
        left: 10,
        bottom: 10,
        height: 52,
        width: 80,
        padding: '0 10px',
        color: theme.palette.secondary.main,
        zIndex: 10,
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        clipPath: 'polygon(0 0,100% 0, 80% 50%, 100% 100%, 0 100%)',
        cursor: 'pointer',
        transform: 'translateX(-20px)',
    },
    extendIcon: {
        margin: '0 10px'
    },
    '@keyframes basketFab': {
        '0%': {
            transform: 'translateX(-100px)'
        },
        '100%': {
            transform: 'translateX(-20px)'
        }
    }
}))

const BasketFabComponent: React.FunctionComponent = () => {
    const classes = useStyles();
    const {basket} = useSelector((state: Store) => state);
    const history = useHistory();

    const handleGoToBasket = React.useCallback(() => {
        history.push('/basket');
    }, [history])

  return (
      <div className={classes.root}>
          <Badge badgeContent={basket.length} color='error' onClick={handleGoToBasket}>
             <ShoppingCartIcon className={classes.extendIcon}/>
          </Badge>
      </div>
  );
};

export default React.memo(BasketFabComponent);
