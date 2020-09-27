import { Dialog, 
    DialogContent, 
    DialogTitle,
    makeStyles, 
    Switch, 
    Theme, 
    Typography, 
    useMediaQuery, 
    useTheme, 
    DialogActions, 
    Button } from '@material-ui/core';
import * as React from 'react';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import LoyaltyOutlinedIcon from '@material-ui/icons/LoyaltyOutlined';
import NotInterestedOutlinedIcon from '@material-ui/icons/NotInterestedOutlined';
import EcoOutlinedIcon from '@material-ui/icons/EcoOutlined';
import Uzor from '../../img/Uzor.png';
import {v4} from 'uuid';
import { useSelector } from 'react-redux';
import { Store } from '../../service/store/reducer';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        backgroundImage: `url(${Uzor})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right bottom'
    },
    filterRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        margin: '20px 5px'
    },
    button: {
        color: theme.palette.secondary.main
    }
}))

interface Props {
    onClose: () => void;
    open: boolean;
    changeFilter: (evt: React.ChangeEvent) => void;
    count: number;
}

export const FILTERS = [
    {name: '5 звезд', filter: 'rating', icon: <GradeOutlinedIcon />},
    {name: 'Избранные', filter: 'favorite', icon: <FavoriteBorderOutlinedIcon />},
    {name: 'Акции', filter: 'stock', icon: <LoyaltyOutlinedIcon />},
    {name: 'Без сахара', filter: 'no-sugar', icon: <NotInterestedOutlinedIcon />},
    {name: 'Без мяса', filter: 'no-meat', icon: <EcoOutlinedIcon />},
]

const FilterModalComponent: React.FC<Props> = ({onClose, open, changeFilter, count}) => {
    const classes = useStyles();
    const {filters} = useSelector((state: Store) => state);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const modalContent = React.useMemo(() => {
        return FILTERS.map((el) => {
            let checked = false;
            filters.forEach((str: string) => {
                if (el.filter === str) {
                    checked = true;
                }
            }) 
            return (
                <div key={v4()} className={classes.filterRow}>
                    <Switch 
                    checked={checked} 
                    onChange={changeFilter} 
                    name={el.filter} 
                    color='secondary' 
                    />
                        <Typography>
                            {el.name}
                        </Typography>
                </div>
            )
        })
    }, [FILTERS, filters]);

  return (
    <Dialog 
    open={open} 
    onClose={onClose} 
    aria-labelledby='dialog-title' 
    fullScreen={fullScreen}
    fullWidth>
        <DialogTitle id='dialog-title' >
            Выберите фильтр
        </DialogTitle>
        <DialogContent dividers className={classes.container}>
            {modalContent}
        </DialogContent>
        <DialogActions>
                <Button onClick={onClose} color='primary' variant='contained' className={classes.button}>
                   Применить
                </Button>
        </DialogActions>
    </Dialog>
  );
};

export default React.memo(FilterModalComponent);

