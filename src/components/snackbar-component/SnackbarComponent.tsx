import {makeStyles, Theme, Typography} from '@material-ui/core';
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteMessage} from '../../service/store/actions';
import {Store} from '../../service/store/reducer';
import {v4} from 'uuid';

const useStyles = makeStyles((theme: Theme) => ({
    point: {
        position: 'fixed',
        bottom: 10,
        right: 10,
        width: 55,
        height: 55,
    },
    active: {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        animation: `$snack 2000ms ${theme.transitions.easing.easeOut}`

    },
    hide: {
        display: 'none'
    },
    '@keyframes snack': {
        '0%': {
            fontSize: '0.8em',
            transform: 'translateY(0)'
        },
        '100%': {
            fontSize: '1.4em',
            transform: 'translateY(-150px)'
        }
    }
}))

const SnackbarComponent: React.FunctionComponent = () => {
const classes = useStyles();
const {message} = useSelector((state: Store) => state);
const dispatch = useDispatch()

React.useEffect(() => {
    if (message.length > 1) {
        dispatch(deleteMessage());
    } 
}, [message])


const snack = React.useMemo(() => {
    if (message.length === 1) {
    return message.map((item) => {
        return (
             <Typography className={classes.active} key={v4()}>
                 {item}
             </Typography>
         )
     })
   } 
}, [message, classes.active, dispatch])

  return (
      <div className={classes.point}>
          {snack}
      </div>
  );
};

export default React.memo(SnackbarComponent);
